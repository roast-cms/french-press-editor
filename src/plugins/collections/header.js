//
// An array of plugins that creates headings out of markup (`# Text`) strings,
// adds periods at the end of headings if there's no punctuation or cancels
// headings if user hits Backspace at the beginning of the line.
//
// plugin
import AutoReplace from "slate-auto-replace"
//
export const header = [
  AutoReplace({
    trigger: "space",
    before: /^(#)$/,
    transform: (transform, event, matches) => {
      return transform.setBlocks({ type: "heading" }) // heading
    }
  }),
  AutoReplace({
    trigger: "enter",
    before: /.+/,
    onlyIn: "heading",
    transform: (transform, event, matches) => {
      let heading = matches.before[0]
      if (
        heading[heading.length - 1].search(/[^\w\s]|_/) === -1 // if no punctuation mark at the end of heading...
      )
        return transform
          .insertText(".") // add a period.
          .splitBlock()
          .setBlocks({ type: "paragraph" })
      else return transform.splitBlock().setBlocks({ type: "paragraph" })
    }
  }),
  AutoReplace({
    trigger: "backspace",
    after: /./,
    before: /^$/,
    onlyIn: "heading",
    transform: (transform, event, matches) => {
      return transform.setBlocks({ type: "paragraph" }) // cancel heading
    }
  })
]
