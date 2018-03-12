//
// An array of plugins that makes quotes smart, turns dashes into long dashes
// and triple dots into an ellipsis.
//
// plugin
import AutoReplace from "slate-auto-replace"
//
export const chars = [
  // smart quotes
  AutoReplace({
    trigger: /(")/,
    before: /[^ ”]$/,
    transform: (transform, event, matches) => {
      return transform.insertText("”") // smart double quote (right)
    }
  }),
  AutoReplace({
    trigger: /(")/,
    before: /(^)|[ ]$/,
    transform: (transform, event, matches) => {
      return transform.insertText("“") // smart double quote (left)
    }
  }),
  AutoReplace({
    trigger: /(')/,
    before: /[^ ”]$/,
    transform: (transform, event, matches) => {
      return transform.insertText("’") // smart single quote (right)
    }
  }),
  AutoReplace({
    trigger: /(')/,
    before: /(^)|[ ]$/,
    transform: (transform, event, matches) => {
      return transform.insertText("‘") // smart single quote (left)
    }
  }),

  // long dash and ellipsis
  AutoReplace({
    trigger: "space",
    before: /( -)$/,
    transform: (transform, event, matches) => {
      return transform.insertText(" — ") // mdash
    }
  }),
  AutoReplace({
    trigger: "space",
    before: /(\.\.\.)$/,
    transform: (transform, event, matches) => {
      return transform.insertText("… ") // elipsis
    }
  })
]
