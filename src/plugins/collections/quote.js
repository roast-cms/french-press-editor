import AutoReplace from "slate-auto-replace"

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
