// tools
import Html from "slate-html-serializer"
import isUrl from "is-url"

// components

// return

// dictionary
const BLOCK_TAGS = {
  p: "paragraph",
  blockquote: "quote",
  hr: "divider",
  h1: "heading",
  h2: "heading",
  h3: "heading",
  h4: "heading",
  a: "link",
  img: "image"
}
const MARK_TAGS = {
  em: "italic",
  i: "italic",
  strong: "bold",
  b: "bold"
}

// extract just the text from node:
const squish = el => {
  el.innerHTML = el.innerText || el.textContent
  return el
}

// deserialize copy-paste html content
const rules = [
  {
    deserialize(el, next) {
      // cycle through block types
      const block = BLOCK_TAGS[el.tagName.toLowerCase()]
      if (!block) return

      // an attempt to unwrap divs (doesn't work)
      // if (block === "div") {
      //   console.log(block);
      //   return next(el.childNodes)
      // }

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
            data: { src: el.getAttribute("src") || el.getAttribute("srcset") } // this image needs to be uploaded
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
