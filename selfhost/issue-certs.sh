#!/bin/bash
# Issue and renew the Signal/TURN certificate with the ACME TLS-ALPN-01 challenge.
# No Cloudflare DNS API token is needed. The A records of SIGNAL_DOMAIN and
# TURN_DOMAIN must point at this server (DNS only), and TCP port 443 must be free
# while lego runs. deploy.sh signal calls "issue" when there is no certificate.
#
#   selfhost/issue-certs.sh issue   first issue, on the server
#   selfhost/issue-certs.sh renew   weekly, from cron on the server:
#                                   17 3 * * 1  cd /data/purplebot && selfhost/issue-certs.sh renew
#
# The certificate lands in selfhost/certs/certificates/, where compose.signal.yaml
# and email-hook.yaml read it. The renew step stops Signal for the seconds that
# lego holds port 443, and starts it again.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CERT_DIR="$SCRIPT_DIR/certs"
CERT_FILE="$CERT_DIR/certificates"
LEGO_IMAGE="goacme/lego:v5.3.1"
CERT_GROUP=2000

load_env() {
  local env_file="$SCRIPT_DIR/.env.signal"
  # shellcheck disable=SC1091
  [ -f "$env_file" ] || { echo "issue-certs: $env_file is missing. Run selfhost/deploy.sh auth first." >&2; exit 1; }
  . "$env_file"
  ACME_EMAIL="${ACME_EMAIL:-admin@example.com}"
}

lego_run() { # extra lego arguments
  mkdir -p "$CERT_DIR"
  docker run --rm \
    -v "$CERT_DIR":/acme \
    -p 443:443 \
    "$LEGO_IMAGE" \
    run --path /acme --email "$ACME_EMAIL" --accept-tos \
    --domains "$SIGNAL_DOMAIN" --domains "$TURN_DOMAIN" \
    --tls --tls.address :443 \
    "$@"
}

make_readable() {
  chgrp -R "$CERT_GROUP" "$CERT_FILE"
  chmod 0550 "$CERT_FILE"
  chmod 0440 "$CERT_FILE/$SIGNAL_DOMAIN.crt" "$CERT_FILE/$SIGNAL_DOMAIN.key"
  echo "issue-certs: certificate is in $CERT_FILE"
}

case "${1:-}" in
  issue)
    load_env
    lego_run
    make_readable
    ;;
  renew)
    load_env
    [ -f "$CERT_FILE/$SIGNAL_DOMAIN.crt" ] || { echo "issue-certs: no certificate yet. Run: selfhost/issue-certs.sh issue" >&2; exit 1; }
    compose="docker compose -f $SCRIPT_DIR/compose.signal.yaml --env-file $SCRIPT_DIR/.env.signal"
    $compose stop remote-api coturn >/dev/null 2>&1 || true
    lego_status=0
    lego_run --renew-days 30 || lego_status=$?
    make_readable
    $compose start remote-api coturn
    [ "$lego_status" = 0 ] || echo "issue-certs: WARNING: lego exit $lego_status. Signal is back up with the certificate it had." >&2
    echo "issue-certs: renewal check done, Signal is back up."
    ;;
  *)
    sed -n '2,16p' "$0" | sed 's/^# \{0,1\}//'
    exit 1
    ;;
esac
