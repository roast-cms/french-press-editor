import {css} from "styled-components"

export default css`
  outline: 0;
  background: ${props => props.theme.accent};
  border: none;
  color: ${props => props.theme.background};
  font-size: 1em;
  padding: 0.05em 0.5em;
  font-family: inherit;
  cursor: pointer;
  &.active,
  &:active {
    background: ${props => props.theme.foreground};
  }
`
