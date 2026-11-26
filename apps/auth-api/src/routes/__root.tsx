import interLatinFont from "@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url";
import type { JSX } from "@solidjs/web";
import { createRootRoute, type ErrorComponentProps, HeadContent, Outlet, Scripts } from "@tanstack/solid-router";
import { createSignal, onSettled, Show } from "solid-js";
import "@openbot/brand/logo.css";
import { rememberPromotionCode } from "@openbot/contracts/promotion-code";
import { rememberReferralCode } from "@openbot/contracts/referral";
import { installPointerFocusGuard } from "@openbot/ui/pointer-focus";
import "../styles.css";
import { NotFoundPage } from "../components/bare/NotFoundPage";
import { PageError } from "../components/bare/PageError";
import { type RootPageText, rootPageText } from "../components/transactional/page-text";
import { loadPageText, type PageText } from "../lib/page-text";
import { requestLocale } from "../lib/request-locale";
import { OPENBOT_SECURITY_HEADERS, openBotRootHead } from "../lib/site-metadata";

const NOT_FOUND_TITLE = "Page not found · PurpleBot";

export const Route = createRootRoute({
  beforeLoad: () => ({ locale: requestLocale() }),
  loader: async ({ context }) => loadPageText(context.locale, rootPageText),
  shouldReload: false,
  head: ({ matches }) => {
    const head = openBotRootHead(interLatinFont);
    if (!matches.some((match) => match._notFound)) return head;
    return { ...head, meta: head.meta.map((tag) => ("title" in tag ? { title: NOT_FOUND_TITLE } : tag)) };
  },
  headers: () => ({ ...OPENBOT_SECURITY_HEADERS, Vary: "Accept-Language, Cookie" }),
  component: RootComponent,
  shellComponent: RootDocument,
  errorComponent: RootError,
  notFoundComponent: NotFoundPage,
});

function RootComponent() {
  onSettled(() => installPointerFocusGuard());
  onSettled(() => rememberPromotionCode(() => window.localStorage, window.location.href, Date.now()));
  onSettled(() => rememberReferralCode(() => window.localStorage, window.location.href, Date.now()));
  return <Outlet />;
}

function RootError(props: ErrorComponentProps) {
  console.error(props.error);
  const loaded = Route.useMatch({ select: (match) => match.loaderData });
  const [fallback, setFallback] = createSignal<PageText<RootPageText>>();
  onSettled(() => {
    if (loaded()) return;
    void loadPageText("en", rootPageText).then((page) => setFallback(page));
  });
  return (
    <Show when={loaded() ?? fallback()}>
      {(page) => <PageError lang={page().lang} text={page().text.error} onRetry={() => window.location.reload()} />}
    </Show>
  );
}

const NO_SCRIPT_STYLE = "<style>[data-revealed=false],[data-revealed=false] *{opacity:1!important}</style>";

function RootDocument(props: { children: JSX.Element }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <HeadContent />
        <noscript innerHTML={NO_SCRIPT_STYLE} />
      </head>
      <body>
        {props.children}
        <Scripts />
      </body>
    </html>
  );
}
