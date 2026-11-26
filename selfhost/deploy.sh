#!/bin/bash
# PurpleBot self-host deploy helper.
#
#   selfhost/deploy.sh auth    Deploy the account service (Cloudflare Worker) and write
#                              the settings of your Linux server.
#   selfhost/deploy.sh signal  Start Signal, TURN and the email hook on your Linux server.
#   selfhost/deploy.sh server  Start the PurpleBot server container on your Linux server.
#
# Read selfhost/README.md first. This script never sends data to openbot.run.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
AUTH_ENV="$SCRIPT_DIR/.env.auth-api"
SECRETS_ENV="$SCRIPT_DIR/.env.server-secrets"
SIGNAL_ENV="$SCRIPT_DIR/.env.signal"
HOOK_ENV="$SCRIPT_DIR/.env.email-hook"
SERVER_ENV="$SCRIPT_DIR/.env.server"
SSH_OPTIONS="-o ConnectTimeout=10 -o BatchMode=yes"

log() { printf 'deploy: %s\n' "$*"; }
die() { printf 'deploy: error: %s\n' "$*" >&2; exit 1; }

need_env() {
  [ -f "$AUTH_ENV" ] || die "$AUTH_ENV is missing. Copy selfhost/env.auth-api.example to selfhost/.env.auth-api and fill it in."
  # shellcheck disable=SC1090
  . "$AUTH_ENV"
}

env_value() { # env_value FILE KEY -> prints the value or empty
  awk -F= -v k="$2" '$0 !~ /^#/ && $1 ~ "^[[:space:]]*" k "[[:space:]]*$" { sub(/^[^=]*=/, ""); gsub(/^["'\''"]+|["'\''"]+$/, ""); print; exit }' "$1" 2>/dev/null || true
}

require_tools_auth() {
  command -v bun >/dev/null || die "bun is missing. Install it from https://bun.sh."
  [ -x "$REPO_ROOT/node_modules/.bin/wrangler" ] || { log "bun install (first run)"; (cd "$REPO_ROOT" && bun install --frozen-lockfile); }
  WRANGLER="$REPO_ROOT/node_modules/.bin/wrangler"
  "$WRANGLER" whoami >/dev/null 2>&1 || die "wrangler is not signed in. Run: cd apps/auth-api && bunx wrangler login"
}

json_field() { # KEY on stdin: JSON list -> prints the id of the entry with that name
  SELFHOST_KEY="$1" bun -e '
    const rows = JSON.parse(await Bun.stdin.text());
    const key = process.env.SELFHOST_KEY;
    const row = Array.isArray(rows) ? rows.find((r) => (r.name ?? r.bucket_name ?? r.label) === key) : undefined;
    console.log(row ? (row.uuid ?? row.database_id ?? row.bucket_name ?? "") : "");
  '
}

gen_secret() { openssl rand -base64 48 | tr -d '\n'; }

ensure_secrets() {
  if [ -f "$SECRETS_ENV" ]; then
    log "secrets file exists: $SECRETS_ENV (kept)"
  else
    log "generating the ticket key pair and the secrets into $SECRETS_ENV"
    {
      echo "REMOTE_SESSION_SECRET=$(gen_secret)"
      echo "REMOTE_AUTH_WEBHOOK_SECRET=$(gen_secret)"
      echo "REMOTE_METRICS_TOKEN=$(gen_secret)"
      echo "TURN_SHARED_SECRET=$(gen_secret)"
      echo "SKILLS_ADMIN_TOKEN=$(gen_secret)"
      echo "SITE_REPORT_HASH_SECRET=$(gen_secret)"
      echo "SERVER_CLAIMS_ADMIN_TOKEN=$(gen_secret)"
    } > "$SECRETS_ENV"
    local kid
    kid="$(env_value "$AUTH_ENV" REMOTE_TICKET_KEY_ID)"
    kid="${kid:-purplebot-remote-1}"
    SELFHOST_KID="$kid" bun -e '
      const { generateKeyPairSync } = require("node:crypto");
      const kid = process.env.SELFHOST_KID;
      const meta = { kid, alg: "ES256", use: "sig" };
      const { privateKey, publicKey } = generateKeyPairSync("ec", { namedCurve: "P-256" });
      console.log(`REMOTE_TICKET_KEY_ID=${kid}`);
      console.log(`REMOTE_TICKET_PRIVATE_JWK=\x27${JSON.stringify({ ...privateKey.export({ format: "jwk" }), ...meta })}\x27`);
      console.log(`REMOTE_TICKET_PUBLIC_JWKS=\x27${JSON.stringify({ keys: [{ ...publicKey.export({ format: "jwk" }), ...meta }] })}\x27`);
    ' >> "$SECRETS_ENV"
    chmod 600 "$SECRETS_ENV"
  fi
  if ! grep -q '^EMAIL_DELIVERY_WEBHOOK_SECRET=' "$SECRETS_ENV"; then
    echo "EMAIL_DELIVERY_WEBHOOK_SECRET=$(gen_secret)" >> "$SECRETS_ENV"
  fi
}

ensure_d1() {
  local name="$1" id
  id="$($WRANGLER d1 list --json 2>/dev/null | json_field "$name" || true)"
  if [ -z "$id" ]; then
    log "creating D1 database $name"
    $WRANGLER d1 create "$name" >/dev/null
    id="$($WRANGLER d1 list --json 2>/dev/null | json_field "$name")"
  fi
  [ -n "$id" ] || die "could not read the D1 database id for $name"
  echo "$id"
}

ensure_r2() {
  local bucket="$1" out
  out="$($WRANGLER r2 bucket create "$bucket" 2>&1 || true)"
  if printf '%s' "$out" | grep -qE 'already exists|10004'; then
    log "R2 bucket exists: $bucket"
  elif printf '%s' "$out" | grep -qiE 'error'; then
    printf '%s\n' "$out" | sed -n '1,20p' >&2
    die "could not create the R2 bucket $bucket"
  else
    log "created R2 bucket: $bucket"
  fi
}

wait_for() { # wait_for URL TRIES SECONDS
  local attempt
  for attempt in $(seq 1 "$2"); do
    if curl -fsS --max-time 10 "$1" >/dev/null 2>&1; then return 0; fi
    [ "$attempt" = "$2" ] || sleep "$3"
  done
  return 1
}

cmd_auth() {
  need_env
  require_tools_auth
  local delivery="${EMAIL_DELIVERY_MODE:-webhook}" key value worker
  for key in API_DOMAIN D1_DATABASE_NAME EMAIL_SMTP_HOST EMAIL_SMTP_USERNAME EMAIL_SMTP_PASSWORD EMAIL_FROM REMOTE_SIGNAL_URL REMOTE_AUTH_WEBHOOK_URL SIGNAL_DOMAIN TURN_DOMAIN TURN_PUBLIC_IP ACME_EMAIL; do
    value="$(env_value "$AUTH_ENV" "$key")"
    [ -n "$value" ] || die "$key is empty in selfhost/.env.auth-api."
  done
  if [ "$delivery" = "webhook" ]; then
    value="$(env_value "$AUTH_ENV" EMAIL_DELIVERY_WEBHOOK_URL)"
    [ -n "$value" ] || die "EMAIL_DELIVERY_WEBHOOK_URL is empty in selfhost/.env.auth-api."
  fi
  worker="$(env_value "$AUTH_ENV" WORKER_NAME)"
  ensure_secrets

  local d1_id
  d1_id="$(ensure_d1 "$D1_DATABASE_NAME")"
  # Keep the id in the auth env file for the config writer.
  if ! grep -q "^D1_DATABASE_ID=" "$AUTH_ENV"; then echo "D1_DATABASE_ID=" >> "$AUTH_ENV"; fi
  awk -F= -v id="$d1_id" '/^D1_DATABASE_ID=/{print "D1_DATABASE_ID=" id; next} {print}' "$AUTH_ENV" > "$AUTH_ENV.tmp" && mv "$AUTH_ENV.tmp" "$AUTH_ENV"
  log "D1 database id: $d1_id"

  ensure_r2 "${R2_AVATARS_BUCKET:-purplebot-avatars}"
  ensure_r2 "${R2_SKILLS_BUCKET:-purplebot-skills}"
  ensure_r2 "${R2_SITES_BUCKET:-purplebot-sites}"

  bun "$SCRIPT_DIR/write-wrangler-config.ts"

  # Secrets for scripts/deploy-auth-api.ts. In webhook mode the SMTP password stays
  # on the Linux server (the email hook sends the mail), and the Worker gets the
  # webhook secret instead.
  {
    [ "$delivery" = "smtp" ] && echo "EMAIL_SMTP_PASSWORD=$EMAIL_SMTP_PASSWORD"
    grep -E '^(SKILLS_ADMIN_TOKEN|SITE_REPORT_HASH_SECRET|REMOTE_TICKET_PRIVATE_JWK|REMOTE_TICKET_PUBLIC_JWKS|REMOTE_AUTH_WEBHOOK_SECRET|SERVER_CLAIMS_ADMIN_TOKEN|OPENPANEL_CLIENT_ID|OPENPANEL_CLIENT_SECRET)=' "$SECRETS_ENV" || true
  } > "$SCRIPT_DIR/.env.self-hosted"
  chmod 600 "$SCRIPT_DIR/.env.self-hosted"

  # Settings of the Linux server.
  local signal_host="${REMOTE_SIGNAL_URL#wss://}"
  signal_host="${signal_host%%/*}"
  sed -e "s|^ACME_EMAIL=.*|ACME_EMAIL=$ACME_EMAIL|" \
      -e "s|^SIGNAL_DOMAIN=.*|SIGNAL_DOMAIN=$SIGNAL_DOMAIN|" \
      -e "s|^TURN_DOMAIN=.*|TURN_DOMAIN=$TURN_DOMAIN|" \
      -e "s|^TURN_PUBLIC_IP=.*|TURN_PUBLIC_IP=$TURN_PUBLIC_IP|" \
      -e "s|^REMOTE_TICKET_JWKS_URL=.*|REMOTE_TICKET_JWKS_URL=$API_DOMAIN/.well-known/jwks.json|" \
      -e "s|^REMOTE_CONTROL_PLANE_URL=.*|REMOTE_CONTROL_PLANE_URL=$API_DOMAIN|" \
      -e "s|^TELEGRAM_WEBHOOK_ORIGIN=.*|TELEGRAM_WEBHOOK_ORIGIN=https://$signal_host|" \
      "$SCRIPT_DIR/env.signal.example" > "$SIGNAL_ENV"
  grep -E '^(REMOTE_SESSION_SECRET|REMOTE_AUTH_WEBHOOK_SECRET|REMOTE_METRICS_TOKEN|TURN_SHARED_SECRET)=' "$SECRETS_ENV" >> "$SIGNAL_ENV"
  chmod 600 "$SIGNAL_ENV"
  if [ "$delivery" = "webhook" ]; then
    {
      echo "SIGNAL_DOMAIN=$SIGNAL_DOMAIN"
      echo "WEBHOOK_SECRET=$(env_value "$SECRETS_ENV" EMAIL_DELIVERY_WEBHOOK_SECRET)"
      echo "EMAIL_SMTP_HOST=$EMAIL_SMTP_HOST"
      echo "EMAIL_SMTP_PORT=${EMAIL_SMTP_PORT:-465}"
      echo "EMAIL_SMTP_USERNAME=$EMAIL_SMTP_USERNAME"
      echo "EMAIL_SMTP_PASSWORD=$EMAIL_SMTP_PASSWORD"
      echo "EMAIL_FROM=$EMAIL_FROM"
    } > "$HOOK_ENV"
    chmod 600 "$HOOK_ENV"
    log "setting the email webhook secret on the Worker"
    printf '%s\n' "$(env_value "$SECRETS_ENV" EMAIL_DELIVERY_WEBHOOK_SECRET)" |
      "$WRANGLER" secret put EMAIL_DELIVERY_WEBHOOK_SECRET --name "$worker" >/dev/null ||
      die "could not set EMAIL_DELIVERY_WEBHOOK_SECRET"
    # A leftover SMTP password makes the Worker try SMTP, and each sign-in fails.
    printf 'y\n' | "$WRANGLER" secret delete EMAIL_SMTP_PASSWORD --name "$worker" >/dev/null 2>&1 || true
  fi

  log "deploying the account service (migrations, build, deploy)"
  set -a
  # shellcheck disable=SC1091
  . "$SCRIPT_DIR/.env.self-hosted"
  set +a
  export DEPLOY_EMAIL_RELAY="${DEPLOY_EMAIL_RELAY:-}"
  export EMAIL_RELAY_PLACEMENT_HOST="${EMAIL_RELAY_PLACEMENT_HOST:-}"
  export EMAIL_RELAY_SERVICE="${EMAIL_RELAY_SERVICE:-}"
  export SITE_ORIGIN="$API_DOMAIN"
  bun "$REPO_ROOT/scripts/deploy-auth-api.ts"

  log "checking the account service (a new domain can take a minute to resolve)"
  if wait_for "$API_DOMAIN/health/live" 12 10 && wait_for "$API_DOMAIN/.well-known/jwks.json" 1 0; then
    log "account service is live: $API_DOMAIN"
  else
    log "WARNING: $API_DOMAIN does not answer yet. The deploy output above is the source of truth."
    log "On macOS, flush the DNS cache and try again: sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder"
  fi
  log "wrote $SIGNAL_ENV and $HOOK_ENV. Next: selfhost/deploy.sh signal"
}

ssh_target() {
  SSH_USER_AT_HOST="$(env_value "$AUTH_ENV" SSH_USER_AT_HOST)"
  SELFHOST_DIR="$(env_value "$AUTH_ENV" SELFHOST_DIR)"
  [ -n "$SSH_USER_AT_HOST" ] || die "SSH_USER_AT_HOST is empty in selfhost/.env.auth-api."
  [ -n "$SELFHOST_DIR" ] || die "SELFHOST_DIR is empty in selfhost/.env.auth-api."
}

remote_has_dir() {
  ssh $SSH_OPTIONS "$SSH_USER_AT_HOST" "test -d '$SELFHOST_DIR'" 2>/dev/null
}

cmd_signal() {
  need_env
  ssh_target
  local delivery="${EMAIL_DELIVERY_MODE:-webhook}"
  [ -f "$SIGNAL_ENV" ] || die "$SIGNAL_ENV is missing. Run selfhost/deploy.sh auth first."
  remote_has_dir || die "$SELFHOST_DIR is not on $SSH_USER_AT_HOST. Copy the repository there first (selfhost/README.md, step 1)."
  log "uploading the Signal settings"
  scp -q "$SIGNAL_ENV" "$SSH_USER_AT_HOST:$SELFHOST_DIR/selfhost/.env.signal"
  log "checking the certificate (the first issue needs port 443 to be free)"
  ssh $SSH_OPTIONS "$SSH_USER_AT_HOST" "cd '$SELFHOST_DIR' && { test -f 'selfhost/certs/certificates/$SIGNAL_DOMAIN.crt' || bash selfhost/issue-certs.sh issue; }"
  log "starting Signal and TURN (the first start builds the images on the server)"
  ssh $SSH_OPTIONS "$SSH_USER_AT_HOST" "cd '$SELFHOST_DIR' && docker compose -f selfhost/compose.signal.yaml --env-file selfhost/.env.signal up -d --build"
  if [ "$delivery" = "webhook" ]; then
    [ -f "$HOOK_ENV" ] || die "$HOOK_ENV is missing. Run selfhost/deploy.sh auth again."
    log "starting the email hook"
    scp -q "$SCRIPT_DIR/email-hook.ts" "$SCRIPT_DIR/email-hook.yaml" "$SCRIPT_DIR/Dockerfile.email-hook" "$SSH_USER_AT_HOST:$SELFHOST_DIR/selfhost/"
    scp -q "$HOOK_ENV" "$SSH_USER_AT_HOST:$SELFHOST_DIR/selfhost/.env.email-hook"
    ssh $SSH_OPTIONS "$SSH_USER_AT_HOST" "cd '$SELFHOST_DIR' && docker compose -f selfhost/email-hook.yaml --env-file selfhost/.env.email-hook up -d --build"
  fi
  if wait_for "https://$SIGNAL_DOMAIN/health/ready" 10 6; then
    log "Signal is ready: https://$SIGNAL_DOMAIN/health/ready"
  else
    log "WARNING: Signal does not answer yet. Check: ssh $SSH_USER_AT_HOST 'cd $SELFHOST_DIR && docker compose -f selfhost/compose.signal.yaml --env-file selfhost/.env.signal logs'"
  fi
  log "installing the weekly certificate renewal in cron on the server"
  ssh $SSH_OPTIONS "$SSH_USER_AT_HOST" "printf '%s\n' '# PurpleBot self-host: weekly certificate renewal check.' '17 3 * * 1 root cd $SELFHOST_DIR && selfhost/issue-certs.sh renew >> /var/log/purplebot-issue-certs.log 2>&1' > /etc/cron.d/purplebot-certs && chmod 644 /etc/cron.d/purplebot-certs"
  log "next: the server container (selfhost/README.md, step 4)"
}

cmd_server() {
  need_env
  ssh_target
  remote_has_dir || die "$SELFHOST_DIR is not on $SSH_USER_AT_HOST. Copy the repository there first (selfhost/README.md, step 1)."
  [ -f "$SCRIPT_DIR/seccomp.json" ] || cp "$REPO_ROOT/docker/seccomp.json" "$SCRIPT_DIR/seccomp.json"
  local image="ghcr.io/tokenine/purplebot:${PURPLEBOT_TAG:-latest}"
  {
    echo "PURPLEBOT_IMAGE=$image"
    echo "OPENBOT_AUTH_API_URL=$API_DOMAIN"
    echo "OPENBOT_REMOTE_SIGNAL_URL=$REMOTE_SIGNAL_URL"
    echo "OPENBOT_DISPLAY_SIZE=${OPENBOT_DISPLAY_SIZE:-1920x1080}"
  } > "$SERVER_ENV"
  chmod 600 "$SERVER_ENV"
  log "uploading the server settings"
  scp -q "$SERVER_ENV" "$SSH_USER_AT_HOST:$SELFHOST_DIR/selfhost/.env.server"
  scp -q "$SCRIPT_DIR/seccomp.json" "$SCRIPT_DIR/docker-compose.server.yaml" "$SCRIPT_DIR/build-server-image.sh" "$SSH_USER_AT_HOST:$SELFHOST_DIR/selfhost/"
  log "building the image from the AppImage on the server"
  ssh $SSH_OPTIONS "$SSH_USER_AT_HOST" "cd '$SELFHOST_DIR' && bash selfhost/build-server-image.sh '$image'"
  log "starting the PurpleBot server container"
  ssh $SSH_OPTIONS "$SSH_USER_AT_HOST" "cd '$SELFHOST_DIR' && docker compose -f selfhost/docker-compose.server.yaml --env-file selfhost/.env.server up -d"
  ssh $SSH_OPTIONS "$SSH_USER_AT_HOST" "docker ps --filter name=purplebot --format '{{.Names}} {{.Status}}'"
  log "sign in with: ssh $SSH_USER_AT_HOST 'docker exec -it purplebot purplebot login'"
}

case "${1:-}" in
  auth) shift; cmd_auth "$@" ;;
  signal) shift; cmd_signal "$@" ;;
  server) shift; cmd_server "$@" ;;
  *) sed -n '2,9p' "$0" | sed 's/^# \{0,1\}//'; exit 1 ;;
esac
