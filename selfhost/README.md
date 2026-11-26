# PurpleBot self-host bundle

Run PurpleBot on your own Cloudflare account and your own Linux server. Nothing
in this bundle talks to `openbot.run`.

| Part | Runs on | Job |
| --- | --- | --- |
| Account service (Cloudflare Worker, D1, R2) | Cloudflare | accounts, sign-in codes, connection tickets |
| Signal + TURN | your Linux server | the connection between clients and the server |
| Email hook | your Linux server | sends each sign-in code by SMTP |
| PurpleBot server (Docker) | your Linux server | the agents |

PurpleBot keeps the [PolyForm Noncommercial 1.0.0 license](../LICENSE): use it and
share it for noncommercial purposes. Sell nothing without a commercial license
from the upstream owner (see [NOTICE](../NOTICE)). Keep `LICENSE` and `NOTICE`
with every copy.

## How a sign-in code reaches an inbox

1. A person asks for a code at the account service.
2. The account service posts the code to the email hook on your server. A Worker
   does not always get a reply from an SMTP port, so it hands the mail to the server.
3. The email hook sends it with the curl command from the Cloudflare SMTP guide:
   `smtps://smtp.mx.cloudflare.net:465`, user `api_token`, password = your SMTP token.

The tested sender is the Cloudflare Email Routing SMTP service with a sender of
your own domain.

## What you need

- A Cloudflare account with Workers, D1 and R2, and a domain on that account.
- An SMTP credential of that domain. On Cloudflare: Email Routing, then create an
  SMTP credential.
- A Linux server with Docker and Docker Compose, a static public IPv4 address,
  and SSH access. Free ports: 443/tcp (Signal and the certificate), 2053/tcp
  (email hook), 3478/tcp+udp, 5349/tcp, and the TURN UDP relay range 16384 to 65535.
- [Bun](https://bun.sh) on the computer that runs the deploy script.

The examples use `purple-api.example.com` (account service), `signal.example.com`
(Signal) and `turn.example.com` (TURN). Use your own names.

## 1. Settings

1. Copy the repository to your Linux server, into `SELFHOST_DIR`:

   ```sh
   git clone https://github.com/tokenine/purplebot.git /data/purplebot
   cd /data/purplebot && git checkout selfhost
   ```

2. Add two DNS records on your Cloudflare zone, type `A`, proxy status **DNS only**:
   `SIGNAL_DOMAIN` and `TURN_DOMAIN`, both with the address of the server.

3. Copy the settings file and fill it in:

   ```sh
   cp selfhost/env.auth-api.example selfhost/.env.auth-api
   ```

## 2. Account service

```sh
selfhost/deploy.sh auth
```

The script creates the D1 database and the R2 buckets, generates the ticket key
pair and the secrets into `selfhost/.env.server-secrets`, deploys the Worker with
its D1 migrations, and writes `selfhost/.env.signal` and `selfhost/.env.email-hook`.
Keep the three `.env.*` files: they hold your secrets, and git ignores them.

Sign in to Cloudflare once before: `cd apps/auth-api && bunx wrangler login`.

Check: `curl -fsS https://purple-api.example.com/health/live` returns
`{"status":"ok"}`. A new domain can take some minutes to resolve.

## 3. Signal, TURN and the email hook

```sh
selfhost/deploy.sh signal
```

The script connects to your server with SSH. On the first run it issues the
certificate (ACME TLS-ALPN-01, so port 443 must be free), then it starts Signal,
TURN and the email hook.

Check: `curl -fsS https://signal.example.com/health/ready` returns
`{"status":"ready"}`.

The certificate is valid for 90 days. The script installs a weekly renewal
check in `/etc/cron.d/purplebot-certs` on the server. Its output goes to
`/var/log/purplebot-issue-certs.log`.

## 4. Server container

The container image comes from a Linux AppImage of this repository. Build both
on the server. The build needs Bun and Node.js 22 or later (`node -v`). When the
server has an older Node.js first in `PATH`, put a current one before it.

```sh
cd /data/purplebot
bun install --frozen-lockfile
bun run dist:linux
selfhost/deploy.sh server
```

`selfhost/deploy.sh server` writes `selfhost/.env.server`, builds the image from
the AppImage in `dist/`, and starts the container `purplebot`. The container
runs the full app headless on two virtual displays. All state lives in the
`purplebot-data` volume.

## 5. Sign in

With an email code, in a terminal:

```sh
ssh your-server docker exec -it purplebot purplebot login
```

Type your email address, then the code from the mail.

Without a mailbox, the way of an operator: make a claim at the account service,
then give it to the server.

```sh
curl -fsS -X POST https://purple-api.example.com/v2/admin/server-claims \
  -H "Authorization: Bearer $(grep ^SERVER_CLAIMS_ADMIN_TOKEN= selfhost/.env.server-secrets | cut -d= -f2-)" \
  -H 'Content-Type: application/json' -d '{"email":"you@example.com"}'
ssh your-server docker exec -i purplebot purplebot login --claim
```

Paste the `claim` value, then press Enter.

Check: `ssh your-server docker exec purplebot purplebot status` shows your account
and `Server: ... (online)`.

To connect:

- Browser: open `https://purple-api.example.com/app`, sign in with an email code,
  and add your server.
- Phone: the phone app is the OpenBot app of upstream from the App Store and Google
  Play. Scan the connection QR code of a desktop app that uses your service. Email
  sign-in on the phone always uses `openbot.run`, so it cannot reach your service.
- Desktop app: start it with two variables, each time:

  ```sh
  OPENBOT_AUTH_API_URL=https://purple-api.example.com \
  OPENBOT_REMOTE_SIGNAL_URL=wss://signal.example.com/v1/signal \
  /Applications/PurpleBot.app/Contents/MacOS/PurpleBot
  ```

  Without them the app talks to `openbot.run`. Sign out there first.

## What the server container contacts

A capture of the first minutes of the container shows these names, and no other:

- Your own account service and Signal, and `TURN_DOMAIN`.
- `api.github.com`, `registry.npmjs.org`, `raw.githubusercontent.com` and the
  download hosts of the provider CLIs, when the app checks for a provider runtime.

The app of upstream sends usage analytics and error reports to
`analytics.openbot.run` in a packaged build. This fork switches them off when
`OPENBOT_AUTH_API_URL` is set, so the server container does not contact `openbot.run`.

TURN relays to public IPv4 addresses and refuses the private ranges (see
`remote/coturn/turnserver.conf`). Do not add a `denied-peer-ip` rule in IPv6
notation: on coturn 4.17.2 it refuses every IPv4 peer.

## What stays off

- Billing, hosted servers, media generation with credits, the iPhone Live Activity
  relay and mobile email sign-in. Each needs secrets that only nightly-labs has.
- The update check of a packaged desktop app. It reads the release feed that
  `electron-builder.yml` names. The server container does not check for updates.

## Verified in the reference deployment (2026-11-26)

- Account service, Signal, TURN and the email hook answer their health checks.
- A sign-in code sent from the account service arrives in an inbox.
- The server container starts, signs in with a claim, and shows `online`.
- The web client signs in with a code from a browser behind NAT and reaches the
  workspace of the server.
- The server container makes no request to `openbot.run`.

## Updates

Pull the new commit, then run `selfhost/deploy.sh auth`, `selfhost/deploy.sh
signal`, and build the server again (step 4).

## Brand and license notes

- The app is PurpleBot: the name, the logo, the icon set, the brand color, the
  text of the interface in every language, the emails and the server command
  (`purplebot`). The source of the icon is `build/icon.svg`.
- Internal identifiers keep the names of upstream, so that the fork can take new
  upstream changes: the `OPENBOT_*` environment variables, the `openbot://` link
  scheme, `openbot.db`, the `@openbot/*` packages and most file names. New agent
  data lives in `~/PurpleBot`.
- The account service of this bundle serves a small landing page, the sign-in, the
  web client at `/app`, its APIs, and a short privacy page and terms page for a
  self-hosted instance. Write them for your organization when the law of your
  country needs more.
- Skills in the marketplace catalog come from third-party repositories under the
  Apache-2.0 license; see `marketplace/production-catalog/`. That catalog is the
  content of the upstream team and stays as it is, with its notices.
