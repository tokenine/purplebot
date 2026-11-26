import type { PartialTranslation } from "../../../message";
import type { messages as source } from "../../en/error/update";

export const messages = {
  "error.update.unsupported": "As atualizações estão disponíveis nas versões instaladas para computador.",
  "error.update.notReady": "Nenhuma atualização está pronta para instalar.",
  "error.update.restartFailed": "O PurpleBot não conseguiu reiniciar para instalar a atualização.",
  "error.update.downloadStalled": "O download da atualização parou de responder. Tente novamente.",
  "error.update.installFailed":
    "Não foi possível instalar a atualização. Encerre e abra o PurpleBot novamente, depois tente outra vez.",
  "error.update.notInstalled": "A última reinicialização não instalou a atualização. Reinicie para tentar outra vez.",
  "error.update.downloadFailed": "Não foi possível baixar a atualização. Tente novamente.",
  "error.update.signatureNotConfirmed":
    "O PurpleBot não conseguiu verificar a atualização. Tente novamente. Se o erro continuar, baixe o PurpleBot em openbot.run/download.",
  "error.update.checkFailed": "Não foi possível verificar se há atualizações. Tente novamente.",
  "error.update.checkStalled": "A verificação de atualizações parou de responder. Tente novamente.",
  "error.update.checkOffline":
    "Não foi possível acessar o serviço de atualizações. Verifique sua conexão com a internet e tente novamente.",
  "error.update.checkUnavailable":
    "O serviço de atualizações não respondeu. O PurpleBot tentará novamente automaticamente em alguns minutos.",
  "error.update.checkNoRelease":
    "Nenhuma atualização publicada foi encontrada para esta plataforma. O PurpleBot tentará novamente automaticamente em alguns minutos.",
  "error.update.managedByNix": "O Nix instala as atualizações desta cópia do PurpleBot. Atualize-a com o Nix.",
  "error.update.managedByHost":
    "As atualizações neste Mac são instaladas pelo computador anfitrião. A atualização permanece pronta para instalação até a manutenção do computador anfitrião ser executada.",
  "error.update.siblingSession":
    "Outra sessão do PurpleBot ainda está em execução neste aplicativo. Encerre o PurpleBot em todas as outras contas de usuário do macOS e instale a atualização novamente.",
  "error.update.siblingSessionSameAccount":
    "Outro processo do PurpleBot ainda está rodando nesta conta de usuário. Feche-o e instale a atualização de novo.",
  "error.update.siblingCheckFailed":
    "Não foi possível verificar outras sessões do PurpleBot. Tente novamente antes de instalar.",
  "error.update.readOnlyLocation":
    "O PurpleBot não consegue instalar atualizações deste local. Encerre o PurpleBot. No Finder, arraste o PurpleBot para a pasta Aplicativos (se ele já estiver lá, arraste-o para fora e de volta). Depois, abra o PurpleBot e instale a atualização novamente.",
  "error.update.appImageMissing":
    "O PurpleBot não pode instalar a atualização porque o arquivo AppImage dele foi movido, renomeado ou substituído. Feche o PurpleBot e abra o arquivo AppImage novamente.",
  "error.update.appImageReadOnly":
    "O PurpleBot não pode instalar atualizações na pasta do arquivo AppImage dele. Feche o PurpleBot, mova o arquivo AppImage para uma pasta dentro da sua pasta pessoal, abra-o e instale a atualização novamente.",
  "error.update.remoteDisabled":
    "As atualizações feitas por administradores do servidor estão desativadas neste computador.",
  "error.update.restartStarted": "O PurpleBot já está reiniciando para instalar a atualização.",
  "error.update.alreadyRestarting": "O PurpleBot já está reiniciando.",
} as const satisfies PartialTranslation<typeof source>;
