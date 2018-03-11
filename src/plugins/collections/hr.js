import AutoReplace from "slate-auto-replace"

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
