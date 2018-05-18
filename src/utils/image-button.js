//
// Figures out the image button location and appearance, depending on user's
// carriage position within the editor and calls appropriate functions when
// the user clicks that button.
//
// position
export const imageButtonPosition = (value, parentOffsets, _this) => {
  const { focusBlock } = value
  const hideImageButton = () =>
    _this.setState({
      cursorContext: { ..._this.state.cursorContext, newLine: false }
    })
  if (!focusBlock) return
  if (
    focusBlock.type !== "paragraph" &&
    focusBlock.type !== "heading" &&
    focusBlock.type !== "image"
  ) {
    hideImageButton()
    return
  }
  if (
    window.getSelection().rangeCount !== 0 &&
    window.getSelection().getRangeAt(0).collapsed === false
  ) {
    hideImageButton()
    return
  }
  const cursorContext = {
    firstEmptyLine: value.document.isEmpty && value.document.nodes.size === 1,
    // if user is focusing on image, "Add Image" button should disappear
    newLine: focusBlock.type === "image" ? false : value.focusBlock.isEmpty,
    parentBlockOffsets: parentOffsets
  }
  _this.setState({ cursorContext })
}
//
// click action
export const handleImageButton = (event, _this) => {
  if (!event) return
  event.preventDefault()
  event.stopPropagation()
  //
  // timeout allows to paint the image button downstate
  // before bringing up file upload dialogue or a docket component
  const responseDelay = setTimeout(() => {
    clearTimeout(responseDelay)
    //
    // if PictureDocket component isn't defined, bring up the dialogue
    // to upload image file
    if (!_this.props.components.PictureDocket) {
      _this.fileInput.click()
      return
    }
    //
    // insert docket block into editor if the PictureDocket
    // component is defiend
    const activeBlockKey = _this.state.value.focusBlock.key
    const resolvedState = _this.state.value
      .change({ save: false })
      .insertBlock({
        type: "docket",
        isVoid: true
      })
      .value.change({ save: false })
      .removeNodeByKey(activeBlockKey)
    //
    // hide "Insert Image" button when docket is shown
    _this.setState(prevState => ({
      value: resolvedState.value,
      cursorContext: { ...prevState.cursorContext, newLine: false }
    }))
  }, 50)
}
