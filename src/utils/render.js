import React from "react"
import styled from "styled-components"
import Unquote from "../components/controls/Unquote"
import button from "../components/controls/css/button"

const HeaderControl = styled.button`
  ${button}
  position: absolute;
  top: 4em;
  border-radius: 0.25em;
`

/**
 * Defines how all block-level nodes within the document are going to be rendered.
 * @function renderNode
 * @param props
 * @return {Object}
 */
export const renderNode = props => {
  const {node, attributes, children, isSelected, editor} = props
  const focus = editor.value.isFocused && isSelected
  const className = focus ? "focus" : "nofocus"

  const {components, controls} = (editor && editor.props) || {}
  const {data} = node

  const CancelHeader =
    controls && controls.CancelHeader
      ? controls.CancelHeader
      : () => <small>p</small>

  switch (node.type) {
    case "paragraph":
      return <p {...attributes}>{children}</p>
    case "heading":
      return (
        <div style={{clear: "both"}}>
          {!props.readOnly && focus && (
            <HeaderControl
              onMouseDown={event => event.preventDefault()}
              onMouseUp={event => {
                event.preventDefault()
                editor.props.formatCommand("undo_heading")
              }}
              title="Undo heading"
              className="fpe-undo-heading"
            >
              <CancelHeader />
            </HeaderControl>
          )}
          <h3>{children}</h3>
        </div>
      )
    case "divider":
      return <hr className={className} />
    case "quote":
      return (
        <div style={{clear: "both"}}>
          {!props.readOnly && focus && (
            <Unquote
              className="fpe-unquote"
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
          <blockquote {...attributes} className={className}>
            {children}
          </blockquote>
        </div>
      )
    case "image": {
      if (components && components.Picture) {
        const Picture = components.Picture
        return <Picture {...props} />
      } else {
        // eslint-disable-next-line
        console.warn("<Picture /> component required to render images")
        return null
      }
    }
    case "link": {
      const href = data.get("href")

      if (components && components.Link) {
        const Link = components.Link
        return (
          <>
            <Link {...attributes} to={href}>
              {children}
            </Link>
            {" "}
          </>
        )
      } else {
        return (
          <>
            <a {...attributes} href={href}>
              {children}
            </a>
            {" "}
          </>
        )
      }
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
