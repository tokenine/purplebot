import type { PartialTranslation } from "../../message";
import type { messages as source } from "../en/menu";

export const messages = {
  "menu.stopAllAgents": "Ferma tutti gli agenti",
  "menu.checkForUpdates": "Verifica aggiornamenti…",
  "menu.preferences": "Impostazioni…",
  "menu.actualSize": "Dimensioni effettive",
  "menu.zoomIn": "Ingrandisci",
  "menu.zoomOut": "Riduci",
  "menu.closeDeveloperTools": "Chiudi Strumenti per sviluppatori",
  "menu.copyLink": "Copia link",
  "menu.copyImage": "Copia immagine",
  "menu.quit": "Esci da PurpleBot",
  "menu.quitConfirmTitle": "Uscire da PurpleBot?",
  "menu.quitConfirmBody": "Agenti e routine si fermano finché non riapri PurpleBot.",
  "menu.quitConfirm": "Esci",
  "menu.quitHint": "Tieni premuto ⌘Q o premilo due volte per uscire",
  "menu.closeWorkingTitle": {
    one: "{count} agente sta ancora lavorando",
    other: "{count} agenti stanno ancora lavorando",
  },
  "menu.closeWorkingBody":
    "Se esci da PurpleBot, gli agenti si fermano. Lascialo in esecuzione per farli finire. Per mostrare di nuovo la finestra, apri PurpleBot.",
  "menu.closeKeepRunning": "Continua",
  "menu.trayOpen": "Apri PurpleBot",
  "menu.trayQuit": "Esci da PurpleBot",
  "menu.trayTooltip": "PurpleBot",
  "menu.hideDynamicIsland": "Nascondi Dynamic Island",
  "menu.undo": "Annulla",
  "menu.redo": "Ripeti",
  "menu.cut": "Taglia",
  "menu.copy": "Copia",
  "menu.paste": "Incolla",
  "menu.pasteAndMatchStyle": "Incolla e adatta stile",
  "menu.delete": "Elimina",
  "menu.selectAll": "Seleziona tutto",
} as const satisfies PartialTranslation<typeof source>;
