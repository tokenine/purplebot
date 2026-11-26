import { AppLogo } from "@openbot/brand";
import { Button } from "../ui/button";
import { BareHeader } from "./BareHeader";

export function NotFoundPage() {
  return (
    <div class="landing-page transactional-page">
      <BareHeader />
      <main class="transactional-main">
        <section class="join-card" aria-labelledby="not-found-title">
          <AppLogo variant="production" class="join-card-logo" />
          <h1 id="not-found-title">Page not found</h1>
          <p class="join-card-copy">This page is not part of this account service.</p>
          <div class="join-card-actions join-card-actions-single">
            <Button href="/" variant="primary" size="lg" icon="arrow-right">
              Home
            </Button>
          </div>
          <p class="join-card-alternatives">
            <a href="/app">Sign in</a> · <a href="/privacy">Privacy</a> · <a href="/terms">Terms</a>
          </p>
        </section>
      </main>
    </div>
  );
}
