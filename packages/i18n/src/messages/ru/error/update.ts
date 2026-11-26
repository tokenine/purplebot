import type { PartialTranslation } from "../../../message";
import type { messages as source } from "../../en/error/update";

export const messages = {
  "error.update.unsupported": "Обновления доступны в установленных сборках для компьютера.",
  "error.update.notReady": "Обновление не готово к установке.",
  "error.update.restartFailed": "PurpleBot не смог перезапуститься для установки обновления.",
  "error.update.downloadStalled": "Загрузка обновления перестала отвечать. Повторите попытку.",
  "error.update.installFailed":
    "Не удалось установить обновление. Закройте и снова откройте PurpleBot, затем повторите попытку.",
  "error.update.notInstalled": "Последний перезапуск не установил обновление. Перезапустите, чтобы повторить попытку.",
  "error.update.downloadFailed": "Не удалось загрузить обновление. Повторите попытку.",
  "error.update.signatureNotConfirmed":
    "PurpleBot не удалось проверить обновление. Повторите попытку. Если ошибка повторяется, скачайте PurpleBot на openbot.run/download.",
  "error.update.checkFailed": "Не удалось проверить обновления. Повторите попытку.",
  "error.update.checkStalled": "Проверка обновлений перестала отвечать. Повторите попытку.",
  "error.update.checkOffline":
    "Не удалось связаться со службой обновлений. Проверьте подключение к интернету и повторите попытку.",
  "error.update.checkUnavailable":
    "Служба обновлений не ответила. PurpleBot сам повторит попытку через несколько минут.",
  "error.update.checkNoRelease":
    "Для этой платформы не найдено опубликованных обновлений. PurpleBot сам повторит попытку через несколько минут.",
  "error.update.managedByNix": "Обновления этой копии PurpleBot устанавливает Nix. Обновите её через Nix.",
  "error.update.managedByHost":
    "Обновления на этом Mac устанавливает хост. Обновление остаётся готовым до начала обслуживания хоста.",
  "error.update.siblingSession":
    "Из этого приложения всё ещё запущена другая сессия PurpleBot. Сначала закройте PurpleBot во всех других учётных записях macOS, затем установите обновление снова.",
  "error.update.siblingSessionSameAccount":
    "В этой учётной записи всё ещё работает другой процесс PurpleBot. Завершите его, затем установите обновление снова.",
  "error.update.siblingCheckFailed":
    "Не удалось проверить другие сессии PurpleBot. Повторите попытку перед установкой.",
  "error.update.readOnlyLocation":
    "PurpleBot не может устанавливать обновления из этого места. Закройте PurpleBot. В Finder перетащите PurpleBot в папку «Программы» (если он уже там, перетащите его наружу и обратно). Затем откройте PurpleBot и установите обновление снова.",
  "error.update.appImageMissing":
    "PurpleBot не может установить обновление, потому что его файл AppImage был перемещён, переименован или заменён. Закройте PurpleBot, затем снова откройте файл AppImage.",
  "error.update.appImageReadOnly":
    "PurpleBot не может устанавливать обновления в папку своего файла AppImage. Закройте PurpleBot, переместите файл AppImage в папку внутри домашней папки, затем откройте его и снова установите обновление.",
  "error.update.remoteDisabled": "Обновления от администраторов сервера отключены на этом компьютере.",
  "error.update.restartStarted": "PurpleBot уже перезапускается для установки обновления.",
  "error.update.alreadyRestarting": "PurpleBot уже перезапускается.",
} as const satisfies PartialTranslation<typeof source>;
