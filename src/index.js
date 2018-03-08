// tools
import React from "react"
import { Editor } from "slate-react"
import { Value } from "slate"
import getOffsets from "positions"
import localForage from "localforage"
import "localforage-getitems"

import { schema } from "./schema"
import { renderNode, renderMark } from "./render"
import {loadContent, saveContent,
setDraftStatusHelper} from "./utils"

import { PLACEHOLDER_TEXT } from "./constants"

export class FrenchPress extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      value: Value.fromJSON(loadContent()),
      schema
    }
  }

  handleChange = ({ value }) => {
    this.setState({ value })
    setDraftStatusHelper()
    saveContent(document, value, this.props.callbackStatus)
  }

  render = () => {
    return [
      <div style={{ position: "relative" }} key="Editor">
        <Editor
          placeholder={PLACEHOLDER_TEXT}
          value={this.state.value}
          onChange={this.handleChange}
          schema={this.state.schema}
          renderNode={renderNode}
          renderMark={renderMark}
          style={{
            minHeight: "28em",
            boxShadow: this.state.editorFocus
              ? "1px 1px 0 0 rgba(44,44,44,.1)"
              : "",
            background: this.state.dragOver ? "rgba(44,44,44,.075)" : ""
          }}
          ref={input => (this.slateEditor = input)}
        />
      </div>,
      <div key="Menu">Menu</div>
    ]
  }
}
