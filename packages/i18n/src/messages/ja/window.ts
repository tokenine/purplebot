import type { PartialTranslation } from "../../message";
import type { messages as source } from "../en/window";

export const messages = {
  "window.localHostTitle": "PurpleBot ローカルホスト",
  "window.localClientTitle": "PurpleBot ローカルクライアント",
  "window.computerUsePermissionTitle": "Computer Use をオンにする",
  "window.rendererStoppedTitle": "PurpleBot が停止しました",
  "window.rendererStoppedBody":
    "ウィンドウが何度か停止しました。チャットは保存されており、エージェントは動作を続けています。",
  "window.rendererStoppedReload": "再読み込み",
} as const satisfies PartialTranslation<typeof source>;
