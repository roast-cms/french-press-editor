import { Item as ItemChild } from "@roast-cms/react-button-beans";
import React from "react";

import { ButtonStrip, ButtonStyles } from "./ButtonStrip";
import Link from "./Link";

export { ButtonStrip, ButtonStyles } from "@roast-cms/react-button-beans";

/**
 * A component that compiles buttons into a neat strip.
 * @module Item
 */
export const Item = props => (
  <ItemChild linkComponent={Link} {...props}>
    {props.children}
  </ItemChild>
);
