/**
 * A set of rules that defines how to transpile HTML itno slate document nodes and marks (and back).
 * @constant rules
 */
import isUrl from "is-url"

import {BLOCK_TAGS, MARK_TAGS} from "./defaults"
import {squish} from "../utils/squish-to-plaintext"

export const hasImages = nodes => {
  let hasImages = false
  nodes.forEach(el => {
    if (el.tagName) {
      const block = BLOCK_TAGS[el.tagName.toLowerCase()]
      hasImages = block === "image"
    }
  })
  return hasImages
}

export const imageDeserializer = el => {
  const imageSrc = el.getAttribute("src") || el.getAttribute("srcset")
  if (!isUrl(imageSrc)) return
  return {
    object: "block",
    type: "image",
    isVoid: true,
    data: {src: imageSrc},
  }
}

export const RULES_DESERIALIZE = [
  {
    deserialize(el, next) {
      const block = BLOCK_TAGS[el.tagName.toLowerCase()]
      if (!block) return
      switch (block) {
        case "paragraph": {
          if (!hasImages(el.childNodes))
            return {
              object: "block",
              type: "paragraph",
              nodes: next(el.childNodes),
            }
          else return next(el.childNodes)
        }
        case "quote": {
          return {
            object: "block",
            type: "quote",
            nodes: next(squish(el).childNodes),
          }
        }
        case "heading": {
          return {
            object: "block",
            type: "heading",
            nodes: next(squish(el).childNodes),
          }
        }
        case "image":
          return imageDeserializer(el)
        case "link": {
          return {
            object: "inline",
            type: "link",
            data: {
              href: el.getAttribute("href"),
            },
            nodes: next(squish(el).childNodes),
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
