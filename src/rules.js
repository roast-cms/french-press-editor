//
// A "prescription" set that defines how HTML may be rendered via `render.js`
//
// tools
import Html from "slate-html-serializer"
import isUrl from "is-url"
//
// constants
import {BLOCK_TAGS, MARK_TAGS} from "./constants"
//
// this function flattens all HTML into plain text
const squish = el => {
  el.innerHTML = el.innerText || el.textContent
  return el
}
//
// rules array help transpile HTML itno slate document nodes and marks (and back)
const rules = [
  {
    deserialize(el, next) {
      //
      // cycle through block types
      const block = BLOCK_TAGS[el.tagName.toLowerCase()]
      if (!block) return
      //
      switch (block) {
        case "paragraph": {
          return {
            object: "block",
            type: "paragraph",
            nodes: next(el.childNodes)
          }
        }
        case "quote": {
          return {
            object: "block",
            type: "quote",
            nodes: next(squish(el).childNodes)
          }
        }
        case "heading": {
          return {
            object: "block",
            type: "heading",
            nodes: next(squish(el).childNodes)
          }
        }
        case "image": {
          let imageSrc = el.getAttribute("src") || el.getAttribute("srcset")
          if (!isUrl(imageSrc)) return
          return {
            object: "block",
            type: "image",
            isVoid: true,
            data: { src: el.getAttribute("src") || el.getAttribute("srcset") }
          }
        }
        case "link": {
          return {
            object: "inline",
            type: "link",
            data: {
              href: el.getAttribute("href")
            },
            nodes: next(squish(el).childNodes)
          }
        }
        default:
          return {
            object: "block",
            type: "paragraph",
            nodes: next(el.childNodes)
          }
      }
    }
  },
  {
    deserialize(el, next) {
      const mark = MARK_TAGS[el.tagName]
      if (!mark) return
      return {
        object: "mark",
        type: mark,
        nodes: next(el.childNodes)
      }
    }
  }
]
export const html = new Html({ rules })
