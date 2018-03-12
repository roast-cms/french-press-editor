//
// An array of plugins that creates quotes out of markup (`> Text`) strings,
// cancels headings if user hits Backspace at the begginning of the line and
// exits quote block into a new default paragraph if user hits Enter
// at the end of the line.
//
// plugin
import AutoReplace from "slate-auto-replace"
//
export const quote = [
  AutoReplace({
    trigger: "space",
    before: /^(>)$/,
    transform: (transform, event, matches) => {
      return transform.setBlocks({ type: "quote" }) // quote
    }
  }),
  AutoReplace({
    trigger: "enter",
    before: /^.|$/,
    onlyIn: "quote",
    transform: (transform, event, matches) => {
      return transform.splitBlock().setBlocks({ type: "paragraph" }) // exit quote
    }
  }),
  AutoReplace({
    trigger: "backspace",
    after: /./,
    before: /^$/,
    onlyIn: "quote",
    transform: (transform, event, matches) => {
      return transform.setBlocks({ type: "paragraph" }) // transform quote to paragraph
    }
  })
]
