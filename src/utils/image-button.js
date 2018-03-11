// "Add Image" button functions:
export const imageButtonPosition = (value, parentOffsets, _this) => {
  const { focusBlock } = value
  if (!focusBlock) return
  if (
    focusBlock.type !== "paragraph" &&
    focusBlock.type !== "heading" &&
    focusBlock.type !== "image"
  )
    return
  const cursorContext = {
    firstEmptyLine: value.document.isEmpty && value.document.nodes.size === 1,
    // if user is focusing on image, "Add Image" button should disappear
    newLine: focusBlock.type === "image" ? false : value.focusBlock.isEmpty,
    parentBlockOffsets: parentOffsets
  }
  _this.setState({ cursorContext })
}

export const handleImageButton = (event, _this) => {
  if (!event) return
  event.preventDefault()
  event.stopPropagation()

  const activeBlockKey = _this.state.value.focusBlock.key
  const resolvedState = _this.state.value
    .change({ save: false })
    .insertBlock({
      type: "docket",
      isVoid: true
    })
    .value.change({ save: false })
    .removeNodeByKey(activeBlockKey)

  _this.setState(prevState => ({
    value: resolvedState.value,
    cursorContext: { ...prevState.cursorContext, newLine: false }
  }))

}
