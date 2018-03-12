//
// An array of plugins that creates links, bold text, and italics when user
// executes ⌘+k/b/i.
//
// plugins
import { LinkHotkey } from "../link-hotkey"
import { MarkHotkey } from "../mark-hotkey"
//
export const hotkeys = [
  LinkHotkey({ key: "k" }),
  MarkHotkey({ key: "b", type: "bold" }),
  MarkHotkey({ key: "i", type: "italic" })
]
