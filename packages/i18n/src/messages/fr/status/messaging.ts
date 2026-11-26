import type { PartialTranslation } from "../../../message";
import type { messages as source } from "../../en/status/messaging";

export const messages = {
  "status.messaging.working": "En cours…",
  "status.messaging.queued": "En attente de la fin d’une demande précédente. La réponse arrivera ici.",
  "status.messaging.busy": "Trop de demandes sont en attente. Réessayez plus tard.",
  "status.messaging.failed": "PurpleBot n’a pas pu terminer cette demande. L’hôte PurpleBot dispose des détails.",
  "status.messaging.noAnswer": "PurpleBot a terminé sans réponse écrite.",
  "status.messaging.noAgent": "Aucun agent ne peut encore répondre ici. Ajoutez l’Orchestrateur Slack dans PurpleBot.",
  "status.messaging.delegated": "Un coéquipier s’en occupe. La réponse arrivera ici.",
  "status.messaging.stopped": "Arrêté.",
  "status.messaging.stop": "Arrêter",
  "status.messaging.approvalTitle": "PurpleBot demande une approbation pour continuer.",
  "status.messaging.approvalTitleTeammate": "Le coéquipier {agent} demande une approbation pour continuer.",
  "status.messaging.approvalCommand": "Exécuter une commande",
  "status.messaging.approvalFileChange": "Modifier des fichiers",
  "status.messaging.approvalPermissions": "Obtenir plus d’autorisations",
  "status.messaging.approve": "Approuver",
  "status.messaging.deny": "Refuser",
  "status.messaging.approvedBy": "Approuvé par {user}.",
  "status.messaging.deniedBy": "Refusé par {user}.",
  "status.messaging.answeredOnHost": "Réponse donnée sur l’hôte PurpleBot.",
  "status.messaging.requestInactive": "Cette demande n’est plus active.",
  "status.messaging.onlyRequester": "Seul {user} peut faire cela. L’hôte PurpleBot peut aussi répondre.",
  "status.messaging.hostOnly": "Seul l’hôte PurpleBot peut répondre à cette demande.",
  "status.messaging.filesSkipped": "Certains fichiers n’ont pas été envoyés : {names}.",
  "status.messaging.orchestratorName": "Orchestrateur Slack",
  "status.messaging.orchestratorTitle": "Répond dans Slack et consulte l’équipe",
  "status.messaging.discordNoAgent":
    "Aucun agent ne peut encore répondre ici. Ajoutez l’Orchestrateur Discord dans PurpleBot.",
  "status.messaging.discordOrchestratorName": "Orchestrateur Discord",
  "status.messaging.discordOrchestratorTitle": "Répond dans Discord et consulte l’équipe",
  "status.messaging.integrationsSection": "Intégrations",
  "status.messaging.signInReceived": "PurpleBot a reçu l’installation Slack. Vous pouvez fermer cet onglet.",
  "status.messaging.signInUnknown": "PurpleBot n’a pas lancé cette installation Slack. Relancez-la dans PurpleBot.",
  "status.messaging.telegramNoAgent":
    "Aucun agent ne peut encore répondre ici. Dans PurpleBot, ouvrez Marketplace > Apps > Telegram et cliquez sur Ajouter un agent.",
  "status.messaging.telegramLinked":
    "PurpleBot est connecté à cette discussion. Mentionnez {bot} ou répondez à un message d’PurpleBot pour solliciter les agents.",
  "status.messaging.telegramNotLinked":
    "PurpleBot n’est pas connecté à cette discussion. Pour le connecter, ouvrez l’app PurpleBot, allez dans Marketplace → Apps → Telegram et sélectionnez « Ajouter à un groupe » ou « Discuter en privé ».",
  "status.messaging.telegramOrchestratorName": "Orchestrateur Telegram",
  "status.messaging.telegramOrchestratorTitle": "Répond dans Telegram et consulte l’équipe",
  "status.messaging.whatsappNoAgent":
    "Aucun agent ne peut encore répondre ici. Ajoutez l’Orchestrateur WhatsApp dans PurpleBot.",
  "status.messaging.whatsappApprovalMenu": "Répondez 1 pour approuver ou 2 pour refuser.",
  "status.messaging.whatsappStopMenu": "Répondez « stop » pour arrêter.",
  "status.messaging.whatsappPairingCode":
    "Ce numéro répond uniquement aux personnes autorisées par son propriétaire. Donnez ce code au propriétaire : {code}",
  "status.messaging.whatsappPairingApproved": "Vous pouvez maintenant envoyer des demandes à ce numéro.",
  "status.messaging.whatsappOwnChat": "Message à vous-même",
  "status.messaging.whatsappWelcomeOwn":
    "👋 *PurpleBot est connecté*\n\nÉcrivez ici pour poser vos questions à vos agents. Le WhatsApp Orchestrator répond, ou confie le travail au bon agent.\n\nEnvoyez *stop* pour arrêter une demande.",
  "status.messaging.whatsappWelcomeDedicated":
    "👋 *PurpleBot est connecté*\n\nLes personnes que vous autorisez dans PurpleBot peuvent maintenant écrire à ce numéro. Une nouvelle personne reçoit un code : approuvez-le dans PurpleBot, sous Demandes.\n\nEnvoyez *stop* pour arrêter une demande.",
  "status.messaging.whatsappOtherOpenBot":
    "Un autre PurpleBot est associé à ce numéro WhatsApp, vous pouvez donc recevoir deux réponses. Pour corriger cela, ouvrez Appareils connectés dans WhatsApp sur votre téléphone et déconnectez l’PurpleBot que vous n’utilisez pas.",
  "status.messaging.whatsappPaused":
    "PurpleBot ne répond plus ici pendant 10 minutes : trop de messages sont arrivés en peu de temps. Si un autre PurpleBot est associé à ce numéro, ouvrez Appareils connectés dans WhatsApp sur votre téléphone et déconnectez l’PurpleBot que vous n’utilisez pas.",
  "status.messaging.whatsappNotDelivered": "WhatsApp n’a pas accepté cette réponse, la personne ne l’a donc pas reçue.",
  "status.messaging.whatsappPartlyDelivered":
    "WhatsApp n’a pas accepté toute cette réponse, la personne n’en a donc reçu qu’une partie.",
  "status.messaging.whatsappOrchestratorName": "Orchestrateur WhatsApp",
  "status.messaging.whatsappOrchestratorTitle": "Répond dans WhatsApp et consulte l’équipe",
} as const satisfies PartialTranslation<typeof source>;
