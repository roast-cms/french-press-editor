//
// Unquote button style for the editor.
//
// tools
import React from "react"
import styled from "styled-components"
//
// components
import { TinyButton } from "./Button"
//
export const UnquoteButton = styled(TinyButton)`
  width: 6em;
  margin: 1.35em -${props => props.theme.size.block.padding}em -3.35em 0;
  float: right;
  position: relative;
  z-index: ${props => props.theme.layer.up};
  ${props => props.theme.size.breakpoint.max.m`
    right: ${props => props.theme.size.block.spacing / 2}em;
  `};
`
