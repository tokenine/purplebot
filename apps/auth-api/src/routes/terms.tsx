import { createFileRoute } from "@tanstack/solid-router";
import { LegalPage } from "../components/bare/LegalPage";
import { Terms } from "../content/terms";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms · PurpleBot" }] }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <LegalPage titleId="terms-title" title="Terms">
      <Terms />
    </LegalPage>
  );
}
