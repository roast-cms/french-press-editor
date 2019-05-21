import AutoReplace from "slate-auto-replace"
import When from "slate-when"

/**
 * An array of plugins that creates headings out of markup (`# Text`) strings, adds periods at the end of headings if there's no punctuation or cancels headings if user hits Backspace at the beginning of the line.
 * @module header
 */
export const header = [
  AutoReplace({
    trigger: "space",
    before: /^(#)$/,
    transform: transform => {
      return transform.setBlocks({type: "heading"}) // heading
    },
  }),
  When({
    when: value => value.blocks.some(b => b.type === "heading"),
    plugin: AutoReplace({
      trigger: "enter",
      before: /.+/,
      transform: (transform, event, matches) => {
        let heading = matches.before[0]
        if (
          heading[heading.length - 1].search(/[^\w\s]|_/) === -1 // if no punctuation mark at the end of heading...
        )
          return transform
            .insertText(".")
            .splitBlock()
            .setBlocks({type: "paragraph"})
        else return transform.splitBlock().setBlocks({type: "paragraph"})
      },
    }),
  }),
  When({
    when: value => value.blocks.some(b => b.type === "heading"),
    plugin: AutoReplace({
      trigger: "backspace",
      after: /./,
      before: /^$/,
      transform: transform => {
        return transform.setBlocks({type: "paragraph"}) // cancel heading
      },
    }),
  }),
]
