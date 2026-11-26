### Added

- A self-host bundle in `selfhost/`. It runs the account service on your own Cloudflare account,
  and Signal, TURN, the email hook and the server on your own Linux server, with no connection to
  `openbot.run`. `selfhost/README.md` has the steps.

### Changed

- The app identifiers of this fork are PurpleBot: the app ID, the product name, the image name and
  the release repository. The Linux executable keeps the name `openbot`.
- A server that starts with `OPENBOT_AUTH_API_URL` sends no usage analytics and no error reports.
- The account service accepts an SMTP user name that is not an email address, such as the
  `api_token` of Cloudflare SMTP.

### Fixed

- The TURN server relays to public IPv4 peers again. Before, its `denied-peer-ip` rules in IPv6
  notation made coturn 4.17.2 refuse each IPv4 peer, so a client behind NAT could not connect.
- The account service deploy script no longer stops when the OpenPanel secrets or the home page
  beam are not in the checkout.
