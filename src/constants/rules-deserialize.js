/**
 * A set of rules that defines how to transpile HTML itno slate document nodes and marks (and back).
 * @constant rules
 */
import isUrl from "is-url"

import {BLOCK_TAGS, MARK_TAGS} from "./defaults"

/**
 * Flattens HTML into plain text.
 * @function squish
 * @return {String}
 */
const squish = el => {
  el.innerHTML = el.innerText || el.textContent
  return el
}


export const RULES_DESERIALIZE = [
  {
    deserialize(el, next) {
      const block = BLOCK_TAGS[el.tagName.toLowerCase()]
      if (!block) return
      switch (block) {
        case "paragraph": {
          return {
            object: "block",
            type: "paragraph",
            nodes: next(el.childNodes),
          }
        }
        case "quote": {
          return {
            object: "block",
            type: "quote",
            nodes: next(el.childNodes),
          }
        }
        case "heading": {
          return {
            object: "block",
            type: "heading",
            nodes: next(el.childNodes),
          }
        }
        case "image": {
          const src = el.getAttribute("src") || el.getAttribute("srcset")
          if (!isUrl(src)) return
          return {
            object: "block",
            type: "image",
            isVoid: true,
            data: {src},
          }
        }
        case "link": {
          return {
            object: "inline",
            type: "link",
            data: {
              href: el.getAttribute("href"),
            },
            nodes: next(el.childNodes),
          }
        }
        default:
          return {
            object: "block",
            type: "paragraph",
            nodes: next(el.childNodes),
          }
      }
    },
  },
  {
    deserialize(el, next) {
      const mark = MARK_TAGS[el.tagName]
      if (!mark) return
      return {
        object: "mark",
        type: mark,
        nodes: next(el.childNodes),
      }
    },
  },
]
