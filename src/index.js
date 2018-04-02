//
// `<FrenchPress />` component,
// "☕ A better editorial experience with React.js and Slate."
//
// tools
import React from "react"
import { Editor } from "slate-react"
import { Value } from "slate"
import getOffsets from "positions"
import localForage from "localforage"
import "localforage-getitems"
//
// render functions responsible for setting rules on how to render and
// parse contnet
import { schema } from "./schema"
import { renderNode, renderMark } from "./render"
//
// utility functions
import {
  loadContent, // loads content from localStorage
  saveContent, // saves content into localStorage
  setDraftStatusHelper, // changes "Save..." status and creates callback
  focusEvents, // reacts to user input, drag, focus ect
  formatCommand, // performs user commands from hovering format menu
  menuPosition, // dynamically places format menu on screen depending on context
  imageButtonPosition, // dynamically places "Insert Image" button on new lines
  handleImageButton, // opens up file browser or intermediate component
  handleFileUpload // inserts image into editor and saves in browser's DB
} from "./utils"
//
// a custom set of Slate plugins that could be extended by user
import { plugins } from "./plugins"
//
// constants & defaults
import { PLACEHOLDER_TEXT, PICTURE_ACCEPTED_UPLOAD_MIME } from "./constants"
//
// control components
import FormatMenu from "./components/FormatMenu"
import DefaultImageButton from "./components/ImageButton"
//
// main component export
export class FrenchPress extends React.PureComponent {
  //
  // initializing component state
  constructor(props) {
    super(props)
    this.state = {
      value: Value.fromJSON(loadContent()), // this is the document data
      schema, // schema is the prescription on how to render document data
      //
      // track carriage position inside editor
      cursorContext: {
        newLine: false, // carriage is inside a new blank paragraph
        //
        // pixel location of the block where user carriage is, relative to editor
        parentBlockOffsets: { top: 0, left: 0 }
      },
      dragOver: false, // user is dragging something over the editor
      editorFocus: false, // editor is in focus
      //
      // user can define a <pictureDocketNode /> which is a component that may
      // show up after they click "Insert Image" button; by default it's skipped,
      // however, in some cases it may be useful to display some image suggestions
      // that user can insert without having to upload new ones; this
      // action is skipped if the user is inserting an image via drag & drop
      pictureDocketNode: undefined
    }
    //
    // concatenated pre-defined Slate plugin array with user's selection of
    // Slate plugins
    console.log(props)
    this.slatePlugins =
      props.slatePlugins && props.slatePlugins.length > 0
        ? [].concat.apply([], [plugins, props.slatePlugins])
        : plugins
    //
  }
  componentDidMount = () => {
    //
    // french-press-editor stores images in browser's database for use offline,
    // however, this may take up way too much space after a while and should be
    // treated with care; deleting images from database when they are removed
    // from editor by user is not a good option since the user may want to undo
    // delete, but if the image is gone from DB they can't restore it;
    // this script typically runs after the component was freshly mounted
    // and there are no undo's available in the history - it runs through
    // entire document and matches DB entries against images within the doc,
    // it then cleans images from DB which have not been found in the doc
    if (!this.slateEditor.state.value.hasUndos) {
      //
      // find all used image keys in the document
      const contentImageKeys = this.slateEditor.state.value
        .toJSON()
        .document.nodes.filter(node => !!(node.data && node.data.key))
        .map(node => node.data.key)
      //
      // find all recorded images in browser's database
      localForage.getItems().then(storedImageKeys => {
        let unusedImageKeys = []
        //
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
        //
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
    //
    // initialize format menu position (via user text selection) on component mount
    menuPosition(this)
    //
    // return Slate Editor component ref to the props API for the developer
    this.props.editorRef && this.props.editorRef(this.slateEditor)
  }
  //
  // update format menu position (via user text selection)
  componentDidUpdate = () => menuPosition(this)
  //
  // track user interactions with editor in component state;
  // note that due to Slate editor's design only the default React state
  // management works out of the box; Redux implementation will require
  // additional work
  handleChange = ({ value }) => {
    this.setState({ value })
    //
    // this script tracks user's carriage position inside empty text blocks
    // in order to display "Insert Image" button
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
    //
    // `callbackStatus()` function sends messages regarding the editor's
    // save status for the content, i.e.: "ok", "pending" that could be further
    // interpreted as "Saving...", "Saved." - or any copy of your choice
    this.props.callbackStatus &&
      this.props.callbackStatus(setDraftStatusHelper())
    //
    // below function performs the actual save into localStorage
    saveContent(document, value, this.props.callbackStatus)
  }
  //
  // respond to user clicking/tapping "Insert Image" button that appears
  // on the new empty line of every paragraph
  handleImageButton = event => handleImageButton(event, this)
  //
  // this function uses the <input /> file handler and inserts user's
  // selected image from their device into the document
  handleFileUpload = event => handleFileUpload(event, this)
  //
  // this function prevents unexpected propagations on the components which
  // are part of the editor
  handleClickPropagation = event => event.stopPropagation()
  //
  // register user's dragOver event in component state
  handleDragOver = () => {
    this.setState({
      dragOver: true
    })
  }
  //
  // register the end of user's dragOver event in component state
  handleDragEnd = () => {
    this.setState({
      dragOver: false
    })
  }
  //
  // store reference for the format menu DOM object for future use
  menuRef = menu => {
    this.menu = menu
  }
  //
  // perorm user commands from within the format menu
  formatCommand = type => formatCommand(type, this)
  //
  // render <FrenchPress /> compnent!
  render = () => {
    //
    // user interaction events are taken care of on each render
    focusEvents(this)
    //
    // image upload button can be defined or created by user,
    // however it must follow the ./components/ImageButton.js patterns
    const ImageButton =
      (this.props.components && this.props.components.ImageButton) ||
      DefaultImageButton
    const ImageButtonLabel =
      this.props.controls && this.props.controls.UploadImage
        ? this.props.controls.UploadImage
        : props => <span>Upload Image</span>
    //
    // return the composite component
    return [
      <div style={{ position: "relative" }} key="Editor">
        <ImageButton
          // this button follows user cursor and appears on empty lines of text
          //
          style={{
            top: this.state.cursorContext
              ? this.state.cursorContext.parentBlockOffsets.top
              : 0,
            display:
              this.state.cursorContext.newLine &&
              (this.props.components && this.props.components.Picture)
                ? "block"
                : "none",
            opacity: this.state.editorFocus ? "1" : "0"
          }}
          click={this.handleImageButton}
        >
          <ImageButtonLabel />
        </ImageButton>
        <Editor
          // this is the Slate editor component that renders user input
          //
          // props defineable by user
          placeholder={this.props.placeholder || PLACEHOLDER_TEXT}
          options={{
            ...this.props.options,
            imagePlaceholder:
              (this.props.options && this.props.options.imagePlaceholder) ||
              "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
            domain: (this.props.options && this.props.options.domain) || ""
          }}
          components={this.props.components}
          callbackError={this.props.callbackError}
          plugins={this.slatePlugins}
          //
          // state props
          value={this.state.value}
          onChange={this.handleChange}
          onClick={this.handleClickPropagation}
          //
          // structure/render defining props
          schema={this.state.schema}
          renderNode={renderNode}
          renderMark={renderMark}
          //
          // html element-related props
          style={{
            minHeight: "28em",
            boxShadow: this.state.editorFocus
              ? "1px 1px 0 0 rgba(44,44,44,.1)"
              : "",
            background: this.state.dragOver ? "rgba(44,44,44,.075)" : ""
          }}
          ref={input => (this.slateEditor = input)}
          fileInputRef={this.fileInput}
          //
        />
        <input
          // this is an input element that pops up file browser dialogue
          //
          type="file"
          accept={PICTURE_ACCEPTED_UPLOAD_MIME.toString()}
          style={{ display: "none" }}
          onChange={this.handleFileUpload}
          ref={input => (this.fileInput = input)}
        />
      </div>,
      <FormatMenu
        // this is a menu that follows selection and lets user format thext,
        // add/remove heading status, links and quotes
        //
        key="Menu"
        menuRef={this.menuRef}
        onChange={this.handleChange}
        value={this.state.value}
        formatCommand={this.formatCommand}
        style={{ display: this.state.editorFocus ? "block" : "none" }}
        //
        // control labels can be defined by user
        controls={this.props.controls}
      />
    ]
  }
}
