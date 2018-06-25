//
// `<Reader />` component,
// a read-only version of the Slate Editor
//
// tools
import { Editor } from "slate-react"
import { Value } from "slate"
import React from "react"

import { renderNode, renderMark } from "../render"
import { schema } from "../schema"

//
// component export
export const Reader = props => {
  return (
    <Editor
      // this is the Slate editor component that renders Slate JSON value object
      //
      // props defineable by user
      options={{
        ...props.options,
        imagePlaceholder:
          (props.options && props.options.imagePlaceholder) ||
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
        domain: (props.options && props.options.domain) || ""
      }}
      components={props.components}
      value={Value.fromJSON(props.value)}
      //
      // props inferred from Editor architecture
      readOnly
      schema={schema}
      renderNode={renderNode}
      renderMark={renderMark}
    />
  )
}
