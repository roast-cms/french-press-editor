// tools
import keycode from "keycode"

// return
// *first plugin* (hotkeys)
export function MarkHotkey(options) {
  const { type, key } = options

  // Return our "plugin" object, containing the `onKeyDown` handler.
  return {
    onKeyDown(event, change) {
      // marks are only allowed in paragraphs
      if (change.value.focusBlock.type !== "paragraph") return

      // Check that the key pressed matches our `code` option.
      if (!event.metaKey || keycode(event.which) !== key) return

      // Prevent the default characters from being inserted.
      event.preventDefault()

      // Toggle the mark `type`.
      change.toggleMark(type)
      return true
    }
  }
}
