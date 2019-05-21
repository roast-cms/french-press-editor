import {Editor} from "slate-react"
import {Value} from "slate"
import React from "react"

import {renderNode, renderMark} from "../../render"
import {schema} from "../../schema"


/**
 * A read-only version of Slate Editor to easily render the JSON document state.
 * @module Reader
 * @prop {Object} options A pre-defined set of options to run the render, includes `domain` and `imagePlaceholder`
 * @prop {Object} components Any additional components, like `Picture` and other.
 * @prop {Object} value Slate `Value` state to be rendered into human-readable content.
 */
export const Reader = props => {
  return (
    <Editor
      options={{
        ...props.options,
        imagePlaceholder:
          (props.options && props.options.imagePlaceholder) ||
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
        domain: (props.options && props.options.domain) || "",
      }}
      components={props.components}
      value={Value.fromJSON(props.value)}
      readOnly
      schema={schema}
      renderNode={renderNode}
      renderMark={renderMark}
    />
  )
}
