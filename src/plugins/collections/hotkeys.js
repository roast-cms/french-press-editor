import { LinkHotkey } from "../link-hotkey"
import { MarkHotkey } from "../mark-hotkey"

export const hotkeys = [
  LinkHotkey({ key: "k" }),
  MarkHotkey({ key: "b", type: "bold" }),
  MarkHotkey({ key: "i", type: "italic" })
]
