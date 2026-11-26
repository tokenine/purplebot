import type { PartialTranslation } from "../../../message";
import type { messages as source } from "../../en/status/host";

export const messages = {
  "status.host.registered": "Cet PurpleBot est enregistré pour l’accès WebRTC.",
  "status.host.keyRotated": "Clé du serveur changée. Les appareils associés restent associés.",
  "status.host.identityUpdated": "Identité du serveur mise à jour.",
  "status.host.starting": "Démarrage de l’hôte WebRTC…",
  "status.host.ready": "Cet PurpleBot est prêt pour les connexions WebRTC.",
  "status.host.signalLost":
    "Les autres appareils ne peuvent pas joindre cet PurpleBot pour le moment. Il se reconnecte.",
  "status.host.stopping": "Passage de cet PurpleBot en mode privé…",
  "status.host.private": "Cet PurpleBot est privé.",
  "status.host.removed": "Cet PurpleBot a été retiré de votre compte. Publiez-le à nouveau pour le partager.",
} as const satisfies PartialTranslation<typeof source>;
