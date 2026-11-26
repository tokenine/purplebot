import type { PartialTranslation } from "../../../message";
import type { messages as source } from "../../en/status/messaging";

export const messages = {
  "status.messaging.working": "עובד על זה…",
  "status.messaging.queued": "בהמתנה לסיום בקשה קודמת. התשובה תגיע לכאן.",
  "status.messaging.busy": "יותר מדי בקשות ממתינות. אפשר לנסות שוב מאוחר יותר.",
  "status.messaging.failed": "PurpleBot לא הצליח לסיים את הבקשה הזו. הפרטים נמצאים במארח PurpleBot.",
  "status.messaging.noAnswer": "PurpleBot סיים בלי תשובה כתובה.",
  "status.messaging.noAgent": "עדיין אין סוכן שיכול לענות כאן. יש להוסיף את Slack Orchestrator ב-PurpleBot.",
  "status.messaging.delegated": "חבר צוות עובד על זה. התשובה תגיע לכאן.",
  "status.messaging.stopped": "נעצר.",
  "status.messaging.stop": "עצירה",
  "status.messaging.approvalTitle": "PurpleBot מבקש אישור כדי להמשיך.",
  "status.messaging.approvalTitleTeammate": "חבר הצוות {agent} מבקש אישור כדי להמשיך.",
  "status.messaging.approvalCommand": "הרצת פקודה",
  "status.messaging.approvalFileChange": "שינוי קבצים",
  "status.messaging.approvalPermissions": "קבלת הרשאות נוספות",
  "status.messaging.approve": "אישור",
  "status.messaging.deny": "דחייה",
  "status.messaging.approvedBy": "אושר על ידי {user}.",
  "status.messaging.deniedBy": "נדחה על ידי {user}.",
  "status.messaging.answeredOnHost": "נענה במארח PurpleBot.",
  "status.messaging.requestInactive": "הבקשה הזו כבר אינה פעילה.",
  "status.messaging.onlyRequester": "רק {user} יכול לבצע זאת. אפשר גם לענות במארח PurpleBot.",
  "status.messaging.hostOnly": "רק מארח PurpleBot יכול לענות על הבקשה הזו.",
  "status.messaging.filesSkipped": "חלק מהקבצים לא נשלחו: {names}.",
  "status.messaging.orchestratorName": "Slack Orchestrator",
  "status.messaging.orchestratorTitle": "עונה ב-Slack ושואל את הצוות",
  "status.messaging.discordNoAgent": "עדיין אין סוכן שיכול לענות כאן. יש להוסיף את Discord Orchestrator ב-PurpleBot.",
  "status.messaging.discordOrchestratorName": "Discord Orchestrator",
  "status.messaging.discordOrchestratorTitle": "עונה ב-Discord ושואל את הצוות",
  "status.messaging.integrationsSection": "שילובים",
  "status.messaging.signInReceived": "PurpleBot קיבל את התקנת Slack. אפשר לסגור את הלשונית הזו.",
  "status.messaging.signInUnknown": "PurpleBot לא התחיל את התקנת Slack הזו. יש להתחיל אותה שוב ב-PurpleBot.",
  "status.messaging.telegramNoAgent":
    "עדיין אין סוכן שיכול לענות כאן. ב-PurpleBot, יש לפתוח את חנות > אפליקציות > Telegram וללחוץ על הוספת סוכן.",
  "status.messaging.telegramLinked":
    "PurpleBot מחובר לצ'אט הזה. אפשר לתייג את {bot} או להשיב להודעה של PurpleBot כדי לשאול את הסוכנים.",
  "status.messaging.telegramNotLinked":
    "PurpleBot לא מחובר לצ'אט הזה. כדי לחבר אותו, יש לפתוח את אפליקציית PurpleBot, לעבור אל חנות ← אפליקציות ← Telegram ולבחור „הוספה לקבוצה” או „פתיחת צ'אט ישיר”.",
  "status.messaging.telegramOrchestratorName": "Telegram Orchestrator",
  "status.messaging.telegramOrchestratorTitle": "עונה ב-Telegram ושואל את הצוות",
  "status.messaging.whatsappNoAgent": "עדיין אין סוכן שיכול לענות כאן. יש להוסיף את WhatsApp Orchestrator ב-PurpleBot.",
  "status.messaging.whatsappApprovalMenu": "יש להשיב 1 לאישור או 2 לדחייה.",
  "status.messaging.whatsappStopMenu": "יש להשיב stop כדי לעצור.",
  "status.messaging.whatsappPairingCode":
    "המספר הזה עונה רק לאנשים שהבעלים שלו אישר. יש לתת לבעלים את הקוד הזה: {code}",
  "status.messaging.whatsappPairingApproved": "אפשר לשלוח עכשיו בקשות למספר הזה.",
  "status.messaging.whatsappOwnChat": "הודעה לעצמך",
  "status.messaging.whatsappWelcomeOwn":
    "👋 *PurpleBot מחובר*\n\nאפשר לכתוב כאן כדי לשאול את הסוכנים. WhatsApp Orchestrator עונה, או מעביר את העבודה לסוכן המתאים.\n\nיש לשלוח *stop* כדי לעצור בקשה.",
  "status.messaging.whatsappWelcomeDedicated":
    "👋 *PurpleBot מחובר*\n\nהאנשים שאישרת ב-PurpleBot יכולים עכשיו לכתוב למספר הזה. אדם חדש מקבל קוד: יש לאשר אותו ב-PurpleBot תחת בקשות.\n\nיש לשלוח *stop* כדי לעצור בקשה.",
  "status.messaging.whatsappOtherOpenBot":
    "PurpleBot נוסף מקושר למספר הוואטסאפ הזה, ולכן ייתכן שיתקבלו שתי תשובות. כדי לתקן זאת, יש לפתוח את 'מכשירים מקושרים' בוואטסאפ בטלפון ולהתנתק מה-PurpleBot שאינו בשימוש.",
  "status.messaging.whatsappPaused":
    "PurpleBot הפסיק לענות כאן למשך 10 דקות: הגיעו יותר מדי הודעות בזמן קצר. אם PurpleBot נוסף מקושר למספר הזה, יש לפתוח את 'מכשירים מקושרים' בוואטסאפ בטלפון ולהתנתק מה-PurpleBot שאינו בשימוש.",
  "status.messaging.whatsappNotDelivered": "וואטסאפ לא קיבל את התשובה הזו, ולכן האדם לא קיבל אותה.",
  "status.messaging.whatsappPartlyDelivered": "וואטסאפ לא קיבל את כל התשובה הזו, ולכן האדם קיבל רק חלק ממנה.",
  "status.messaging.whatsappOrchestratorName": "WhatsApp Orchestrator",
  "status.messaging.whatsappOrchestratorTitle": "עונה ב-WhatsApp ושואל את הצוות",
} as const satisfies PartialTranslation<typeof source>;
