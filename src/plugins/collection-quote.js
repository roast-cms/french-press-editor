import AutoReplace from "slate-auto-replace"
import When from "slate-when"

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

  When({
    when: value => value.blocks.some(b => b.type === "quote"),
    plugin: AutoReplace({
      trigger: "enter",
      before: /^.|$/,
      transform: transform => {
        return transform.splitBlock().setBlocks({type: "paragraph"}) // exit quote
      },
    }),
  }),

  When({
    when: value => value.blocks.some(b => b.type === "quote"),
    plugin: AutoReplace({
      trigger: "backspace",
      after: /./,
      before: /^$/,
      transform: transform => {
        return transform.setBlocks({type: "paragraph"}) // transform quote to paragraph
      },
    }),
  }),
]
