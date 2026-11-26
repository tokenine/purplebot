import type { PartialTranslation } from "../../../message";
import type { messages as source } from "../../en/status/messaging";

export const messages = {
  "status.messaging.working": "Уже работаю…",
  "status.messaging.queued": "Ожидание: предыдущий запрос ещё выполняется. Ответ придёт сюда.",
  "status.messaging.busy": "В очереди слишком много запросов. Повторите попытку позже.",
  "status.messaging.failed": "PurpleBot не смог завершить этот запрос. Подробности — на хосте PurpleBot.",
  "status.messaging.noAnswer": "PurpleBot завершил работу без письменного ответа.",
  "status.messaging.noAgent":
    "Пока нет агента, который мог бы здесь ответить. Добавьте Оркестратора Slack в PurpleBot.",
  "status.messaging.delegated": "Над этим работает один из агентов. Ответ придёт сюда.",
  "status.messaging.stopped": "Остановлено.",
  "status.messaging.stop": "Остановить",
  "status.messaging.approvalTitle": "PurpleBot просит подтверждения, чтобы продолжить.",
  "status.messaging.approvalTitleTeammate": "Агент {agent} просит подтверждения, чтобы продолжить.",
  "status.messaging.approvalCommand": "Выполнить команду",
  "status.messaging.approvalFileChange": "Изменить файлы",
  "status.messaging.approvalPermissions": "Получить дополнительные разрешения",
  "status.messaging.approve": "Одобрить",
  "status.messaging.deny": "Отклонить",
  "status.messaging.approvedBy": "Одобрено: {user}.",
  "status.messaging.deniedBy": "Отклонено: {user}.",
  "status.messaging.answeredOnHost": "Отвечено на хосте PurpleBot.",
  "status.messaging.requestInactive": "Этот запрос больше не активен.",
  "status.messaging.onlyRequester": "Это может сделать только {user}. Ответить также может хост PurpleBot.",
  "status.messaging.hostOnly": "На этот запрос может ответить только хост PurpleBot.",
  "status.messaging.filesSkipped": "Некоторые файлы не отправлены: {names}.",
  "status.messaging.orchestratorName": "Оркестратор Slack",
  "status.messaging.orchestratorTitle": "Отвечает в Slack и обращается к команде",
  "status.messaging.discordNoAgent":
    "Пока нет агента, который мог бы здесь ответить. Добавьте Оркестратора Discord в PurpleBot.",
  "status.messaging.discordOrchestratorName": "Оркестратор Discord",
  "status.messaging.discordOrchestratorTitle": "Отвечает в Discord и обращается к команде",
  "status.messaging.integrationsSection": "Интеграции",
  "status.messaging.signInReceived": "PurpleBot получил установку Slack. Эту вкладку можно закрыть.",
  "status.messaging.signInUnknown": "PurpleBot не начинал эту установку Slack. Начните её заново в PurpleBot.",
  "status.messaging.telegramNoAgent":
    "Пока нет агента, который мог бы здесь ответить. В PurpleBot откройте Маркетплейс > Приложения > Telegram и нажмите «Добавить агента».",
  "status.messaging.telegramLinked":
    "PurpleBot подключён к этому чату. Упомяните {bot} или ответьте на сообщение PurpleBot, чтобы обратиться к агентам.",
  "status.messaging.telegramNotLinked":
    "PurpleBot не подключён к этому чату. Чтобы подключить его, откройте приложение PurpleBot, перейдите в Каталог → Приложения → Telegram и выберите «Добавить в группу» или «Открыть личный чат».",
  "status.messaging.telegramOrchestratorName": "Оркестратор Telegram",
  "status.messaging.telegramOrchestratorTitle": "Отвечает в Telegram и обращается к команде",
  "status.messaging.whatsappNoAgent":
    "Пока нет агента, который мог бы здесь ответить. Добавьте Оркестратора WhatsApp в PurpleBot.",
  "status.messaging.whatsappApprovalMenu": "Ответьте 1, чтобы одобрить, или 2, чтобы отклонить.",
  "status.messaging.whatsappStopMenu": "Ответьте «stop», чтобы остановить.",
  "status.messaging.whatsappPairingCode":
    "Этот номер отвечает только людям, которым разрешил владелец. Передайте владельцу этот код: {code}",
  "status.messaging.whatsappPairingApproved": "Теперь вы можете отправлять запросы на этот номер.",
  "status.messaging.whatsappOwnChat": "Сообщение себе",
  "status.messaging.whatsappWelcomeOwn":
    "👋 *PurpleBot подключён*\n\nПишите сюда, чтобы обратиться к своим агентам. WhatsApp Orchestrator отвечает сам или передаёт работу нужному агенту.\n\nОтправьте *stop*, чтобы остановить запрос.",
  "status.messaging.whatsappWelcomeDedicated":
    "👋 *PurpleBot подключён*\n\nЛюди, которым вы разрешите в PurpleBot, теперь могут писать на этот номер. Новый человек получит код: одобрите его в PurpleBot в разделе «Запросы».\n\nОтправьте *stop*, чтобы остановить запрос.",
  "status.messaging.whatsappOtherOpenBot":
    "К этому номеру WhatsApp привязан ещё один PurpleBot, поэтому вы можете получать два ответа. Чтобы это исправить, откройте «Связанные устройства» в WhatsApp на телефоне и выйдите из PurpleBot, которым вы не пользуетесь.",
  "status.messaging.whatsappPaused":
    "PurpleBot перестал отвечать здесь на 10 минут: за короткое время пришло слишком много сообщений. Если к этому номеру привязан ещё один PurpleBot, откройте «Связанные устройства» в WhatsApp на телефоне и выйдите из PurpleBot, которым вы не пользуетесь.",
  "status.messaging.whatsappNotDelivered": "WhatsApp не принял этот ответ, поэтому человек его не получил.",
  "status.messaging.whatsappPartlyDelivered":
    "WhatsApp принял этот ответ не полностью, поэтому человек получил только его часть.",
  "status.messaging.whatsappOrchestratorName": "Оркестратор WhatsApp",
  "status.messaging.whatsappOrchestratorTitle": "Отвечает в WhatsApp и обращается к команде",
} as const satisfies PartialTranslation<typeof source>;
