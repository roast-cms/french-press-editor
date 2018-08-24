import keycode from "keycode"

import { addLink } from "../utils"

/**
 * LinkHotkey - A plugin function that can add a link to a Slate text string.
 *
 * @param  {Object} options
 * @return {Event}  Change Transformation for Slate.
 */
export function LinkHotkey(options) {
  const { key } = options
  return {
    onKeyDown(event, change) {
      const { value } = change
      if (value.focusBlock.type !== "paragraph") return
      if (!event.metaKey || keycode(event.which) !== key) return
      event.preventDefault()
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
