import {getEventTransfer} from "slate-react"

/**
 * MarkHotkey - A plugin that preserves allowed HTML structure when user pastes HTML content, and converts the rest into either plain text.
 *
 * @param  {Object} options
 * @return {Event}  Change Transformation for Slate.
 */
export const Paste = options => {
  const {html} = options
  return {
    onPaste(event, change) {
      const transfer = getEventTransfer(event)
      if (transfer.type !== "html") return
      const {document} = html.deserialize(transfer.html)
      change.insertFragment(document)
      return true
    },
  }
}
