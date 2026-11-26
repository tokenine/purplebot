import { AppLogo } from "@openbot/brand";
import { Button } from "../ui/button";
import { BareHeader } from "./BareHeader";

export function LandingPage() {
  return (
    <div class="landing-page transactional-page">
      <BareHeader />
      <main class="transactional-main">
        <section class="join-card" aria-labelledby="landing-title">
          <AppLogo variant="production" animation="blink" class="join-card-logo" />
          <h1 id="landing-title">PurpleBot</h1>
          <p class="join-card-copy">Self-hosted account service. Sign in to reach your PurpleBot server.</p>
          <div class="join-card-actions join-card-actions-single">
            <Button href="/app" variant="primary" size="lg" icon="arrow-right">
              Sign in
            </Button>
          </div>
          <p class="join-card-alternatives">
            <a href="/privacy">Privacy</a> · <a href="/terms">Terms</a>
          </p>
        </section>
      </main>
    </div>
  );
}
