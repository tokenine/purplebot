// Write apps/auth-api/wrangler.jsonc for a self-hosted account service.
//
// Input: selfhost/.env.auth-api (see selfhost/env.auth-api.example).
// Output: a plain-JSON wrangler config with your domain, your D1 database and the
// sign-in mail settings. EMAIL_DELIVERY_MODE is "webhook" (default: the Worker
// posts each code to selfhost/email-hook.yaml) or "smtp" (the Worker sends it).
// No openbot.run route, no upstream service bindings, no send_email binding, and
// no preview or test environments. The deploy script runs without --env, so the
// preview section is not needed.
//
// Run from the repository root: bun selfhost/write-wrangler-config.ts

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const selfhostRoot = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(selfhostRoot, "..");
const envPath = join(selfhostRoot, ".env.auth-api");

function fail(message: string): never {
  console.error(`write-wrangler-config: ${message}`);
  process.exit(1);
}

function readEnv(path: string): Map<string, string> {
  let text: string;
  try {
    text = readFileSync(path, "utf8");
  } catch {
    fail(`${path} is missing. Copy selfhost/env.auth-api.example to selfhost/.env.auth-api and fill it in.`);
  }
  const values = new Map<string, string>();
  for (const line of text.split("\n")) {
    const entry = line.trim();
    if (!entry || entry.startsWith("#")) continue;
    const at = entry.indexOf("=");
    if (at <= 0) continue;
    values.set(
      entry.slice(0, at).trim(),
      entry
        .slice(at + 1)
        .trim()
        .replace(/^["']|["']$/gu, ""),
    );
  }
  return values;
}

function required(values: Map<string, string>, name: string): string {
  const value = values.get(name)?.trim();
  if (!value) fail(`${name} is missing in selfhost/.env.auth-api.`);
  return value;
}

const env = readEnv(envPath);

const apiDomain = required(env, "API_DOMAIN");
const workerName = env.get("WORKER_NAME")?.trim() || "purplebot-auth-api";
const d1DatabaseName = env.get("D1_DATABASE_NAME")?.trim() || "purplebot-auth";
const d1DatabaseId = required(env, "D1_DATABASE_ID");
const deployEmailRelay = env.get("DEPLOY_EMAIL_RELAY")?.trim() === "1";
const emailRelayService = env.get("EMAIL_RELAY_SERVICE")?.trim() || "purplebot-email-relay";
const emailDeliveryMode = env.get("EMAIL_DELIVERY_MODE")?.trim() === "smtp" ? "smtp" : "webhook";
const emailDeliveryWebhookUrl = env.get("EMAIL_DELIVERY_WEBHOOK_URL")?.trim() || "";
const emailSmtpHost =
  emailDeliveryMode === "smtp" ? required(env, "EMAIL_SMTP_HOST") : env.get("EMAIL_SMTP_HOST")?.trim() || "";
const emailSmtpPort = env.get("EMAIL_SMTP_PORT")?.trim() || "465";
const emailSmtpUsername =
  emailDeliveryMode === "smtp" ? required(env, "EMAIL_SMTP_USERNAME") : env.get("EMAIL_SMTP_USERNAME")?.trim() || "";
const emailFrom = emailDeliveryMode === "smtp" ? required(env, "EMAIL_FROM") : env.get("EMAIL_FROM")?.trim() || "";
const emailReplyTo = env.get("EMAIL_REPLY_TO")?.trim() || "";
const remoteSignalUrl = required(env, "REMOTE_SIGNAL_URL");
const remoteAuthWebhookUrl = required(env, "REMOTE_AUTH_WEBHOOK_URL");
const remoteTicketKeyId = env.get("REMOTE_TICKET_KEY_ID")?.trim() || "purplebot-remote-1";
const hostedServersEnabled = env.get("HOSTED_SERVERS_ENABLED")?.trim() || "false";

if (!remoteSignalUrl.startsWith("wss://")) fail("REMOTE_SIGNAL_URL must be a wss:// URL.");
if (!/^https:\/\//u.test(apiDomain)) fail("API_DOMAIN must be an https:// origin.");
if (emailDeliveryMode === "webhook" && !/^https:\/\//u.test(emailDeliveryWebhookUrl)) {
  fail("EMAIL_DELIVERY_WEBHOOK_URL must be an https:// origin when EMAIL_DELIVERY_MODE=webhook.");
}

const config = {
  $schema: "node_modules/wrangler/config-schema.json",
  name: workerName,
  compatibility_date: "2026-08-18",
  compatibility_flags: ["nodejs_compat"],
  main: "src/worker-entry.ts",
  workers_dev: false,
  preview_urls: false,
  cache: { enabled: true, cross_version_cache: false },
  observability: { enabled: false },
  upload_source_maps: false,
  triggers: { crons: ["*/5 * * * *", "*/1 * * * *"] },
  routes: [{ pattern: apiDomain.replace(/^https:\/\//u, ""), custom_domain: true }],
  secrets: {
    required: [
      ...(emailDeliveryMode === "smtp" ? ["EMAIL_SMTP_PASSWORD"] : []),
      "SKILLS_ADMIN_TOKEN",
      "SITE_REPORT_HASH_SECRET",
      "REMOTE_TICKET_PRIVATE_JWK",
      "REMOTE_TICKET_PUBLIC_JWKS",
      "REMOTE_AUTH_WEBHOOK_SECRET",
    ],
  },
  vars: {
    AUTH_EXPOSE_DEVELOPMENT_CODE: "false",
    ...(emailDeliveryMode === "webhook"
      ? { EMAIL_DELIVERY_WEBHOOK_URL: emailDeliveryWebhookUrl }
      : {
          EMAIL_SMTP_HOST: emailSmtpHost,
          EMAIL_SMTP_PORT: emailSmtpPort,
          EMAIL_SMTP_USERNAME: emailSmtpUsername,
          EMAIL_FROM: emailFrom,
        }),
    EMAIL_REPLY_TO: emailReplyTo,
    EMAIL_LICENSE_REPLY_TO: emailReplyTo,
    EMAIL_LICENSE_FROM: "",
    REMOTE_TICKET_KEY_ID: remoteTicketKeyId,
    REMOTE_SIGNAL_URL: remoteSignalUrl,
    REMOTE_SIGNAL_HOMES: "",
    REMOTE_SIGNAL_HOME_LOCATIONS: "",
    REMOTE_SIGNAL_HOME_COUNTRIES: "",
    REMOTE_AUTH_WEBHOOK_URL: remoteAuthWebhookUrl,
    REMOTE_AUTH_WEBHOOK_URLS: "",
    SIGNAL_ENTRY_ZONE_ID: "",
    HOSTED_SERVERS_ENABLED: hostedServersEnabled,
    HOSTED_SERVERS_ALLOWED_USER_IDS: "",
    LICENSE_TRIAL_END: "",
    BILLING_COUNTRY_REQUIRED: "false",
    GITHUB_APP_CLIENT_ID: "",
    FEEDBACK_WITHDRAWN_REPOSITORY: "",
    APNS_TEAM_ID: "",
    APNS_TOPIC: "",
  },
  services:
    deployEmailRelay && emailDeliveryMode === "smtp" ? [{ binding: "EMAIL_RELAY", service: emailRelayService }] : [],
  d1_databases: [
    {
      binding: "DB",
      database_name: d1DatabaseName,
      database_id: d1DatabaseId,
      migrations_dir: "migrations",
    },
  ],
  r2_buckets: [
    { binding: "AVATARS", bucket_name: env.get("R2_AVATARS_BUCKET")?.trim() || "purplebot-avatars" },
    { binding: "SKILLS", bucket_name: env.get("R2_SKILLS_BUCKET")?.trim() || "purplebot-skills" },
    { binding: "SITES", bucket_name: env.get("R2_SITES_BUCKET")?.trim() || "purplebot-sites" },
  ],
  ratelimits: [
    { name: "MARKETPLACE_INGRESS_RATE_LIMITER", namespace_id: "2026082701", simple: { limit: 300, period: 60 } },
    { name: "MARKETPLACE_MUTATION_RATE_LIMITER", namespace_id: "2026082702", simple: { limit: 30, period: 60 } },
    { name: "MARKETPLACE_UPLOAD_RATE_LIMITER", namespace_id: "2026082703", simple: { limit: 5, period: 60 } },
    { name: "SITE_REPORT_RATE_LIMITER", namespace_id: "2026083101", simple: { limit: 10, period: 60 } },
    { name: "GITHUB_TOKEN_RATE_LIMITER", namespace_id: "2026092911", simple: { limit: 30, period: 60 } },
    { name: "LIVE_ACTIVITY_RATE_LIMITER", namespace_id: "2026092901", simple: { limit: 300, period: 60 } },
    { name: "FEEDBACK_RATE_LIMITER", namespace_id: "2026110801", simple: { limit: 3, period: 60 } },
  ],
};

const target = join(repoRoot, "apps", "auth-api", "wrangler.jsonc");
writeFileSync(target, `${JSON.stringify(config, null, 2)}\n`);
console.log(`write-wrangler-config: wrote ${target} (account service ${apiDomain}, worker ${workerName}).`);
console.log(
  "write-wrangler-config: this file replaces the upstream config. Keep selfhost/.env.auth-api as your source of truth.",
);
