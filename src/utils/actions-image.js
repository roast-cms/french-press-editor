import localForage from "localforage";
import uuidv1 from "uuid/v1";

import { PICTURE_ACCEPTED_UPLOAD_MIME } from "../constants";

/**
 * Enforces image size and filetype.
 * @function forceImageRestrictions
 * @param {Int} size Size in bytes.
 * @param {Array} type Image memes accepted.
 * @param {Int} max Cut-off image size in megabytes.
 * @return {Promise}
 */
const forceImageRestrictions = (size, type, max = 10) => {
  let correctFileType = false;
  PICTURE_ACCEPTED_UPLOAD_MIME.forEach(acceptedFiletype => {
    if (acceptedFiletype === type) correctFileType = true;
  });
  return new Promise((resolve, reject) => {
    if (size / 1000000 <= max && correctFileType) resolve();
    else {
      let message = size / 1000000 > max ? "size" : "mime";
      reject(message);
    }
  });
};

/**
 * Figures out the image button location and appearance, depending on user's carriage position within the editor and calls appropriate functions when the user clicks "Add Image" button.
 * @module imageButtonPosition
 * @param {Object} value Slate Editor Value.
 * @param {Object} parentOffsets Offset pixel values.
 * @param {Object} _this
 */
export const imageButtonPosition = (value, parentOffsets, _this) => {
  const { focusBlock } = value;
  const hideImageButton = () =>
    _this.setState({
      cursorContext: { ..._this.state.cursorContext, newLine: false }
    });
  if (!focusBlock) return;
  if (
    focusBlock.type !== "paragraph" &&
    focusBlock.type !== "heading" &&
    focusBlock.type !== "image"
  ) {
    hideImageButton();
    return;
  }
  if (
    window.getSelection().rangeCount !== 0 &&
    window.getSelection().getRangeAt(0).collapsed === false
  ) {
    hideImageButton();
    return;
  }
  const cursorContext = {
    firstEmptyLine: value.document.isEmpty && value.document.nodes.size === 1,
    newLine: focusBlock.type === "image" ? false : value.focusBlock.isEmpty,
    parentBlockOffsets: parentOffsets
  };
  _this.setState({ cursorContext });
};

/**
 * Image button click action.
 * @module handleImageButton
 */
export const handleImageButton = (event, _this) => {
  if (!event) return;
  event.preventDefault();
  event.stopPropagation();

  /**
   * Timeout allows to paint the image button downstate before bringing up file upload dialogue or a docket component.
   * @function responseDelay
   */
  const responseDelay = setTimeout(() => {
    clearTimeout(responseDelay);
    if (!_this.props.components.PictureDocket) {
      /**
       * If PictureDocket component isn't defined, brings up the dialogue to upload image file.
       * @function click
       */
      _this.fileInput.click();
      return;
    }
    //
    // insert docket block into editor if the PictureDocket
    // component is defiend

    /**
     * Inserts docket block into editor if the PictureDocket component is defiend.
     * @function insertBlock
     */
    const activeBlockKey = _this.state.value.focusBlock.key;
    const resolvedState = _this.state.value
      .change({ save: false })
      .insertBlock({
        type: "docket",
        isVoid: true
      })
      .value.change({ save: false })
      .removeNodeByKey(activeBlockKey);

    /**
     * Hides "Insert Image" button when docket is shown.
     * @function setState
     */
    _this.setState(prevState => ({
      value: resolvedState.value,
      cursorContext: { ...prevState.cursorContext, newLine: false }
    }));
  }, 50);
};

/**
 * Handles insertion of image file into the document and storing it in the browser's database.
 * @module handleFileUpload
 * @param {Event} event
 * @param {Object} _this
 */
export const handleFileUpload = (event, _this) => {
  const file = event.target.files[0];
  forceImageRestrictions(
    file.size,
    file.type,
    _this.props.options &&
      _this.props.options.imageMaxSize &&
      _this.props.options.imageMaxSize
  )
    .then(() => {
      const key = uuidv1();
      const editorProps = _this.slateEditor.props;
      const block = {
        type: "image",
        isVoid: true,
        data: { file, key, src: editorProps.options.imagePlaceholder }
      };
      const docket = _this.state.pictureDocketNode;
      let resolvedState;
      localForage.setItem(key, file);

      /**
       * If PictureDocket component isn't defined, simply inserts the image into the document.
       * @function insertBlock
       * @param {Object} block
       */
      if (!docket)
        resolvedState = editorProps.value.change().insertBlock(block);
      /**
       * If PictureDocket component is defined, inserts the image into the document AND removes the docket from the doc.
       * @function insertBlock
       * @param {Object} block
       */ else
        resolvedState = editorProps.value
          .change()
          .insertBlock(block)
          .value.change()
          .removeNodeByKey(docket);
      window.requestAnimationFrame(() => {
        _this.handleChange(resolvedState);
        docket && _this.setState({ pictureDocketNode: undefined });
      });
    })
    .catch(reason => {
      _this.props.callbackError("insert_image", reason);
    });
};