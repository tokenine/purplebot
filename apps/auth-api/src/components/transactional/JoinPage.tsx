import { AppLogo } from "@openbot/brand";
import { createWebAppInvitePath, OPENBOT_INVITE_ORIGIN, toOpenBotInviteUrl } from "@openbot/contracts/invite-links";
import { createSignal, onSettled, Show } from "solid-js";
import { Button } from "../ui/button";
import { createOpenAppFallback, OpenAppFallbackDialog, WEB_APP_PATH } from "./OpenAppFallback";
import type { JoinPageText } from "./page-text";
import { TransactionalPage } from "./TransactionalPage";

export function JoinPage(props: { lang: string; text: JoinPageText }) {
  const [openUrl, setOpenUrl] = createSignal("");
  const [browserUrl, setBrowserUrl] = createSignal("");
  const [mobile, setMobile] = createSignal(false);
  const [invalid, setInvalid] = createSignal(false);
  const fallback = createOpenAppFallback();

  onSettled(() => {
    setMobile(
      /android|iphone|ipad|ipod/iu.test(navigator.userAgent) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1),
    );
    try {
      const pageUrl = new URL(window.location.href);
      const canonicalUrl = new URL(`${pageUrl.pathname}${pageUrl.search}`, OPENBOT_INVITE_ORIGIN);
      setOpenUrl(toOpenBotInviteUrl(canonicalUrl.toString()));
      setBrowserUrl(createWebAppInvitePath(canonicalUrl.toString()));
    } catch {
      setInvalid(true);
    }
  });

  const armFallback = () => {
    if (!mobile()) fallback.arm();
  };

  return (
    <TransactionalPage titleId="join-title" lang={props.lang} legal={props.text.legal}>
      <AppLogo variant="production" animation="blink" class="join-card-logo" />
      <p class="join-card-eyebrow">{props.text.eyebrow}</p>
      <h1 id="join-title">{props.text.title}</h1>
      <p class="join-card-copy">{props.text.intro}</p>

      <Show when={!invalid()} fallback={<p class="join-card-error">{props.text.invalid}</p>}>
        <div class="join-card-actions join-card-actions-full">
          <Show
            when={openUrl()}
            fallback={
              <Button as="button" type="button" disabled variant="primary" size="lg" icon="open">
                {props.text.open}
              </Button>
            }
          >
            {(href) => (
              <Button href={href()} variant="primary" size="lg" icon="open" onClick={armFallback}>
                {props.text.open}
              </Button>
            )}
          </Show>
        </div>
        <Show when={browserUrl()}>
          {(href) => (
            <p class="join-card-alternatives">
              <a href={href()}>{props.text.inBrowser}</a>
            </p>
          )}
        </Show>
      </Show>

      <Show when={mobile()}>
        <p class="join-card-note">{props.text.mobile}</p>
      </Show>
      <p class="join-card-note">{props.text.email}</p>
      <OpenAppFallbackDialog
        fallback={fallback}
        text={props.text.openAppFallback}
        href={browserUrl() || WEB_APP_PATH}
        label={props.text.inBrowser}
      />
    </TransactionalPage>
  );
}
