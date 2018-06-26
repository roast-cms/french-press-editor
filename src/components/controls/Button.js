import { TinyButton as TinyButtonInit } from "@roast-cms/react-button-beans";
import React from "react";

import Link from "./Link";

/**
 * Primitive component built based on `@roast-cms/react-button-beans` package that renders responsive, easy to use React.js buttons using Styled Components.
 * @module TinyButton
 */
export const TinyButton = props => (
  <TinyButtonInit linkComponent={Link} {...props}>
    {props.children}
  </TinyButtonInit>
);
