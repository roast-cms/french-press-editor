import styled from "styled-components"

import button from "./css/button"

/**
 * CSS for the Unquote button which appears inside the quote for an easy way to revert formatting to plain text.
 * @module Unquote
 */
export default styled.button`
  ${button}
  border-radius: 0.25em;
  margin: 1.35em -${props => props.theme.size.block.padding}em -3.35em 0;
  float: right;
  position: relative;
  z-index: ${props => props.theme.layer.up};
  ${props => props.theme.size.breakpoint.max.m`
    right: 2em;
  `};
`
