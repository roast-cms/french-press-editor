import React from "react";
import styled from "styled-components";

import Button from "./Button";

const ImageButton = styled(Button)`
  ${props => props.theme.size.breakpoint.max.m`
    right: -${props => props.theme.size.block.spacing}em;
  `};
`;

/**
 * A button component that appears in the editor when user's carriage is on a new empty line. Have a good read through it if you'd like to build your own (you can plug it in to `<FrenchPress />` component).
 * @module ImageButton
 * @param {Boolean} followComposerCursor
 * @param {Function} onMouseDown
 */
export default props => {
  return (
    <ImageButton
      followComposerCursor
      style={props.style}
      onMouseDown={event => props.click(event)}
    >
      {props.children}
    </ImageButton>
  );
};
