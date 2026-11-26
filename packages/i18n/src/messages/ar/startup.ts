import type { PartialTranslation } from "../../message";
import type { messages as source } from "../en/startup";

export const messages = {
  "startup.failedTitle": "تعذّر بدء تشغيل PurpleBot",
  "startup.failedBody":
    "{message}\n\nلم تُعَد تعيين بياناتك المحلية ولم يُكتب فوقها. راجع دليل استكشاف الأخطاء وإصلاحها لمعرفة خطوات الاسترداد.",
  "startup.archiveChangedTitle": "تم تغيير ملفات PurpleBot",
  "startup.archiveChangedBody":
    "غيّر برنامج آخر ملف PurpleBot المسمى app.asar. يعمل PurpleBot الآن، لكنه لن يفتح بعد إنهائه.\n\nلإصلاح PurpleBot، ثبّته من جديد. تبقى بياناتك المحلية.",
  "startup.archiveChangedDownload": "تنزيل PurpleBot",
  "startup.filesDamagedBody":
    "بعض ملفات PurpleBot تالفة أو مفقودة.\n\nلإصلاح PurpleBot، ثبّته من جديد. تبقى بياناتك المحلية.",
  "startup.newerDataUpdatingTitle": "جارٍ تحديث PurpleBot",
  "startup.newerDataUpdatingBody":
    "حفظ إصدار أحدث من PurpleBot بياناتك. يثبّت PurpleBot أحدث إصدار ثم يفتح مرة أخرى.\n\nلم تتم إعادة تعيين بياناتك المحلية أو الكتابة فوقها.",
  "startup.newerDataTitle": "ثبّت أحدث إصدار من PurpleBot",
  "startup.newerDataBody":
    "حفظ إصدار أحدث من PurpleBot بياناتك، ولا يستطيع هذا الإصدار ({version}) فتحها. ثبّت أحدث إصدار لفتح بياناتك.\n\nلم تتم إعادة تعيين بياناتك المحلية أو الكتابة فوقها.",
  "startup.newerDataDownload": "تنزيل PurpleBot",
  "startup.newerDataGuide": "فتح الدليل",
  "startup.newerDataQuit": "إنهاء",
  "startup.newerDataLoopTitle": "لم يُفتح أحدث إصدار من PurpleBot",
  "startup.newerDataLoopBody":
    "حفظ إصدار أحدث من PurpleBot بياناتك، ولا يستطيع هذا الإصدار ({version}) فتحها. توقف PurpleBot {loopVersion} قبل أن يُفتح عدة مرات متتالية، لذلك لن يُثبَّت مرة أخرى.\n\nثبّت إصدارًا أحدث من {loopVersion} عندما يتوفر. للحصول على المساعدة، افتح الدليل.\n\nلم تتم إعادة تعيين بياناتك المحلية أو الكتابة فوقها.",
  "startup.newerDataReleases": "عرض الإصدارات",
  "startup.recoveryWindowTitle": "استرداد PurpleBot",
  "startup.recoveryTitle": "لم يُفتح PurpleBot",
  "startup.recoveryBody": {
    zero: "توقف PurpleBot {version} قبل أن يُفتح {count} مرة متتالية. لم تتم إعادة تعيين بياناتك المحلية أو الكتابة فوقها.",
    one: "توقف PurpleBot {version} قبل أن يُفتح مرة واحدة ({count}). لم تتم إعادة تعيين بياناتك المحلية أو الكتابة فوقها.",
    two: "توقف PurpleBot {version} قبل أن يُفتح مرتين متتاليتين ({count}). لم تتم إعادة تعيين بياناتك المحلية أو الكتابة فوقها.",
    few: "توقف PurpleBot {version} قبل أن يُفتح {count} مرات متتالية. لم تتم إعادة تعيين بياناتك المحلية أو الكتابة فوقها.",
    many: "توقف PurpleBot {version} قبل أن يُفتح {count} مرة متتالية. لم تتم إعادة تعيين بياناتك المحلية أو الكتابة فوقها.",
    other:
      "توقف PurpleBot {version} قبل أن يُفتح {count} مرة متتالية. لم تتم إعادة تعيين بياناتك المحلية أو الكتابة فوقها.",
  },
  "startup.recoveryHint":
    "أعد المحاولة، أو ثبّت آخر إصدار فُتح. للحصول على المساعدة، صدّر بيانات التشخيص وأرسل الملف مع بلاغك.",
  "startup.recoveryHintLatest":
    "لم يجد PurpleBot إصدارًا سابقًا يستطيع فتح بياناتك. أعد المحاولة، أو ثبّت أحدث إصدار. للحصول على المساعدة، صدّر بيانات التشخيص وأرسل الملف مع بلاغك.",
  "startup.recoveryRetry": "إعادة المحاولة",
  "startup.recoveryPreviousVersion": "تنزيل الإصدار السابق",
  "startup.recoveryLatestVersion": "تنزيل أحدث إصدار",
  "startup.recoveryExportDiagnostics": "تصدير التشخيص",
  "startup.recoveryOpenDataFolder": "فتح مجلد البيانات",
  "startup.recoveryQuit": "إنهاء",
  "startup.recoveryDiagnosticsSaved": "تم حفظ ملف التشخيص.",
  "startup.recoveryActionFailed": "تعذّر على PurpleBot تنفيذ هذا الإجراء.",
} as const satisfies PartialTranslation<typeof source>;
