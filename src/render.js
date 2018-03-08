// components & tools
import React from "react"
import styled from "styled-components"

// Picture
// Link
// PictureDocket (conditional)


// return
export const renderNode = props => {
  console.log(props);

  const { node, attributes, children, isSelected, editor } = props
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
        <div style={{ clear: "both" }}>
          <blockquote {...attributes} className={focusClassName}>
            {children}
          </blockquote>
        </div>
      )
    case "image":
      return <img {...props} />
    case "link": {
      const { data } = node
      const href = data.get("href")
      return (
        <a {...attributes} href={(href)}>
          {children}
        </a>
      )
    }
    default:
      return <p {...attributes}>{children}</p>
  }
}

export const renderMark = props => {
  const { children, mark } = props
  switch (mark.type) {
    case "bold":
      return <strong>{children}</strong>
    case "italic":
      return <em>{children}</em>
    default:
      return { children }
  }
}
