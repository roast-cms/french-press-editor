import React from "react"
import styled from "styled-components"

import button from "./css/button"

const ImageButton = styled.button`
  ${button}
  position: absolute;
  border-radius: 0.25em;
  right: 0.5em;
`

/**
 * A button component that appears in the editor when user's carriage is on a new empty line. Have a good read through it if you'd like to build your own (you can plug it in to `<FrenchPress />` component).
 * @module ImageButton
 * @param {Boolean} followComposerCursor
 * @param {Function} onMouseDown
 */
export default props => {
  return (
    <ImageButton
      className="fpe-image-button"
      followComposerCursor
      style={props.style}
      onMouseDown={event => props.click(event)}
    >
      {props.children}
    </ImageButton>
  )
}
