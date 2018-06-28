/**
 * Transforms an inline block by making it a link.
 * @module addLink
 * @param {Object} value
 * @param {String} returnType
 * @return {Object} Value
 */
export const addLink = (value, returnType = "value") => {
  const href = window.prompt("Enter the URL for the link:");
  if (returnType === "value") {
    if (!href) return value.change().unwrapInline("link");
    return value.change().wrapInline({
      type: "link",
      data: { href }
    });
  } else if (returnType === "data") return { href };
};

/**
 * Format commands switch for inline transformations.
 * @module formatCommand
 * @param {String} type
 * @param {Object} _this
 */
export const formatCommand = (type, _this) => {
  const { value } = _this.state;
  let resolvedState;
  switch (type) {
    case "undo_heading":
      resolvedState = value.change().setBlocks({ type: "paragraph" });
      _this.setState({
        value: resolvedState.value
      });
      break;
    case "make_heading":
      resolvedState = value
        .change()
        .unwrapInline("link")
        .value.change()
        .removeMark("bold")
        .value.change()
        .removeMark("italic")
        .value.change()
        .setBlocks({ type: "heading" });
      _this.setState({
        value: resolvedState.value
      });
      break;
    case "make_quote":
      resolvedState = value
        .change()
        .unwrapInline("link")
        .value.change()
        .removeMark("bold")
        .value.change()
        .removeMark("italic")
        .value.change()
        .setBlocks({ type: "quote" });
      _this.setState({
        value: resolvedState.value
      });
      break;
    case "toggle_bold":
      resolvedState = value.change().toggleMark({ type: "bold" });
      _this.setState({
        value: resolvedState.value
      });
      break;
    case "toggle_italic":
      resolvedState = value.change().toggleMark({ type: "italic" });
      _this.setState({
        value: resolvedState.value
      });
      break;
    case "toggle_link":
      const hasLinks = value.inlines.some(inline => inline.type === "link");
      if (hasLinks) resolvedState = value.change().unwrapInline("link");
      else resolvedState = addLink(value);
      _this.setState({
        value: resolvedState.value
      });
      break;
    default:
      return false;
  }
};

/**
 *  Figures out where the format menu should appear, according to user's selection location within editor.
 * @module menuPosition
 * @param {Object} _this
 */
export const menuPosition = _this => {
  const { value } = _this.state;
  const menu = _this.menu;
  if (!menu) return;
  if (window.getSelection().rangeCount <= 0) return;
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();
  if (value.isBlurred || value.isEmpty) {
    menu.style.display = "";
    return;
  }
  menu.style.display = "block";
  const leftOffset =
    rect.left + window.scrollX - menu.offsetWidth / 2 + rect.width / 2;
  const topOffset = rect.top + window.scrollY - menu.offsetHeight + 3;
  menu.style.top = `${topOffset}px`;
  menu.style.left = `${leftOffset >= 0 ? leftOffset : 5}px`;
  //
  // devices with touch screens will have edit menu considerably above the
  // selected text to give way to the native hover menu
  "ontouchstart" in document.documentElement
    ? menu.classList.add("touch")
    : menu.classList.remove("touch");
};
