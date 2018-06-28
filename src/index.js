import "localforage-getitems";

import { Editor } from "slate-react";
import { Value } from "slate";
import React from "react";
import getOffsets from "positions";
import localForage from "localforage";

import { PLACEHOLDER_TEXT, PICTURE_ACCEPTED_UPLOAD_MIME } from "./constants";
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
} from "./utils";
import { plugins } from "./plugins";
import { renderNode, renderMark } from "./render";
import { schema } from "./schema";
import DefaultImageButton from "./components/controls/ImageButton";
import FormatMenu from "./components/controls/FormatMenu";

/**
 * Editor component. Import this component and pass your props.
 * @module FrenchPress
 * @prop {String} placeholder Placeholder text that's displayed inside empty editor.
 * @prop {Object} controls You can pass pure React component functions here to render labels for the following controls: `MakeHeader` (button that converts the text block into a header), `CancelHeader` (button that converts header block back into paragraph), `MakeQuote` (button that converts text block into a quote), `MakeLink` (button that lets user add a link URL to selected text), `MakeBold` (button that marks selected text as bold (and the reverse)), `MakeItalic` (button that marks selected text as italic (and the reverse)), and `UploadImage` (button label for image upload control). For images, SVG animations, or whatever else you may fancy.
 * @prop {Object} options Here you can specify your app's domain address, a placeholder image, and a maximum image size. `domain` key helps rendering links better; for example, absolute links like `domain.com/page` can be automatically converted into `/page`. By default an image placeholder is a grey pixel, however, you can specify your own (note that user will rarely ever see it). Maximum upload image size in megabytes is specified as an integer value for `imageMaxSize` key.
 * @prop {Object} components This prop accepts three possible components (as values for the following keys): `Picture`, `PictureDocket`, and `ImageButton`. `Picture` component renders images inside the document; you can provide your own, however, it's recommended that you start with the default component. `PictureDocket` component can be rendered when the user clicks "Insert Image" button instead of straight-up opening a file dialogue box; this may give you a chance to give the user "recommended" images to work with, however, this is an advanced case and isn't required. You can provide your own "Insert Image" button component(`ImageButton`), however, it's not required; if you'd like to do so, please have a  look at the default component to see how to build one properly. If you simply want to change the text or add an icon to the ImageButton component, see `controls` prop.
 * @prop {Array} slatePlugins `<FrenchPress />` component contains a number of Slate plugins customized for a specific user experience; you may add your own plugins here as well should you want to extend them.
 * @prop {Function} callbackStatus This prop will call a function with a parameter that specifies editor's localStorage save status (provides "ok" or "pending").
 * @prop {Function} callbackError This prop will call a function with error name and additional info that you may like to display within your own dialogue box or interface; i.e.: "Image is too large!" (provides `error` and `reason` strings parameters).
 * @prop {Function} editorRef Returns Slate Editor ref once it mounts. This is useful if you want to set events or manipulate the DOM of the `<Editor />` component.
 */
export class FrenchPress extends React.PureComponent {
  constructor(props) {
    super(props);
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
    };

    /**
     * Chains all Slate plugins into a single array to be consumed by Editor.
     * @var slatePlugins
     */
    this.slatePlugins =
      props.slatePlugins && props.slatePlugins.length > 0
        ? [].concat.apply([], [plugins, props.slatePlugins])
        : plugins;
  }

  /**
   * `french-press-editor` stores images in browser's database for use offline, however, this may take up way too much space after a while and should be treated with care. Deleting images from database when they are removed from editor by user is not a good option since the user may want to undo delete, but if the image is gone from DB they can't restore it. This script typically runs after the component was freshly mounted and there are no undo's available in the history - it runs through entire document and matches DB entries against images within the doc, it then cleans images from DB which have not been found in the doc.
   * @function componentDidMount
   */
  componentDidMount = () => {
    if (
      this.slateEditor &&
      this.slateEditor.state &&
      !this.slateEditor.state.value.hasUndos
    ) {
      /**
       * Finds all used image keys in the document.
       * @const contentImageKeys
       */
      const contentImageKeys = this.slateEditor.state.value
        .toJSON()
        .document.nodes.filter(node => !!(node.data && node.data.key))
        .map(node => node.data.key);

      localForage.getItems().then(storedImageKeys => {
        /**
         * Creates a list of image keys in the database which aren't part of the content.
         * @var unusedImageKeys
         */
        let unusedImageKeys = [];
        Object.keys(storedImageKeys).forEach((storedKey, index) => {
          let unused = true;
          contentImageKeys.forEach(usedKey => {
            if (storedKey === usedKey) {
              unused = false;
            }
          });
          unused && unusedImageKeys.push(storedKey);
        });
        unusedImageKeys.forEach((imageKey, index) => {
          localForage.removeItem(imageKey);
        });
        unusedImageKeys.length > 0 &&
          console.log(
            `Removed ${
              unusedImageKeys.length
            } unused image(s) from browser's database.`
          );
      });
    }
    menuPosition(this);
    this.props.editorRef && this.props.editorRef(this.slateEditor);
  };

  componentDidUpdate = () => menuPosition(this);

  /**
   * Tracks user interactions with editor in component state. Note that due to Slate Editor's design only the default React state management works out of the box.
   * @function handleChange
   * @param {value}
   */
  handleChange = ({ value }) => {
    this.setState({ value });

    /**
     * Tracks user's carriage position inside empty text blocks in order to display "Insert Image" button.
     * @function cursorContextDelay
     */
    const cursorContextDelay = setTimeout(() => {
      const nodeKey = value.focusBlock.key;
      const block = window.document.querySelector(`[data-key="${nodeKey}"]`);
      this.setState({
        editorFocus: value.isFocused
      });
      imageButtonPosition(
        value,
        block ? getOffsets(block, "top left", block, "top left") : {},
        this
      );
      clearTimeout(cursorContextDelay);
    }, 300);

    this.props.callbackStatus &&
      this.props.callbackStatus(setDraftStatusHelper());
    saveContent(document, value, this.props.callbackStatus);
  };

  /**
   * Respond to user clicking/tapping "Insert Image" button that appears on the new empty line of every paragraph.
   * @function handleImageButton
   * @param event
   */
  handleImageButton = event => handleImageButton(event, this);

  /**
   * Use the <input /> file handler and inserts user's selected image from their device into the document.
   * @function handleFileUpload
   * @param event
   */
  handleFileUpload = event => handleFileUpload(event, this);

  /**
   * Prevents unexpected propagations on the components which are part of the editor.
   * @function handleClickPropagation
   * @param event
   */
  handleClickPropagation = event => event.stopPropagation();

  /**
   * Registers user's dragOver event in component state
   * @function handleDragOver
   */
  handleDragOver = () => {
    this.setState({
      dragOver: true
    });
  };

  /**
   * Registers the end of user's dragOver event in component state.
   * @function handleDragEnd
   */
  handleDragEnd = () => {
    this.setState({
      dragOver: false
    });
  };

  /**
   * Stores the reference for the format menu DOM object for future use.
   * @function menuRef
   * @param menu
   */
  menuRef = menu => {
    this.menu = menu;
  };

  /**
   * Perform user commands from within the format menu
   * @function formatCommand
   * @param type
   */
  formatCommand = type => formatCommand(type, this);

  render = () => {
    focusEvents(this);

    /**
     * Image upload button (prop) can be defined or created by user.
     * @constant ImageButton
     */
    const ImageButton =
      (this.props.components && this.props.components.ImageButton) ||
      DefaultImageButton;

    /**
     * Defines component label for image button.
     * @const ImageButtonLabel
     */
    const ImageButtonLabel =
      this.props.controls && this.props.controls.UploadImage
        ? this.props.controls.UploadImage
        : props => <span>Upload Image</span>;

    return [
      <div style={{ position: "relative" }} key="Editor">
        <ImageButton
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
          fileInputRef={this.fileInput}
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
    ];
  };
}
