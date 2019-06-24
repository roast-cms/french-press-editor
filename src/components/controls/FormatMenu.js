import React from "react"
import styled from "styled-components"

import button from "./css/button"

const Menu = styled.div`
  display: none;
  position: absolute;
  bottom: initial !important;
  z-index: 11;
  line-height: 1em;

  color: ${props => props.theme.background || "#ffffff"};

  button {
    ${button}
  }

  &.touch {
    margin-top: -65px;
    &::after {
      content: "";
      position: absolute;
      display: block;
      height: 57px;
      margin-left: 50%;
      margin-top: 2px;
      border: 1px dashed ${props => props.theme.accent || "#7a2a49"};
      z-index: -1;
    }
  }
`
const Borders = styled.div`
  border-radius: 0.25em;
  overflow: hidden;
`
const MenuItem = styled.button`
  width: auto;
  flex-grow: 1;
`

/**
 * A component with all of the UI logic for the floating format menu.
 * @module FormatMenu
 */
export default props => {
  if (props.value.blocks.some(node => node.type === "quote")) return null
  if (
    props.value.blocks.some(node => node.type === "heading") &&
    props.value.blocks.some(
      node => node.type === "paragraph" && node.text !== ""
    )
  )
    return null
  const MakeHeader =
    props.controls && props.controls.MakeHeader
      ? props.controls.MakeHeader
      : () => <span>H</span>
  const CancelHeader =
    props.controls && props.controls.CancelHeader
      ? props.controls.CancelHeader
      : () => <small>⇲</small>
  const MakeQuote =
    props.controls && props.controls.MakeQuote
      ? props.controls.MakeQuote
      : () => <span>❝</span>
  const MakeLink =
    props.controls && props.controls.MakeLink
      ? props.controls.MakeLink
      : () => <u>a</u>
  const MakeBold =
    props.controls && props.controls.MakeBold
      ? props.controls.MakeBold
      : () => <strong>b</strong>
  const MakeItalic =
    props.controls && props.controls.MakeItalic
      ? props.controls.MakeItalic
      : () => <i>i</i>
  //
  return (
    <Menu ref={props.menuRef} className="fpe-menu">
      {props.value.blocks.some(node => node.type === "heading") ? (
        <button
          onMouseDown={event => event.preventDefault()}
          onMouseUp={event => {
            event.preventDefault()
            props.formatCommand("undo_heading")
          }}
          title="Undo heading"
          className="fpe-undo-heading"
        >
          <CancelHeader />
        </button>
      ) : (
        <Borders>
          <div style={{display: "flex"}}>
            <MenuItem
              left
              title="Make a heading"
              onMouseDown={event => event.preventDefault()}
              onMouseUp={event => {
                event.preventDefault()
                props.formatCommand("make_heading")
              }}
            >
              <MakeHeader />
            </MenuItem>
            <MenuItem
              title="Make a quote"
              onMouseDown={event => event.preventDefault()}
              onMouseUp={event => {
                event.preventDefault()
                props.formatCommand("make_quote")
              }}
            >
              <MakeQuote />
            </MenuItem>
            <MenuItem
              script
              onMouseDown={event => event.preventDefault()}
              onMouseUp={event => {
                event.preventDefault()
                props.formatCommand("toggle_link")
              }}
              style={{borderLeft: "4px solid #2c2c2c"}}
              className={
                props.value.inlines.some(node => node.type === "link")
                  ? "active"
                  : null
              }
            >
              <MakeLink />
            </MenuItem>
            <MenuItem
              script
              className={
                props.value &&
                props.value.activeMarks &&
                props.value.activeMarks.some(mark => mark.type === "bold")
                  ? "active"
                  : null
              }
              onClick={event => event.preventDefault()}
              onMouseDown={event => event.preventDefault()}
              onMouseUp={event => {
                event.preventDefault()
                props.formatCommand("toggle_bold")
              }}
            >
              <MakeBold style={{fontWeight: "700 !important"}} />
            </MenuItem>
            <MenuItem
              script
              className={
                props.value &&
                props.value.activeMarks &&
                props.value.activeMarks.some(mark => mark.type === "italic")
                  ? "active"
                  : null
              }
              right
              onClick={event => event.preventDefault()}
              onMouseDown={event => event.preventDefault()}
              onMouseUp={event => {
                event.preventDefault()
                props.formatCommand("toggle_italic")
              }}
            >
              <MakeItalic />
            </MenuItem>
          </div>
        </Borders>
      )}
    </Menu>
  )
}
