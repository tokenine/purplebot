import type { PartialTranslation } from "../../message";
import type { messages as source } from "../en/startup";

export const messages = {
  "startup.failedTitle": "PurpleBot не удалось запустить",
  "startup.failedBody":
    "{message}\n\nЛокальные данные не сброшены и не перезаписаны. Шаги восстановления — в руководстве по устранению неполадок.",
  "startup.archiveChangedTitle": "Файлы PurpleBot изменены",
  "startup.archiveChangedBody":
    "Другая программа изменила файл PurpleBot app.asar. Сейчас PurpleBot работает, но после выхода он больше не запустится.\n\nЧтобы исправить это, установите PurpleBot заново. Ваши локальные данные сохранятся.",
  "startup.archiveChangedDownload": "Скачать PurpleBot",
  "startup.filesDamagedBody":
    "Некоторые файлы PurpleBot повреждены или отсутствуют.\n\nЧтобы исправить это, установите PurpleBot заново. Ваши локальные данные сохранятся.",
  "startup.newerDataUpdatingTitle": "Обновление PurpleBot",
  "startup.newerDataUpdatingBody":
    "Более новая версия PurpleBot сохранила ваши данные. PurpleBot устанавливает последнюю версию и затем откроется снова.\n\nВаши локальные данные не были сброшены или перезаписаны.",
  "startup.newerDataTitle": "Установите последнюю версию PurpleBot",
  "startup.newerDataBody":
    "Более новая версия PurpleBot сохранила ваши данные, и эта версия ({version}) не может их открыть. Установите последнюю версию, чтобы открыть данные.\n\nВаши локальные данные не были сброшены или перезаписаны.",
  "startup.newerDataDownload": "Скачать PurpleBot",
  "startup.newerDataGuide": "Открыть руководство",
  "startup.newerDataQuit": "Выйти",
  "startup.newerDataLoopTitle": "Последняя версия PurpleBot не открылась",
  "startup.newerDataLoopBody":
    "Более новая версия PurpleBot сохранила ваши данные, и эта версия ({version}) не может их открыть. PurpleBot {loopVersion} несколько раз подряд останавливался до открытия, поэтому он не будет установлен снова.\n\nУстановите версию новее {loopVersion}, когда она появится. Чтобы получить помощь, откройте руководство.\n\nВаши локальные данные не были сброшены или перезаписаны.",
  "startup.newerDataReleases": "Показать версии",
  "startup.recoveryWindowTitle": "Восстановление PurpleBot",
  "startup.recoveryTitle": "PurpleBot не открылся",
  "startup.recoveryBody": {
    one: "PurpleBot {version} остановился до открытия {count} раз подряд. Ваши локальные данные не сброшены и не перезаписаны.",
    few: "PurpleBot {version} остановился до открытия {count} раза подряд. Ваши локальные данные не сброшены и не перезаписаны.",
    many: "PurpleBot {version} остановился до открытия {count} раз подряд. Ваши локальные данные не сброшены и не перезаписаны.",
    other:
      "PurpleBot {version} остановился до открытия {count} раза подряд. Ваши локальные данные не сброшены и не перезаписаны.",
  },
  "startup.recoveryHint":
    "Попробуйте снова или установите последнюю версию, которая открывалась. Чтобы получить помощь, экспортируйте диагностику и отправьте файл вместе с отчётом.",
  "startup.recoveryHintLatest":
    "PurpleBot не нашёл более раннюю версию, которая может открыть ваши данные. Попробуйте снова или установите последнюю версию. Чтобы получить помощь, экспортируйте диагностику и отправьте файл вместе с отчётом.",
  "startup.recoveryRetry": "Повторить",
  "startup.recoveryPreviousVersion": "Скачать прошлую версию",
  "startup.recoveryLatestVersion": "Скачать последнюю версию",
  "startup.recoveryExportDiagnostics": "Экспорт диагностики",
  "startup.recoveryOpenDataFolder": "Открыть папку данных",
  "startup.recoveryQuit": "Выйти",
  "startup.recoveryDiagnosticsSaved": "Файл диагностики сохранён.",
  "startup.recoveryActionFailed": "PurpleBot не удалось выполнить это действие.",
} as const satisfies PartialTranslation<typeof source>;
