### Added

- Everything of upstream 0.80.0: the account service security fixes (a reflected XSS fix
  in TanStack Start, the CASA hardening of sessions and sign-out, secret redaction in logs),
  the D1 overload Retry-After and request sessions with replica reads, the email overflow
  mailboxes schema, the watch sessions and Chrome extension linking of upstream, the
  mobile dictation and reconnect fixes, the Windows Computer Use fix, MAGI-2 and the
  new agent features.

### Changed

- The account service keeps the trimmed self-host site: the marketing pages of upstream
  stay out, the Chrome extension feature of upstream is not served, and the analytics
  target stays configurable.
- The `X-OpenBot-WebRTC-Session` header keeps the name of upstream so the live browser
  view and the computer screen keep streaming to every client.
