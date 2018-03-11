// tools
import React from "react"
import styled from "styled-components"

// components
import { TinyButton } from "./Button"

const ImageButton = styled(TinyButton)`
  ${props => props.theme.size.breakpoint.max.m`
    right: -${props => props.theme.size.block.spacing}em;
  `};
`

// return
export default props => {
  return (
    <ImageButton followComposerCursor style={props.style}>
      {props.children}
    </ImageButton>
  )
}
