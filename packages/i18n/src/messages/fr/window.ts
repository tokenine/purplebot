import type { PartialTranslation } from "../../message";
import type { messages as source } from "../en/window";

export const messages = {
  "window.localHostTitle": "PurpleBot – Hôte local",
  "window.localClientTitle": "PurpleBot – Client local",
  "window.computerUsePermissionTitle": "Activer Computer Use",
  "window.rendererStoppedTitle": "PurpleBot ne fonctionne plus",
  "window.rendererStoppedBody":
    "La fenêtre s’est arrêtée plusieurs fois. Vos discussions sont enregistrées et vos agents continuent de travailler.",
  "window.rendererStoppedReload": "Recharger",
} as const satisfies PartialTranslation<typeof source>;
