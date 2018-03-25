//
// `<Reader />` component,
// a read-only version of the Slate Editor
//
// tools
import React from "react"
import { Editor } from "slate-react"
import { Value } from "slate"
import { schema } from "../schema"
import { renderNode, renderMark } from "../render"
//
// component export
export const Reader = props => {
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
    readOnly={true}
    schema={schema}
    renderNode={renderNode}
    renderMark={renderMark}
  />
}
