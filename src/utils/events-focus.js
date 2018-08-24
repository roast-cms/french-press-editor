/**
 * A collection of functions that call appropriate functions in response to user interactions.
 * @module focusEvents
 */
export const focusEvents = function(){
  /**
   * Highlights potential drop target when the draggable element enters it.
   * @function addEventListener
   * @return {Event}
   */
  document.addEventListener(
    "dragover",
    event => {
      event.preventDefault()
      if (this.state.dragOver) return
      const delayDragEvent = setTimeout(() => {
        this.handleDragOver()
        clearTimeout(delayDragEvent)
      }, 100)
    },
    false
  )
  document.addEventListener(
    "drop",
    event => {
      if (!this.state.dragOver) return
      const delayDragEvent = setTimeout(() => {
        this.handleDragEnd()
        clearTimeout(delayDragEvent)
      }, 100)
    },
    false
  )

  /**
   * Blurs editor on Esc (remove highlights and guides for preview).
   * @function addEventListener
   * @return {Event}
   */
  document.addEventListener(
    "keydown",
    event => {
      if (event.keyCode === 27 && this.slateEditor) {
        this.slateEditor.blur()
      }
    },
    false
  )
}
