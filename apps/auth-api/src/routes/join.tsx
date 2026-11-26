import { createFileRoute } from "@tanstack/solid-router";
import { JoinPage } from "../components/transactional/JoinPage";
import { joinPageText } from "../components/transactional/page-text";
import { loadPageText } from "../lib/page-text";

export const Route = createFileRoute("/join")({
  loader: ({ context }) => loadPageText(context.locale, joinPageText),
  head: ({ loaderData }) => {
    const text = loaderData?.text;
    return {
      meta: [
        ...(text ? [{ title: text.title }, { name: "description", content: text.description }] : []),
        { name: "robots", content: "noindex, nofollow, noarchive" },
        { name: "referrer", content: "no-referrer" },
      ],
    };
  },
  headers: () => ({
    "Cache-Control": "no-store",
    "Referrer-Policy": "no-referrer",
    "X-Robots-Tag": "noindex, nofollow, noarchive",
  }),
  component: Join,
});

function Join() {
  const page = Route.useLoaderData();
  return <JoinPage lang={page().lang} text={page().text} />;
}
