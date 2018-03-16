//
// A "prescription" set of React components which render given block types
// and text marksups.
//
// tools
import React from "react"
import styled from "styled-components"
//
// components
import { TinyButton } from "./components/Button"
import Link from "./components/Link"
import { makeRelative } from "@roast-cms/react-link-filter/dist/utils"
//
// CSS for the Unquote button which appears inside the quote for an easy
// way to revert formatting to plain text
const UnquoteButton = styled(TinyButton)`
  width: 6em;
  margin: 1.35em -${props => props.theme.size.block.column.safety}em -3.35em 0;
  float: right;
  position: relative;
  z-index: ${props => props.theme.layer.up};
  ${props => props.theme.size.breakpoint.max.m`
    right: ${props => props.theme.size.block.spacing / 2}em;
  `};
`
//
// this function defines how all block-level nodes within the document
// are going to be rendered
export const renderNode = props => {
  //
  // derrive values from props
  const { node, attributes, children, isSelected, editor } = props
  const focus = editor.value.isFocused && isSelected
  const focusClassName = focus ? "focus" : "nofocus"
  //
  // cycle through nodes and assign appropriate rendering components
  // depending on node type
  switch (node.type) {
    //
    // the simplest and the default type of block: a paragraph of text
    case "paragraph":
      return (
        <p {...attributes}>
          {children}
        </p>
      )
    case "heading":
      //
      // a single type of heading; the most common use of headings within
      // text seems to be to just have one type, besides the main content
      // title/subtitle etc.; in order to accomondate for two title levels
      // for each document <h3/> was picked as the most likely DOM
      // element to preserve best symantic structure
      return (
        <h3>
          {children}
        </h3>
      )
    //
    // divider line element
    case "divider":
      return <hr className={focusClassName} />
    //
    // this is a quote level block that comes with an internal "Unquote"
    // button to help user reset the block to the default paragraph
    case "quote":
      return (
        <div style={{ clear: "both" }}>
          {!props.readOnly &&
            focus &&
            <UnquoteButton
              //
              // css class to help easy styling by developer outside of
              // this component
              className="french-press_unquote"
              //
              // below attributes remove this button from the usual
              // text context of a browser input field
              contentEditable="false"
              spellCheck="false"
              suppressContentEditableWarning
              //
              // clear the quote style
              onClick={event => {
                event.preventDefault()
                editor.onChange(
                  editor.value
                    .change()
                    .setNodeByKey(attributes["data-key"], {
                      type: "paragraph"
                    })
                    .focus()
                )
              }}
              //
              // colour the button in to the main theme shade
              branded
            >
              Unquote
            </UnquoteButton>}
          <blockquote {...attributes} className={focusClassName}>
            {children}
          </blockquote>
        </div>
      )
    //
    // this is the most complex block-element that requires to be developed
    // outside; a default image component is provided within
    // ./containers/Picture.js, however, user may develop their own, more
    // advanced component (see Analog.Cafe as an example) and pass it in props
    // when initializing <FrenchPress /> component
    case "image": {
      if (
        props.editor.props.components &&
        props.editor.props.components.Picture
      ) {
        const Picture = props.editor.props.components.Picture
        return <Picture {...props} />
      } else {
        console.warn("<Picture /> component required to render images");
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
    //
    // link components are inline blocks that contain url data; <Link /> component
    // is used here, which is built with @roast-cms/react-link-filter tool
    // that allows for smoother browser experience with react-router
    // a smarter way to deal with external links, internal and relative links
    // as well as fixes user input should they forget to include http://
    case "link": {
      const { data } = node
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
    //
    // default block is a paragraph
    default:
      return (
        <p {...attributes}>
          {children}
        </p>
      )
  }
}
//
// marks are inline "rules" for text that apply bold and italic formatting
export const renderMark = props => {
  const { children, mark } = props
  switch (mark.type) {
    case "bold":
      return (
        <strong>
          {children}
        </strong>
      )
    case "italic":
      return (
        <em>
          {children}
        </em>
      )
    default:
      return { children }
  }
}
