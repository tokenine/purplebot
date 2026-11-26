// Email delivery webhook receiver for the PurpleBot self-host bundle.
//
// A Cloudflare Worker does not always get a reply from an SMTP port, so the
// account service posts each sign-in code here (EMAIL_DELIVERY_WEBHOOK_URL).
// This service sends it with the curl command from the Cloudflare SMTP guide:
//
//   curl --ssl-reqd --url "smtps://smtp.mx.cloudflare.net:465" \
//        --user "api_token:<API_TOKEN>" --mail-from <from> --mail-rcpt <to> \
//        --upload-file message.txt
//
// The account service calls:
//   POST /email-code
//   Authorization: Bearer <EMAIL_DELIVERY_WEBHOOK_SECRET>
//   { "email": "to@example.com", "code": "ABCD-EFGH", "expiresAt": 1795698000000 }
//
// This service sends a sign-in code and nothing else.

const PORT = Number(process.env.PORT ?? 8444);
const SECRET = process.env.WEBHOOK_SECRET ?? "";
const SMTP_URL = `smtps://${process.env.EMAIL_SMTP_HOST}:${process.env.EMAIL_SMTP_PORT ?? 465}`;
const SMTP_USER = `${process.env.EMAIL_SMTP_USERNAME}:${process.env.EMAIL_SMTP_PASSWORD}`;
const EMAIL_FROM = process.env.EMAIL_FROM ?? "";
const CODE_PATTERN = /^[23456789ABCDEFGHJKLMNPQRSTUVWXYZ]{4}-[23456789ABCDEFGHJKLMNPQRSTUVWXYZ]{4}$/;

// A header value must stay on one line.
function oneLine(value: string | undefined): string {
  return (value ?? "").replace(/[\r\n]+/g, " ");
}

// The body of the account service: { email, code, expiresAt }. Another shape gives null.
function parseCodeRequest(value: object): { email: string; code: string; expiresAt: number } | null {
  if (!("email" in value) || typeof value.email !== "string") return null;
  if (!("code" in value) || typeof value.code !== "string") return null;
  if (!("expiresAt" in value) || typeof value.expiresAt !== "number") return null;
  return { email: value.email.trim(), code: value.code.trim(), expiresAt: value.expiresAt };
}

function message(email: string, code: string, expiresInMinutes: number): string {
  const minutes = `${expiresInMinutes} minute${expiresInMinutes === 1 ? "" : "s"}`;
  return [
    `From: ${oneLine(EMAIL_FROM)}`,
    `To: ${oneLine(email)}`,
    "Subject: Your sign-in code",
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=utf-8",
    "",
    "Use this code to sign in:",
    "",
    code,
    "",
    `This code expires in ${minutes} and works once.`,
    "",
    "If you did not request this code, you can ignore this email. Nobody can sign in without it.",
  ].join("\r\n");
}

async function sendByCurl(email: string, text: string): Promise<void> {
  const file = `/tmp/message-${crypto.randomUUID()}.txt`;
  await Bun.write(file, text);
  const curl = Bun.spawn(
    [
      "curl",
      "--ssl-reqd",
      "--silent",
      "--show-error",
      "--max-time",
      "60",
      "--url",
      SMTP_URL,
      "--user",
      SMTP_USER,
      "--mail-from",
      EMAIL_FROM,
      "--mail-rcpt",
      email,
      "--upload-file",
      file,
    ],
    { stdout: "ignore", stderr: "pipe" },
  );
  const [exitCode, stderr] = await Promise.all([curl.exited, new Response(curl.stderr).text()]);
  await Bun.file(file).delete();
  if (exitCode !== 0) throw new Error(stderr.trim() || `curl exit ${exitCode}`);
}

async function main(): Promise<void> {
  Bun.serve({
    port: PORT,
    tls: {
      cert: await Bun.file(process.env.TLS_CERT ?? "").text(),
      key: await Bun.file(process.env.TLS_KEY ?? "").text(),
    },
    async fetch(request) {
      const url = new URL(request.url);
      if (url.pathname !== "/email-code") return new Response("not found\n", { status: 404 });
      if (request.method !== "POST") return new Response("method not allowed\n", { status: 405 });
      if (!SECRET || request.headers.get("Authorization") !== `Bearer ${SECRET}`) {
        return new Response("denied\n", { status: 401 });
      }
      const parsed = await request.json().catch((): null => null);
      const body = typeof parsed === "object" && parsed !== null ? parseCodeRequest(parsed) : null;
      // Only a sign-in code in the format of the account service goes out.
      if (!body || !CODE_PATTERN.test(body.code)) return new Response("bad request\n", { status: 400 });
      const expiresInMinutes = Math.max(1, Math.ceil((body.expiresAt - Date.now()) / 60_000));

      try {
        await sendByCurl(body.email, message(body.email, body.code, expiresInMinutes));
      } catch (error) {
        console.error(`email-hook: send to ${body.email} failed: ${error instanceof Error ? error.message : error}`);
        return new Response("send failed\n", { status: 502 });
      }
      console.log(`email-hook: sent a sign-in code to ${body.email}`);
      return new Response(null, { status: 204 });
    },
  });
  console.log(`email-hook: listening on :${PORT}`);
}

void main();
