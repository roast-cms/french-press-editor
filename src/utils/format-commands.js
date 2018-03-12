//
// transform inline to add link
export const addLink = (value, returnType = "value") => {
  const href = window.prompt("Enter the URL for the link:")

  if (returnType === "value") {
    if (!href) return value.change().unwrapInline("link")
    return value.change().wrapInline({
      type: "link",
      data: { href }
    })
  } else if (returnType === "data") return { href }
}
//
// format commands for inline transformations
export const formatCommand = (type, _this) => {
  const { value } = _this.state
  let resolvedState
  //
  switch (type) {
    case "undo_heading":
      resolvedState = value.change().setBlocks({ type: "paragraph" })
      _this.setState({
        value: resolvedState.value
      })
      break
    case "make_heading":
      resolvedState = value
        .change()
        .unwrapInline("link")
        .value.change()
        .removeMark("bold")
        .value.change()
        .removeMark("italic")
        .value.change()
        .setBlocks({ type: "heading" })
      _this.setState({
        value: resolvedState.value
      })
      break
    case "make_quote":
      resolvedState = value
        .change()
        .unwrapInline("link")
        .value.change()
        .removeMark("bold")
        .value.change()
        .removeMark("italic")
        .value.change()
        .setBlocks({ type: "quote" })
      _this.setState({
        value: resolvedState.value
      })
      break
    case "toggle_bold":
      resolvedState = value.change().toggleMark({ type: "bold" })
      _this.setState({
        value: resolvedState.value
      })
      break
    case "toggle_italic":
      resolvedState = value.change().toggleMark({ type: "italic" })
      _this.setState({
        value: resolvedState.value
      })
      break
    case "toggle_link":
      const hasLinks = value.inlines.some(inline => inline.type === "link")
      if (hasLinks) resolvedState = value.change().unwrapInline("link")
      else resolvedState = addLink(value)
      _this.setState({
        value: resolvedState.value
      })
      break
    default:
      return false
  }
}
