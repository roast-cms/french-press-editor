import AutoReplace from "slate-auto-replace"

/**
 * An array of plugins that creates quotes out of markup (`> Text`) strings, cancels headings if user hits Backspace at the begginning of the line and exits quote block into a new default paragraph if user hits Enter at the end of the line.
 * @module quote
 */
export const quote = [
  AutoReplace({
    trigger: "space",
    before: /^(>)$/,
    change: change => {
      return change.setBlocks({type: "quote"}) // quote
    },
  }),
  AutoReplace({
    trigger: "enter",
    before: /^.|$/,
    onlyIn: "quote",
    change: change => {
      return change.splitBlock().setBlocks({type: "paragraph"}) // exit quote
    },
  }),
  AutoReplace({
    trigger: "backspace",
    after: /./,
    before: /^$/,
    onlyIn: "quote",
    change: change => {
      return change.setBlocks({type: "paragraph"}) // change quote to paragraph
    },
  }),
]
