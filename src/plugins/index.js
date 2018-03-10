// functions
import { html } from "../rules"
import localForage from "localforage"
import uuidv1 from "uuid/v1"

// functions
import { forceImageRestrictions } from "../utils"

// french-press-editor plugins
import { LinkHotkey } from "./link-hotkey"
import { Paste } from "./paste-html"
import { MarkHotkey } from "./mark-hotkey"

// plugins by others, including forked versions
import AutoReplace from "slate-auto-replace"
import InsertImages from "@roast-cms/slate-drop-or-paste-images"

// plugins array
export const plugins = [
  // paste and parse html
  Paste({ html }),

  // hotkeys
  LinkHotkey({ key: "k" }),
  MarkHotkey({ key: "b", type: "bold" }),
  MarkHotkey({ key: "i", type: "italic" }),

  // quote
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
  }),

  // section separater
  AutoReplace({
    trigger: "enter",
    before: /^(\*\*\*)$/,
    transform: (transform, event, matches) => {
      return transform
        .setBlocks({ type: "divider", isVoid: true })
        .collapseToEndOfNextBlock()
        .collapseToEndOfNextBlock() // page break
    }
  }),

  // title/heading
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
  }),

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
  }),

  // drag & drop image inserter tool
  InsertImages({
    insertImage: (transform, file, editor) => {
      return forceImageRestrictions(
        file.size,
        file.type,
        editor.props.options.maxImageSize
      )
        .then(() => {
          const key = uuidv1()
          localForage.setItem(key, file)

          console.log(key, transform, file, editor)
          return transform.insertBlock({
            type: "image",
            isVoid: true,
            data: {
              file,
              key,
              src: editor.props.options.imagePlaceholder
            }
          })
        })
        .catch(reason => {
          editor.props.callbackError("insert_image", reason)
        })
    }
  })
]
