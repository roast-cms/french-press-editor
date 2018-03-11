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
  handleImageButton,
  handleFileUpload
} from "./utils"

// plugins
import { plugins } from "./plugins"

// constants
import { PLACEHOLDER_TEXT, PICTURE_ACCEPTED_UPLOAD_MIME } from "./constants"

// components
import FormatMenu from "./components/FormatMenu"
import DefaultImageButton from "./components/ImageButton"

const slatePlugins = plugins
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
      editorFocus: false,
      pictureDocketNode: undefined
    }
    this.slatePlugins =
      props.slatePlugins.length > 0
        ? [].contact.apply([], [plugins, props.slatePlugins])
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
            `Removed ${unusedImageKeys.length} unused image(s) from browser's database.`
          )
      })
    }
    // hover menu (below, onwards until `formatCommand()`)
    menuPosition(this)
  }
  componentDidUpdate = () => menuPosition(this)
  componentWillReceiveProps = nextProps => {
    // execute external functions when components props update
    if (!this.props.callbackPropsUpdate) return
    this.props.callbackPropsUpdate(this.props, nextProps)
  }
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

    this.props.callbackStatus(setDraftStatusHelper())
    saveContent(document, value, this.props.callbackStatus)
  }
  handleImageButton = event => handleImageButton(event, this)
  handleFileUpload = event => handleFileUpload(event, this)
  handleClickPropagation = event => {
    event.stopPropagation()
  }
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
  menuRef = menu => {
    this.menu = menu
  }
  formatCommand = type => formatCommand(type, this)
  render = () => {
    focusEvents(this)
    const ImageButton =
      (this.props.components && this.props.components.ImageButton) ||
      DefaultImageButton
    const ImageButtonLabel =
      this.props.controls && this.props.controls.UploadImage
        ? this.props.controls.UploadImage
        : props => <span>Upload Image</span>
    return [
      <div style={{ position: "relative" }} key="Editor">
        <ImageButton
          style={{
            top: this.state.cursorContext
              ? this.state.cursorContext.parentBlockOffsets.top
              : 0,
            display: this.state.cursorContext.newLine ? "block" : "none",
            opacity: this.state.editorFocus ? "1" : "0"
          }}
          onClick={this.handleImageButton}
        >
          <ImageButtonLabel />
        </ImageButton>
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
          options={{
            ...this.props.options,
            imagePlaceholder:
              this.props.options.imagePlaceholder ||
              "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
            domain: this.props.options.domain || ""
          }}
          components={this.props.components}
          fileInputRef={this.fileInput}
          callbackError={this.props.callbackError}
        />
        <input
          type="file"
          accept={PICTURE_ACCEPTED_UPLOAD_MIME.toString()}
          style={{ display: "none" }}
          onChange={this.handleFileUpload}
          ref={input => (this.fileInput = input)}
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

// convenience exports
export { Picture } from "./containers/Picture"
export { Wrapper } from "./components/Wrapper"
