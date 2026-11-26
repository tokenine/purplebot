import type { PartialTranslation } from "../../message";
import type { messages as source } from "../en/messaging";

export const messages = {
  "messaging.help.invalid_token":
    "Slack больше не принимает PurpleBot в этом рабочем пространстве. Возможно, приложение удалили. Подключите рабочее пространство заново.",
  "messaging.help.secret_storage_unavailable":
    "PurpleBot не может прочитать сохранённые токены на этом компьютере. Отключите рабочее пространство и подключите его снова.",
  "messaging.help.relay_unavailable":
    "PurpleBot не может получать события Slack на этом компьютере. Войдите в аккаунт, задайте компьютеру имя в настройках сервера и не закрывайте PurpleBot.",
  "messaging.help.not_linked":
    "Это рабочее пространство не связано с этим сервером. Выберите «Переподключить», чтобы связать его.",
  "messaging.discordHelp.invalid_token":
    "Discord больше не принимает PurpleBot на этом сервере Discord. Возможно, приложение удалили. Подключите сервер Discord заново.",
  "messaging.discordHelp.secret_storage_unavailable":
    "PurpleBot не может прочитать сохранённые токены на этом компьютере. Отключите сервер Discord и подключите его снова.",
  "messaging.discordHelp.relay_unavailable":
    "PurpleBot не может получать события Discord на этом компьютере. Войдите в аккаунт, задайте компьютеру имя в настройках сервера и не закрывайте PurpleBot.",
  "messaging.discordHelp.not_linked":
    "Этот сервер Discord не связан с этим сервером PurpleBot. Выберите «Переподключить», чтобы связать его.",
} as const satisfies PartialTranslation<typeof source>;
