import { createFileRoute } from "@tanstack/solid-router";
import { LegalPage } from "../components/bare/LegalPage";
import { PrivacyPolicy } from "../content/privacy-policy";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Privacy · PurpleBot" }] }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <LegalPage titleId="privacy-title" title="Privacy">
      <PrivacyPolicy />
    </LegalPage>
  );
}
