//
// A button component that appears in the editor when user's carriage is on
// a new empty line. Have a good read through it if you'd like to build
// your own (you can plug it in to `<FrenchPress />` component).
//
// tools
import React from "react"
import styled from "styled-components"
//
// button component
import { TinyButton } from "./Button"
//
// media query that ensures that the button isn't off-screen on tiny devices
const ImageButton = styled(TinyButton)`
  ${props => props.theme.size.breakpoint.max.m`
    right: -${props => props.theme.size.block.spacing}em;
  `};
`
//
// return component
export default props => {
  return (
    <ImageButton
      //
      // this prop is required for this button to follow user's carriage properly;
      // it triggers CSS that make work;
      // you can learn more about it here: https://github.com/roast-cms/react-button-beans
      followComposerCursor
      //
      // transfer all of the style props (mainly position and visibility)
      // from the parent compoent
      style={props.style}
      //
      // transfer user click back to the parent component
      onMouseDown={event => props.click(event)}
    >
      {props.children}
    </ImageButton>
  )
}
