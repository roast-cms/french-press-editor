//
// A plugin function that can add a link to a Slate text string.
//
// tools
import keycode from "keycode"
import { addLink } from "../utils"
//
export function LinkHotkey(options) {
  const { key } = options
  //
  // Return our "plugin" object, containing the `onKeyDown` handler.
  return {
    onKeyDown(event, change) {
      const { value } = change
      //
      // links are only allowed in paragraphs
      if (value.focusBlock.type !== "paragraph") return
      //
      // Check that the key pressed matches our `code` option.
      if (!event.metaKey || keycode(event.which) !== key) return
      //
      // Prevent the default characters from being inserted.
      event.preventDefault()
      //
      // add link to text
      const hasLinks = value.inlines.some(inline => inline.type === "link")
      if (hasLinks) {
        change.unwrapInline("link")
        return
      }
      const link = addLink(value, "data")
      if (!link.href) change.unwrapInline("link")
      else
        change.wrapInline({
          type: "link",
          data: link
        })
    }
  }
}
