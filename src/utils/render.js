import {makeRelative} from "@roast-cms/react-link-filter/dist/utils"
import React from "react"

import Link from "../components/controls/Link"
import Unquote from "../components/controls/Unquote"

/**
 * Defines how all block-level nodes within the document are going to be rendered.
 * @function renderNode
 * @param props
 * @return {Object}
 */
export const renderNode = props => {
  const {node, attributes, children, isSelected, editor} = props
  const focus = editor.value.isFocused && isSelected
  const focusClassName = focus ? "focus" : "nofocus"
  switch (node.type) {
    case "paragraph":
      return <p {...attributes}>{children}</p>
    case "heading":
      return <h3>{children}</h3>
    case "divider":
      return <hr className={focusClassName} />
    case "quote":
      return (
        <div style={{clear: "both"}}>
          {!props.readOnly &&
            focus && (
              <Unquote
                className="french-press_unquote"
                contentEditable="false"
                spellCheck="false"
                suppressContentEditableWarning
                onClick={event => {
                  event.preventDefault()
                  editor.onChange(
                    editor.value
                      .change()
                      .setNodeByKey(attributes["data-key"], {
                        type: "paragraph",
                      })
                      .focus()
                  )
                }}
                branded
              >
                Unquote
              </Unquote>
            )}
          <blockquote {...attributes} className={focusClassName}>
            {children}
          </blockquote>
        </div>
      )
    case "image": {
      if (
        props.editor.props.components &&
        props.editor.props.components.Picture
      ) {
        const Picture = props.editor.props.components.Picture
        return <Picture {...props} />
      } else {
        // eslint-disable-next-line
        console.warn("<Picture /> component required to render images")
        return null
      }
    }
    //
    // user can define a <pictureDocketNode /> which is a component that may
    // show up after they click "Insert Image" button; by default it's skipped,
    // however, in some cases it may be useful to display some image suggestions
    // that user can insert without having to upload new ones; this
    // action is skipped if the user is inserting an image via drag & drop
    case "docket": {
      if (
        props.editor.props.components &&
        props.editor.props.components.PictureDocket
      ) {
        const PictureDocket = props.editor.props.components.PictureDocket
        return <PictureDocket {...props} />
      } else {
        return null
      }
    }
    case "link": {
      const {data} = node
      const href = data.get("href")
      return (
        <Link
          {...attributes}
          to={makeRelative(href, props.editor.props.options.domain)}
        >
          {children}
        </Link>
      )
    }
    default:
      return <p {...attributes}>{children}</p>
  }
}

/**
 * Marks are inline "rules" for text that apply bold and italic formatting.
 * @function renderMark
 * @return {Object}
 */
export const renderMark = props => {
  const {children, mark} = props
  switch (mark.type) {
    case "bold":
      return <strong>{children}</strong>
    case "italic":
      return <em>{children}</em>
    default:
      return {children}
  }
}
