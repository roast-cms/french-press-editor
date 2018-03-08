// tools
import React from "react"
import LinkFilter from "@roast-cms/react-link-filter"

export default props =>
{
  return <LinkFilter {...props}>
  {props.children}
</LinkFilter>
}
