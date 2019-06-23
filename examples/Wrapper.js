import styled from "styled-components"

/**
 * Default CSS styles that visually render the editor component (nicely) using Styled Components.
 * @module Wrapper
 */
export const Wrapper = styled.div`
  background: #fff;
  max-width: 600px;
  margin: 2em auto;

  color: ${props => props.theme.foreground};
  font-family: "Rajdhani", sans-serif;
  letter-spacing: 0.025em;
  line-height: 1.75em;

  padding: 1em;
  max-width: 750px;

  h3 {
    font-size: 2em;
    margin: 0.5em 0;
  }
  blockquote {
    color: #999;
    border-left: 4px solid;
    padding: 0 1em;
    margin: 0;
    font-style: italic;
  }
  .fpe-unquote {
    float: left;
    margin-top: -1.25em;
    margin-left: -1.5em;

    position: absolute;
    left: 0;

    @media (max-width: 820px) {
      margin-left: 0;
    }
  }
`
