//
// A component that compiles buttons into a neat strip.
//
// tools
import { Item as ItemInit } from "@roast-cms/react-button-beans"
import React from "react"

import { ButtonStrip, ButtonStyles } from './ButtonStrip';
import Link from "./Link"

//
// convenience exports
export { ButtonStrip, ButtonStyles } from "@roast-cms/react-button-beans"
//
export const Item = props => (
  <ItemInit linkComponent={Link} {...props}>
    {props.children}
  </ItemInit>
)
