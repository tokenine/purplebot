import type { PartialTranslation } from "../../../message";
import type { messages as source } from "../../en/status/messaging";

export const messages = {
  "status.messaging.working": "Trabajando en ello…",
  "status.messaging.queued": "En espera hasta que termine una solicitud anterior. La respuesta llegará aquí.",
  "status.messaging.busy": "Hay demasiadas solicitudes en espera. Inténtalo más tarde.",
  "status.messaging.failed": "PurpleBot no pudo completar esta solicitud. El host de PurpleBot tiene los detalles.",
  "status.messaging.noAnswer": "PurpleBot terminó sin una respuesta escrita.",
  "status.messaging.noAgent": "Aún no puede responder ningún agente aquí. Añade el Orquestador de Slack en PurpleBot.",
  "status.messaging.delegated": "Un compañero está trabajando en ello. La respuesta llegará aquí.",
  "status.messaging.stopped": "Detenido.",
  "status.messaging.stop": "Detener",
  "status.messaging.approvalTitle": "PurpleBot pide aprobación para continuar.",
  "status.messaging.approvalTitleTeammate": "El compañero {agent} pide aprobación para continuar.",
  "status.messaging.approvalCommand": "Ejecutar un comando",
  "status.messaging.approvalFileChange": "Cambiar archivos",
  "status.messaging.approvalPermissions": "Obtener más permisos",
  "status.messaging.approve": "Aprobar",
  "status.messaging.deny": "Rechazar",
  "status.messaging.approvedBy": "Aprobado por {user}.",
  "status.messaging.deniedBy": "Rechazado por {user}.",
  "status.messaging.answeredOnHost": "Respondido en el host de PurpleBot.",
  "status.messaging.requestInactive": "Esta solicitud ya no está activa.",
  "status.messaging.onlyRequester": "Solo {user} puede hacerlo. El host de PurpleBot también puede responder.",
  "status.messaging.hostOnly": "Solo el host de PurpleBot puede responder a esta solicitud.",
  "status.messaging.filesSkipped": "Algunos archivos no se enviaron: {names}.",
  "status.messaging.orchestratorName": "Orquestador de Slack",
  "status.messaging.orchestratorTitle": "Responde en Slack y consulta al equipo",
  "status.messaging.discordNoAgent":
    "Aún no puede responder ningún agente aquí. Añade el Orquestador de Discord en PurpleBot.",
  "status.messaging.discordOrchestratorName": "Orquestador de Discord",
  "status.messaging.discordOrchestratorTitle": "Responde en Discord y consulta al equipo",
  "status.messaging.integrationsSection": "Integraciones",
  "status.messaging.signInReceived": "PurpleBot recibió la instalación de Slack. Puedes cerrar esta pestaña.",
  "status.messaging.signInUnknown": "PurpleBot no inició esta instalación de Slack. Iníciala de nuevo en PurpleBot.",
  "status.messaging.telegramNoAgent":
    "Aún no hay ningún agente que pueda responder aquí. En PurpleBot, abre Marketplace > Apps > Telegram y haz clic en Añadir agente.",
  "status.messaging.telegramLinked":
    "PurpleBot está conectado a este chat. Menciona a {bot} o responde a un mensaje de PurpleBot para consultar a los agentes.",
  "status.messaging.telegramNotLinked":
    "PurpleBot no está conectado a este chat. Para conectarlo, abre la app de PurpleBot, ve a Marketplace → Apps → Telegram y selecciona «Añadir a un grupo» o «Abrir un chat directo».",
  "status.messaging.telegramOrchestratorName": "Orquestador de Telegram",
  "status.messaging.telegramOrchestratorTitle": "Responde en Telegram y consulta al equipo",
  "status.messaging.whatsappNoAgent":
    "Aún no hay ningún agente que pueda responder aquí. Añade el Orquestador de WhatsApp en PurpleBot.",
  "status.messaging.whatsappApprovalMenu": "Responde 1 para aprobar o 2 para rechazar.",
  "status.messaging.whatsappStopMenu": "Responde «stop» para detener.",
  "status.messaging.whatsappPairingCode":
    "Este número solo responde a las personas que su propietario permitió. Dale este código al propietario: {code}",
  "status.messaging.whatsappPairingApproved": "Ya puedes enviar solicitudes a este número.",
  "status.messaging.whatsappOwnChat": "Envíate un mensaje",
  "status.messaging.whatsappWelcomeOwn":
    "👋 *PurpleBot está conectado*\n\nEscribe aquí para preguntar a tus agentes. El WhatsApp Orchestrator responde o pasa el trabajo al agente adecuado.\n\nEnvía *stop* para detener una solicitud.",
  "status.messaging.whatsappWelcomeDedicated":
    "👋 *PurpleBot está conectado*\n\nLas personas que permitas en PurpleBot ya pueden escribir a este número. Una persona nueva recibe un código: apruébalo en PurpleBot, en Solicitudes.\n\nEnvía *stop* para detener una solicitud.",
  "status.messaging.whatsappOtherOpenBot":
    "Otro PurpleBot está vinculado a este número de WhatsApp, así que puedes recibir dos respuestas. Para solucionarlo, abre Dispositivos vinculados en WhatsApp en tu teléfono y cierra la sesión del PurpleBot que no usas.",
  "status.messaging.whatsappPaused":
    "PurpleBot dejó de responder aquí durante 10 minutos: llegaron demasiados mensajes en poco tiempo. Si otro PurpleBot está vinculado a este número, abre Dispositivos vinculados en WhatsApp en tu teléfono y cierra la sesión del PurpleBot que no usas.",
  "status.messaging.whatsappNotDelivered": "WhatsApp no aceptó esta respuesta, así que la persona no la recibió.",
  "status.messaging.whatsappPartlyDelivered":
    "WhatsApp no aceptó toda esta respuesta, así que la persona solo recibió una parte.",
  "status.messaging.whatsappOrchestratorName": "Orquestador de WhatsApp",
  "status.messaging.whatsappOrchestratorTitle": "Responde en WhatsApp y consulta al equipo",
} as const satisfies PartialTranslation<typeof source>;
