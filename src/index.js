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
  imageButtonPosition
  // handleImageButton
} from "./utils"

// plugins
import { plugins } from "./plugins"

// constants
import { PLACEHOLDER_TEXT } from "./constants"

// components
import FormatMenu from "./components/FormatMenu"

let slatePlugins = plugins
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
    this.slatePlugins =
      props.slatePlugins.length > 0
        ? plugins.concat(props.slatePlugins)
        : plugins
  }

  componentDidMount = () => {
    // clean up browser database of stored images
    if (!this.slateEditor.state.value.hasUndos) {
      // find all used image keys in the document
      const contentImageKeys = this.slateEditor.state.value
        .toJSON()
        .document.nodes.filter(node => !!(node.data && node.data.key))
        .map(node => node.data.key)
      // find all recorded images in browser's database
      localForage.getItems().then(storedImageKeys => {
        let unusedImageKeys = []

        // create an array of unused image keys
        Object.keys(storedImageKeys).forEach((storedKey, index) => {
          let unused = true
          contentImageKeys.forEach(usedKey => {
            if (storedKey === usedKey) {
              unused = false
            }
          })
          unused && unusedImageKeys.push(storedKey)
        })

        // go through all unused keys and remove them from database
        unusedImageKeys.forEach((imageKey, index) => {
          localForage.removeItem(imageKey)
        })
        unusedImageKeys.length > 0 &&
          console.log(
            `Removed ${
              unusedImageKeys.length
            } unused image(s) from browser's database.`
          )
      })
    }

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

  handleBlur = () => {}
  handleFocus = () => {}
  handleDragOver = () => {
    this.setState({
      dragOver: true
    })
  }
  handleDragEnd = () => {
    this.setState({
      dragOver: false
    })
  }

  handleClickPropagation = event => {
    event.stopPropagation()
  }

  render = () => {
    focusEvents(this)
    return [
      <div style={{ position: "relative" }} key="Editor">
        <Editor
          plugins={this.slatePlugins}
          placeholder={PLACEHOLDER_TEXT}
          value={this.state.value}
          onChange={this.handleChange}
          onClick={this.handleClickPropagation}
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
          options={this.props.options}
          components={this.props.components}
          callbackError={this.props.callbackError}
        />
      </div>,
      <FormatMenu
        key="Menu"
        menuRef={this.menuRef}
        onChange={this.handleChange}
        value={this.state.value}
        formatCommand={this.formatCommand}
        style={{ display: this.state.editorFocus ? "block" : "none" }}
        controls={this.props.controls}
      />
    ]
  }
}
