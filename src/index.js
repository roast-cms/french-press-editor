// tools
import React from "react"
import { Editor } from "slate-react"
import { Value } from "slate"

import { schema } from "./schema"
import { renderNode, renderMark } from "./render"

export class FrenchPress extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      value: Value.fromJSON({
        document: {
          nodes: [
            {
              object: "block",
              type: "paragraph",
              nodes: [
                {
                  object: "text",
                  leaves: [
                    {
                      text: ""
                    }
                  ]
                }
              ]
            }
          ]
        }
      }),
      schema
    }
  }

  handleChange = ({ value }) => {
    this.setState({ value })
  }

  render = () => {
    return [
      <div style={{ position: "relative" }} key="Editor">
        <Editor
          placeholder={"Write your story…"}
          value={this.state.value}
          onChange={this.handleChange}
          schema={this.state.schema}
          renderNode={renderNode}
          renderMark={renderMark}
        />
      </div>,
      <div key="Menu">Menu</div>
    ]
  }
}
