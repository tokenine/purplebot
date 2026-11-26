import type { WebMessagingInstallPlatform } from "@openbot/contracts/web-messaging-install";
import type { AppTranslate } from "@openbot/i18n";
import type { FailureKind } from "./MessagingConnectPage";

const PROVIDER_NAMES: Record<WebMessagingInstallPlatform, string> = { slack: "Slack", discord: "Discord" };

export interface LegalLinkText {
  privacy: string;
  terms: string;
}

function legalLinks(t: AppTranslate): LegalLinkText {
  return { privacy: t("sitePage.site.footer.privacy"), terms: t("sitePage.site.footer.terms") };
}

export function joinPageText(t: AppTranslate) {
  const open = t("sitePage.join.open");
  return {
    eyebrow: t("sitePage.join.eyebrow"),
    title: t("sitePage.join.title"),
    description: t("sitePage.join.description"),
    intro: t("sitePage.join.intro"),
    invalid: t("sitePage.join.invalid"),
    open,
    inBrowser: t("sitePage.join.browserLink"),
    mobile: t("sitePage.join.mobile", { open }),
    email: t("sitePage.join.email"),
    openAppFallback: openAppFallbackText(t, t("sitePage.join.notOpened", { open })),
    legal: legalLinks(t),
  };
}

export type JoinPageText = ReturnType<typeof joinPageText>;

export function messagingConnectText(t: AppTranslate, platform: WebMessagingInstallPlatform) {
  const name = PROVIDER_NAMES[platform];
  const connect = platform === "slack" ? t("connector.slack.connect") : t("connector.discord.connect");
  return {
    name,
    title: t("sitePage.connect.title"),
    failedTitle: t("sitePage.connect.failedTitle"),
    openApp: t("sitePage.connect.openApp"),
    tryAgainApp: t("sitePage.connect.tryAgainApp"),
    tryAgainBrowser: t("sitePage.connect.tryAgainBrowser"),
    doneInWebClient: t("sitePage.connect.doneInWebClient", { name }),
    doneInApp: t("sitePage.connect.doneInApp", { name }),
    failure: {
      cancelled: t("sitePage.connect.failure.cancelled", { name }),
      expired: t("sitePage.connect.failure.expired", { name }),
      exchange: t("sitePage.connect.failure.exchange", { name }),
      enterprise: t("sitePage.connect.failure.enterprise"),
      taken:
        platform === "slack" ? t("sitePage.connect.failure.takenSlack") : t("sitePage.connect.failure.takenDiscord"),
      unavailable: t("sitePage.connect.failure.unavailable", { name }),
      tabClosed: t("sitePage.connect.failure.tabClosed", { name }),
      failed: t("sitePage.connect.failure.failed", { name }),
    } satisfies Record<FailureKind, string>,
    restartHint: t("sitePage.connect.restartHint", {
      marketplace: t("marketplace.title"),
      apps: t("marketplace.tab.apps"),
      name,
      connect,
    }),
    openAppFallback: openAppFallbackText(t, t("sitePage.connect.notOpened", { name })),
    legal: legalLinks(t),
  };
}

export type MessagingConnectText = ReturnType<typeof messagingConnectText>;

function openAppFallbackText(t: AppTranslate, body: string) {
  return {
    title: t("sitePage.openApp.title"),
    body,
    dismiss: t("sitePage.openApp.dismiss"),
    openInBrowser: t("sitePage.connect.tryAgainBrowser"),
  };
}

export type OpenAppFallbackText = ReturnType<typeof openAppFallbackText>;

function pageErrorText(t: AppTranslate) {
  return {
    title: t("sitePage.error.title"),
    body: t("sitePage.error.body"),
    reload: t("sitePage.error.reload"),
    home: t("sitePage.error.home"),
  };
}

export type PageErrorText = ReturnType<typeof pageErrorText>;

export function rootPageText(t: AppTranslate) {
  return { error: pageErrorText(t) };
}

export type RootPageText = ReturnType<typeof rootPageText>;
