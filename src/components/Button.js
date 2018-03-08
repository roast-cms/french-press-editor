// tools
import React from "react"

// components
import {
  TinyButton as TinyButtonInit,
} from "@roast-cms/react-button-beans"
import Link from "./Link"

export const TinyButton = props => (
  <TinyButtonInit linkComponent={Link} {...props}>
    {props.children}
  </TinyButtonInit>
)
