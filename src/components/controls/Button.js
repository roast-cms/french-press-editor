//
// Primitive component built based on `@roast-cms/react-button-beans`
// package that renders responsive, easy to use React.js buttons using
// Styled Components.
//
// tools
import { TinyButton as TinyButtonInit } from "@roast-cms/react-button-beans"
import React from "react"

import Link from "./Link"

//
// Add Link functionality to button components
export const TinyButton = props =>
  <TinyButtonInit linkComponent={Link} {...props}>
    {props.children}
  </TinyButtonInit>
