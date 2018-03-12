//
// a collection of functions that call appropriate functions in response to
// user interactions.
//
export const focusEvents = _this => {
  //
  // highlight potential drop target when the draggable element enters it
  document.addEventListener(
    "dragover",
    event => {
      event.preventDefault()
      if (_this.state.dragOver) return
      const delayDragEvent = setTimeout(() => {
        _this.handleDragOver()
        clearTimeout(delayDragEvent)
      }, 100)
    },
    false
  )
  document.addEventListener(
    "drop",
    event => {
      if (!_this.state.dragOver) return
      const delayDragEvent = setTimeout(() => {
        _this.handleDragEnd()
        clearTimeout(delayDragEvent)
      }, 100)
    },
    false
  )
  //
  // blur editor on Esc (remove highlights and guides for preview)
  document.addEventListener(
    "keydown",
    event => {
      if (event.keyCode === 27 && _this.slateEditor) {
        _this.slateEditor.blur()
      }
    },
    false
  )
}
