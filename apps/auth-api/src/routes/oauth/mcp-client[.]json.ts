import { env } from "cloudflare:workers";
import { createFileRoute } from "@tanstack/solid-router";
import { requestSiteOrigin } from "../../lib/site-metadata";
import { requireWorkerBindings } from "../../server/types";

const MCP_CLIENT_METADATA_PATH = "/oauth/mcp-client.json";

function mcpClientMetadataResponse({ request }: { request: Request }): Response {
  const origin = requestSiteOrigin(new URL(request.url), requireWorkerBindings(env).SITE_ORIGIN);
  return Response.json(
    {
      client_id: `${origin}${MCP_CLIENT_METADATA_PATH}`,
      client_name: "PurpleBot",
      client_uri: origin,
      logo_uri: `${origin}/icon-512x512.png`,
      redirect_uris: ["http://127.0.0.1:28417/mcp-auth"],
      application_type: "native",
      grant_types: ["authorization_code", "refresh_token"],
      response_types: ["code"],
      token_endpoint_auth_method: "none",
    },
    { headers: { "Cache-Control": "public, max-age=300", "X-Content-Type-Options": "nosniff" } },
  );
}

export const Route = createFileRoute("/oauth/mcp-client.json")({
  server: { handlers: { GET: mcpClientMetadataResponse } },
});
