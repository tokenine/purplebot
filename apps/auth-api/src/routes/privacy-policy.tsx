import { createFileRoute } from "@tanstack/solid-router";
import { LegalPage } from "../components/bare/LegalPage";
import { PrivacyPolicy } from "../content/privacy-policy";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({ meta: [{ title: "Privacy · PurpleBot" }] }),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return (
    <LegalPage titleId="privacy-title" title="Privacy">
      <PrivacyPolicy />
    </LegalPage>
  );
}
