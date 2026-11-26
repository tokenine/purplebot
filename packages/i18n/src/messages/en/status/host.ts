import { defineMessages } from "../../../message";

export const messages = defineMessages("status.host", {
  "status.host.registered": "Registered this PurpleBot for WebRTC access.",
  "status.host.keyRotated": "Server key changed. Paired devices stay paired.",
  "status.host.identityUpdated": "Server identity updated.",
  "status.host.starting": "Starting the WebRTC host…",
  "status.host.ready": "This PurpleBot is ready for WebRTC connections.",
  "status.host.signalLost": "Other devices cannot reach this PurpleBot now. It connects again.",
  "status.host.stopping": "Making this PurpleBot private…",
  "status.host.private": "This PurpleBot is private.",
  "status.host.removed": "This PurpleBot was removed from your account. Publish it again to share it.",
});
