// tools
import styled from "styled-components"

// exports
export const Wrapper = styled.div`

  /***************** set editor styles *****************/
  background: ${props => props.theme.color.background};
  max-width: 600px;
  margin: 2em auto;
  font-size: 1.24em;
  ${props => props.theme.size.font.auto} ${props =>
      props.theme.typography.text.auto} padding: ${props =>
      props.theme.size.block.spacing}em;
  max-width: ${props => props.theme.size.block.column.maxwidth.m}px;
  ${props =>
    props.theme.size.breakpoint.min.xxl`max-width: ${props =>
      props.theme.size.block.column.maxwidth.l}px;`};

  h3 {
    ${props => props.theme.typography.title.auto} font-size: ${props =>
        props.theme.size.font.make.larger}em;
    margin: .5em 0;
  }
  blockquote {
    color: ${props => props.theme.color.alpha.foreground(0.5)};
    border-left: 4px solid;
    padding: 0 1em;
    margin: 0;
    font-style: italic;
  }

  /***************** customize css for editor controls *****************/
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
