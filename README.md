# PurpleBot

[![License](https://img.shields.io/badge/license-PolyForm_Noncommercial_1.0.0-blue.svg)](LICENSE)

PurpleBot is a noncommercial fork of [OpenBot](https://github.com/nightly-labs/openbot)
by Synthetify Labs. It is renamed, has its own logo, and is trimmed so that anyone can
self-host it on their own Cloudflare account and their own Linux server. A self-hosted
PurpleBot makes no request to `openbot.run`.

PurpleBot is a workspace for persistent AI teammates. Each agent has its own workspace and
conversation. It runs Codex, Claude Code, Grok, OpenCode, Gemini, Cursor, Cline, Kimi, Devin,
GitHub Copilot, Mistral Vibe and Hermes Agent, and gives them queues, file transfers, an
embedded browser, and agent-to-agent messaging.

> [!WARNING]
> Agents run with `danger-full-access` and `approvalPolicy: never`. They can read and modify files,
> run commands, use the network, and control the embedded browser without per-action confirmations
> after the explicit first-launch consent.
> Run only agents and tasks you trust, keep backups, and review [Security](#security) before use.

## Self-host

Read [selfhost/README.md](selfhost/README.md). In short:

1. Fill in `selfhost/.env.auth-api` from `selfhost/env.auth-api.example`.
2. `selfhost/deploy.sh auth` deploys the account service (a Cloudflare Worker with D1 and R2).
3. `selfhost/deploy.sh signal` starts Signal, TURN and the email hook on your server.
4. Build the server on the server, then `selfhost/deploy.sh server` starts it in Docker.
5. `purplebot login` on the server. Sign-in codes arrive by email from your own mail account.

## What is different from OpenBot

- The name, the logo, the icon set and the brand color are PurpleBot's own.
- The account service serves only the sign-in, the web client at `/app`, its APIs, a small
  landing page, and a short privacy page and terms page. The marketing pages of upstream are gone.
- A server that starts with `OPENBOT_AUTH_API_URL` sends no usage analytics and no error reports.
- Help and feedback links point to this repository.
- TURN relays to public IPv4 peers again (see `remote/coturn/turnserver.conf`).

Internal identifiers keep the names of upstream, so that the fork can take new upstream
changes: the `OPENBOT_*` environment variables, the `openbot://` link scheme, `openbot.db`,
the `@openbot/*` packages and most file names. New data lives in `~/PurpleBot`.

## Upstream documents

`docs/`, `PRIVACY.md`, `ANALYTICS.md`, `CHANGELOG.md`, `AGENTS.md`, `CONTRIBUTING.md` and
`marketplace/production-catalog/` are the documents and the content of the upstream project.
They describe OpenBot. They stay in the repository for reference and for the license notices.
They are not the documentation of PurpleBot.

## Limits of this fork

- A desktop build of this fork still has the account service of upstream as its default. Start
  it with `OPENBOT_AUTH_API_URL` and `OPENBOT_REMOTE_SIGNAL_URL`, as `selfhost/README.md` shows.
- The phone app is the OpenBot app of upstream from the App Store and Google Play. It connects
  to a self-hosted service only through the connection QR code.
- Marketplace share links and agent-template links keep their upstream addresses, because they
  are a link format between apps.

## Security

Agents run with full access to the computer of the server. Keep the server for accounts that you
trust, back up its data volume, and read the security notes of upstream in
[docs/architecture/change-rules.md](docs/architecture/change-rules.md) and
[CONTRIBUTING.md](CONTRIBUTING.md#security-sensitive-changes).

## License

PolyForm Noncommercial 1.0.0, see [LICENSE](LICENSE) and [NOTICE](NOTICE). Use it and share it
for noncommercial purposes only. Keep `LICENSE` and `NOTICE` with every copy. The copyright of
the source code belongs to its upstream authors. This fork has no right to the OpenBot name or
logo and does not use them. A commercial license is available from the upstream owner, see
[NOTICE](NOTICE).
