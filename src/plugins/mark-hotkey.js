//
// A plugin function that turns Slate plain text into formatted text with
// bold or italic styles.
//
// tools
import keycode from "keycode"
//
export function MarkHotkey(options) {
  const { type, key } = options
  //
  // return our "plugin" object, containing the `onKeyDown` handler.
  return {
    onKeyDown(event, change) {
      //
      // marks are only allowed in paragraphs
      if (change.value.focusBlock.type !== "paragraph") return
      //
      // check that the key pressed matches our `code` option.
      if (!event.metaKey || keycode(event.which) !== key) return
      //
      // prevent the default characters from being inserted.
      event.preventDefault()
      //
      // toggle the mark `type`.
      change.toggleMark(type)
      return true
    }
  }
}
