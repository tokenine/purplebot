import { createFileRoute } from "@tanstack/solid-router";
import { LandingPage } from "../components/bare/LandingPage";
import { OPENBOT_SITE_DESCRIPTION, OPENBOT_SITE_TITLE } from "../lib/site-metadata";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [{ title: OPENBOT_SITE_TITLE }, { name: "description", content: OPENBOT_SITE_DESCRIPTION }],
  }),
  component: LandingPage,
});
