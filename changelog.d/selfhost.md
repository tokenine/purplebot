### Added

- A self-host bundle in `selfhost/`. It runs the account service on your own Cloudflare account,
  and Signal, TURN, the email hook and the server on your own Linux server, with no connection to
  `openbot.run`. `selfhost/README.md` has the steps.
- A way to sign a server in without a mailbox: make a claim at the account service and give it to
  `purplebot login --claim`.
- A build of the phone app for a self-hosted instance: build it with
  `EXPO_PUBLIC_OPENBOT_API_URL=https://your-account-service.example` and the app signs in at that
  account service instead of the one of upstream, and it ships without the update check of
  upstream (`updates.openbot.run`), so it never contacts their systems.

### Changed

- The app is PurpleBot: the name, the logo, the icon set, the brand color, the text of the interface
  in every language, the emails, the server command (`purplebot`) and the Linux executable. The
  `openbot://` link scheme, the `OPENBOT_*` variables, `openbot.db` and the `@openbot/*` packages keep
  their names, so the fork can take new upstream changes.
- The account service serves the sign-in, the web client, its APIs, a small landing page and a short
  privacy page and terms page for a self-hosted instance. The marketing pages of upstream are gone.
- A server that starts with `OPENBOT_AUTH_API_URL` sends no usage analytics and no error reports.
- Help and feedback links open this repository. The Discord, X and other social links of upstream are
  gone from the app.
- The account service accepts an SMTP user name that is not an email address, such as the
  `api_token` of Cloudflare SMTP.
- The agent instructions and tool catalog are a few hundred bytes longer, because the new name has
  two more letters.

### Fixed

- The live browser view and the computer screen of a server stream again. The rename of the
  `X-OpenBot-WebRTC-Session` header on one side of the host made every stream request answer 401,
  so a client saw "The host stream socket failed" when it opened the live view.
- The TURN server relays to public IPv4 peers again. Before, its `denied-peer-ip` rules in IPv6
  notation made coturn 4.17.2 refuse each IPv4 peer, so a client behind NAT could not connect.
- The account service deploy script no longer stops when the OpenPanel secrets or the home page
  beam are not in the checkout.
