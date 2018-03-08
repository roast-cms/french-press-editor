// tools
import React from "react"
import { Editor } from "slate-react"
import { Value } from "slate"
import getOffsets from "positions"
import localForage from "localforage"
import "localforage-getitems"

// functions
import { schema } from "./schema"
import { renderNode, renderMark } from "./render"
import {
  loadContent,
  saveContent,
  setDraftStatusHelper,
  focusEvents,
  formatCommand,
  menuPosition,
  imageButtonPosition,
  // handleImageButton
} from "./utils"

// constants
import { PLACEHOLDER_TEXT } from "./constants"

// components
import FormatMenu from "./components/FormatMenu"

export class FrenchPress extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      value: Value.fromJSON(loadContent()),
      schema,
      cursorContext: {
        newLine: false,
        parentBlockOffsets: { top: 0, left: 0 }
      },
      dragOver: false,
      editorFocus: false
    }
  }

  componentDidMount = () => {
    // hover menu (below, onwards until `formatCommand()`)
    menuPosition(this)
  }
  componentDidUpdate = () => menuPosition(this)

  handleChange = ({ value }) => {
    this.setState({ value })

    // add information about cursor positions
    const cursorContextDelay = setTimeout(() => {
      const nodeKey = value.focusBlock.key
      const block = window.document.querySelector(`[data-key="${nodeKey}"]`)
      this.setState({
        editorFocus: value.isFocused
      })
      imageButtonPosition(
        value,
        block ? getOffsets(block, "top left", block, "top left") : {},
        this
      )
      clearTimeout(cursorContextDelay)
    }, 300)

    // save content to localStorage
    setDraftStatusHelper()
    saveContent(document, value, this.props.callbackStatus)
  }

  menuRef = menu => {
    this.menu = menu
  }
  formatCommand = type => formatCommand(type, this)

  render = () => {
    focusEvents(this)
    console.log(this.state.editorFocus);
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
      <FormatMenu
        key="Menu"
        domain={this.props.domain}
        menuRef={this.menuRef}
        onChange={this.handleChange}
        value={this.state.value}
        formatCommand={this.formatCommand}
        style={{ display: this.state.editorFocus ? "block" : null }}
      />
    ]
  }
}
