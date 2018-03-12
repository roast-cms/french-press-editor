// Ideally this file would remain empty;
// every hack export should have as much information as possible along with it
// to facilitate proper implementation.
//
// This is said to be related to https://github.com/ianstormtaylor/slate/issues/1189
// (more related issues are at https://github.com/ianstormtaylor/slate/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+triple )
// where selection on tripple-click would select more than necessary and carry
// the changes onto the next paragraph
// logged in https://github.com/dmitrizzle/Analog.Cafe/issues/712
//
// As soon as this fix is released, this hack could be closed:
// https://github.com/ianstormtaylor/slate/pull/1605
export const fixHangingSelection = (_this, change) => {
  try {
    var value = change.value
    var { selection } = value
    if (
      selection.isExpanded &&
      selection.startKey !== selection.endKey &&
      selection.endOffset === 0
    ) {
      if (selection.isBackward) {
        change.flip()
      }
      const endNode = value.document.getClosestBlock(selection.endKey)
      const prevNode = value.document.getPreviousSibling(endNode.key)
      _this.setState({
        value: change.extendToEndOf(prevNode).value
      })
    }
  } catch (error) {}
}
