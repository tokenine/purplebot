import { AppLogo } from "@openbot/brand";

export function BareHeader() {
  return (
    <header class="landing-header">
      <a class="landing-brand" href="/">
        <AppLogo variant="production" class="landing-brand-logo" />
        <span>PurpleBot</span>
      </a>
    </header>
  );
}
