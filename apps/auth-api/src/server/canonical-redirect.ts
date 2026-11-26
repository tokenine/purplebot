export function permanentTrailingSlashRedirect(request: Request, response: Response): Response {
  if (response.status !== 307 || (request.method !== "GET" && request.method !== "HEAD")) return response;
  const location = response.headers.get("Location");
  if (!location) return response;
  const url = new URL(request.url);
  const target = new URL(location, url);
  const trimmed = url.pathname.replace(/\/+$/, "");
  if (trimmed === "" || trimmed === url.pathname) return response;
  if (target.origin !== url.origin || target.pathname !== trimmed || target.search !== url.search) return response;
  return new Response(null, { status: 308, headers: response.headers });
}

export function installReturnPage(path: string, callbackUrl: URL): URL {
  return new URL(path, callbackUrl);
}

export function companySignInApiOrigin(siteUrl: URL): string {
  return siteUrl.origin;
}

export function inviteLinkOrigin(requestUrl: URL): string {
  return requestUrl.origin;
}
