import AutoReplace from "slate-auto-replace"

/**
 * A plugin function that creates divider line via markup command (`***` on new line + Enter).
 * @module hr
 */
export const hr = [
  AutoReplace({
    trigger: "enter",
    before: /^(\*\*\*)$/,
    transform: (transform, event, matches) => {
      return transform
        .setBlocks({ type: "divider", isVoid: true })
        .collapseToEndOfNextBlock()
        .collapseToEndOfNextBlock() // page break
    }
  })
]
