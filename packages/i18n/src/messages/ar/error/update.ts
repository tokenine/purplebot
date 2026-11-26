import type { PartialTranslation } from "../../../message";
import type { messages as source } from "../../en/error/update";

export const messages = {
  "error.update.unsupported": "التحديثات متاحة في إصدارات سطح المكتب المثبّتة.",
  "error.update.notReady": "لا يوجد تحديث جاهز للتثبيت.",
  "error.update.restartFailed": "تعذّر على PurpleBot إعادة التشغيل لتثبيت التحديث.",
  "error.update.downloadStalled": "توقف تنزيل التحديث عن الاستجابة. حاول مرة أخرى.",
  "error.update.installFailed": "تعذّر تثبيت التحديث. أغلق PurpleBot وأعد فتحه، ثم حاول مرة أخرى.",
  "error.update.notInstalled": "لم تُثبِّت إعادة التشغيل الأخيرة التحديث. أعد التشغيل للمحاولة مرة أخرى.",
  "error.update.downloadFailed": "تعذّر تنزيل التحديث. حاول مرة أخرى.",
  "error.update.signatureNotConfirmed":
    "تعذّر على PurpleBot التحقق من التحديث. حاول مرة أخرى. إذا استمر هذا الخطأ، نزّل PurpleBot من openbot.run/download.",
  "error.update.checkFailed": "تعذّر التحقق من وجود تحديثات. حاول مرة أخرى.",
  "error.update.checkStalled": "توقف التحقق من التحديثات عن الاستجابة. حاول مرة أخرى.",
  "error.update.checkOffline": "تعذّر الوصول إلى خدمة التحديث. تحقق من اتصالك بالإنترنت، ثم حاول مرة أخرى.",
  "error.update.checkUnavailable": "لم تستجب خدمة التحديث. سيحاول PurpleBot مرة أخرى تلقائيًا خلال بضع دقائق.",
  "error.update.checkNoRelease":
    "لم يُعثر على تحديث منشور لهذه المنصة. سيحاول PurpleBot مرة أخرى تلقائيًا خلال بضع دقائق.",
  "error.update.managedByNix": "يثبّت Nix التحديثات لهذه النسخة من PurpleBot. حدّثها باستخدام Nix.",
  "error.update.managedByHost": "يثبّت المضيف التحديثات على جهاز Mac هذا. يبقى التحديث جاهزًا حتى تُجرى صيانة المضيف.",
  "error.update.siblingSession":
    "لا تزال جلسة PurpleBot أخرى تعمل من هذا التطبيق. أوقف PurpleBot في كل حسابات مستخدمي macOS الأخرى أولًا، ثم ثبّت التحديث مرة أخرى.",
  "error.update.siblingSessionSameAccount":
    "لا تزال عملية PurpleBot أخرى تعمل في حساب المستخدم هذا. أغلقها، ثم ثبّت التحديث مرة أخرى.",
  "error.update.siblingCheckFailed": "تعذّر التحقق من جلسات PurpleBot الأخرى. حاول مرة أخرى قبل التثبيت.",
  "error.update.readOnlyLocation":
    "لا يمكن لـ PurpleBot تثبيت التحديثات من هذا الموقع. أغلق PurpleBot. في Finder، اسحب PurpleBot إلى مجلد التطبيقات (إذا كان موجودًا هناك بالفعل، فاسحبه خارجه ثم أعده إليه). ثم افتح PurpleBot وثبّت التحديث مرة أخرى.",
  "error.update.appImageMissing":
    "لا يستطيع PurpleBot تثبيت التحديث لأن ملف AppImage الخاص به نُقل أو أُعيدت تسميته أو استُبدل. أغلق PurpleBot، ثم افتح ملف AppImage مرة أخرى.",
  "error.update.appImageReadOnly":
    "لا يستطيع PurpleBot تثبيت التحديثات في مجلد ملف AppImage الخاص به. أغلق PurpleBot، وانقل ملف AppImage إلى مجلد داخل مجلدك الرئيسي، ثم افتحه وثبّت التحديث مرة أخرى.",
  "error.update.remoteDisabled": "التحديثات من مسؤولي الخوادم معطّلة على هذا الحاسوب.",
  "error.update.restartStarted": "يعيد PurpleBot التشغيل بالفعل لتثبيت التحديث.",
  "error.update.alreadyRestarting": "يعيد PurpleBot التشغيل بالفعل.",
} as const satisfies PartialTranslation<typeof source>;
