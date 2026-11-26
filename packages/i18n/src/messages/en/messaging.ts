import { defineMessages } from "../../message";

export const messages = defineMessages("messaging", {
  "messaging.help.invalid_token":
    "Slack no longer accepts PurpleBot in this workspace. It may have been uninstalled. Connect the workspace again.",
  "messaging.help.secret_storage_unavailable":
    "PurpleBot cannot read the saved tokens on this computer. Disconnect the workspace, then connect it again.",
  "messaging.help.relay_unavailable":
    "PurpleBot cannot receive Slack events on this computer. Sign in, give this computer a name in Server settings, and keep PurpleBot open.",
  "messaging.help.not_linked": "This workspace is not linked to this server. Select Reconnect to link it.",
  "messaging.discordHelp.invalid_token":
    "Discord no longer accepts PurpleBot in this Discord server. It may have been removed. Connect the Discord server again.",
  "messaging.discordHelp.secret_storage_unavailable":
    "PurpleBot cannot read the saved tokens on this computer. Disconnect the Discord server, then connect it again.",
  "messaging.discordHelp.relay_unavailable":
    "PurpleBot cannot receive Discord events on this computer. Sign in, give this computer a name in Server settings, and keep PurpleBot open.",
  "messaging.discordHelp.not_linked":
    "This Discord server is not linked to this PurpleBot server. Select Reconnect to link it.",
});
