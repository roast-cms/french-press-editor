//
// Default CSS styles that visually render the editor component (nicely)
// using Styled Components.
//
// tools
import styled from "styled-components"
//
// CSS
export const Wrapper = styled.div`
  background: ${props => props.theme.color.background};
  max-width: 600px;
  margin: 2em auto;
  font-size: 1.24em;
  ${props => props.theme.size.font.auto} ${props =>
      props.theme.typography.text.auto} padding: ${props =>
      props.theme.size.block.spacing}em;
  max-width: ${props => props.theme.size.block.column.m}px;
  ${props =>
    props.theme.size.breakpoint.min.xxl`max-width: ${props =>
      props.theme.size.block.column.l}px;`};

  h3 {
    ${props => props.theme.typography.title.auto} font-size: ${props =>
        props.theme.size.font.make.larger}em;
    margin: .5em 0;
  }
  blockquote {
    color: ${props => props.theme.color.foreground(props.theme.opacity.half)};
    border-left: 4px solid;
    padding: 0 1em;
    margin: 0;
    font-style: italic;
  }
  .french-press_unquote {
    float: left;
    margin-top: -1.25em;
    margin-left: -1.5em;
    ${props =>
      props.theme.size.breakpoint.max.s`margin-left:0`};
  }
  .french-press_undo-heading, .french-press_undo-heading-container {
    padding: .5em;
  }
`
