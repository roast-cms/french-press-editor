import AutoReplace from "slate-auto-replace"

/**
 * An array of plugins that makes quotes smart, turns dashes into long dashes and triple dots into an ellipsis.
 * @module chars
 */
export const chars = [
  /**
   * Smart quotes.
   * @function AutoReplace
   */
  AutoReplace({
    trigger: /(")/,
    before: /[^ ”]$/,
    change: change => {
      return change.insertText("”") // smart double quote (right)
    },
  }),
  AutoReplace({
    trigger: /(")/,
    before: /^|[ ]$/,
    change: change => {
      return change.insertText("“") // smart double quote (left)
    },
  }),
  AutoReplace({
    trigger: /(')/,
    before: /[^ ”]$/,
    change: change => {
      return change.insertText("’") // smart single quote (right)
    },
  }),
  AutoReplace({
    trigger: /(')/,
    before: /^|[ ]$/,
    change: change => {
      return change.insertText("‘") // smart single quote (left)
    },
  }),

  /**
   * Long dash and ellipsis.
   * @function AutoReplace
   */
  AutoReplace({
    trigger: "space",
    before: /( -)$/,
    change: change => {
      return change.insertText(" — ") // mdash
    },
  }),
  AutoReplace({
    trigger: "space",
    before: /(\.\.\.)$/,
    change: change => {
      return change.insertText("… ") // elipsis
    },
  }),
]
