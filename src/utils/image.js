import isDataString from "valid-data-url"
import localForage from "localforage"
import {v1 as uuidv1} from "uuid"

import {PICTURE_ACCEPTED_UPLOAD_MIME} from "../constants/defaults"

/**
 * Converts file to base64 string
 * @function fileToBase64
 * @param {File}
 * @return {String}
 */
export const fileToBase64 = file => {
  return new Promise((resolve, reject) => {
    if (file instanceof Blob) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.addEventListener("load", () => {
        resolve(reader.result)
      })
      reader.addEventListener("error", error => {
        reject(error)
      })
    } else if (isDataString(file)) {
      resolve(file)
    } else
      reject({
        error: "TypeError: parameter must be a File/blob or a data-uri string.",
      })
  })
}

/**
 * Converts data-uri image to file/Blob
 * Source: https://stackoverflow.com/questions/4998908/convert-data-uri-to-file-then-append-to-formdata
 * @function base64ToBlob
 * @param {String}
 * @return {File}
 */
export const base64ToBlob = string => {
  if (string instanceof Blob) return string
  let byteString
  if (string.split(",")[0].indexOf("base64") >= 0)
    byteString = atob(string.split(",")[1])
  else byteString = unescape(string.split(",")[1])
  const mimeString = string
    .split(",")[0]
    .split(":")[1]
    .split(";")[0]
  let ia = new Uint8Array(byteString.length)
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }
  return new Blob([ia], {type: mimeString})
}

/**
 * Enforces image size and filetype.
 * @function forceImageRestrictions
 * @param {Int} size Size in bytes.
 * @param {Array} type Image memes accepted.
 * @param {Int} max Cut-off image size in megabytes.
 * @return {Promise}
 */
export const forceImageRestrictions = (size, type, max = 10) => {
  let correctFileType = false
  PICTURE_ACCEPTED_UPLOAD_MIME.forEach(acceptedFiletype => {
    if (acceptedFiletype === type) correctFileType = true
  })
  return new Promise((resolve, reject) => {
    if (size / 1000000 <= max && correctFileType) resolve()
    else {
      let message = size / 1000000 > max ? "size" : "mime"
      reject(message)
    }
  })
}

/**
 * Figures out the image button location and appearance, depending on user's carriage position within the editor and calls appropriate functions when the user clicks "Add Image" button.
 * @module imageButtonPosition
 * @param {Object} value Slate Editor Value.
 * @param {Object} parentOffsets Offset pixel values.
 */
export const imageButtonPosition = function(value, parentOffsets) {
  const {focusBlock} = value
  const hideImageButton = () =>
    this.setState({
      cursorContext: {...this.state.cursorContext, newLine: false},
    })
  if (!focusBlock) return
  if (
    focusBlock.type !== "paragraph" &&
    focusBlock.type !== "heading" &&
    focusBlock.type !== "image"
  ) {
    hideImageButton()
    return
  }
  if (
    window.getSelection().rangeCount !== 0 &&
    window.getSelection().getRangeAt(0).collapsed === false
  ) {
    hideImageButton()
    return
  }
  const cursorContext = {
    firstEmptyLine:
      value.document.text === "" && value.document.nodes.size === 1,
    newLine: focusBlock.type === "image" ? false : value.focusBlock.text === "",
    parentBlockOffsets: parentOffsets,
  }
  this.setState({cursorContext})
}

/**
 * Image button click action.
 * @module handleImageButton
 */
export const handleImageButton = function(event) {
  if (!event) return
  event.preventDefault()
  event.stopPropagation()
  /**
   * Timeout allows to paint the image button downstate before bringing up file upload dialogue or a docket component.
   * @function responseDelay
   */
  const responseDelay = setTimeout(() => {
    clearTimeout(responseDelay)
    if (!this.props.components.PictureDocket) {
      /**
       * If PictureDocket component isn't defined, brings up the dialogue to upload image file.
       * @function click
       */
      this.fileInput.click()
      return
    }
    //
    // insert docket block into editor if the PictureDocket
    // component is defiend

    /**
     * Inserts docket block into editor if the PictureDocket component is defiend.
     * @function insertBlock
     */
    const activeBlockKey = this.state.value.focusBlock.key
    const resolvedState = this.state.value
      .change({save: false})
      .insertBlock({
        type: "docket",
        isVoid: true,
      })
      .value.change({save: false})
      .removeNodeByKey(activeBlockKey)

    /**
     * Hides "Insert Image" button when docket is shown.
     * @function setState
     */
    this.setState(prevState => ({
      value: resolvedState.value,
      cursorContext: {...prevState.cursorContext, newLine: false},
    }))
  }, 50)
}

/**
 * Handles insertion of image file into the document and storing it in the browser's database.
 * @module handleFileUpload
 * @param {Event} event
 */
export const handleFileUpload = function(event) {
  const file = event.target.files[0]
  forceImageRestrictions(
    file.size,
    file.type,
    this.props.options &&
      this.props.options.imageMaxSize &&
      this.props.options.imageMaxSize
  )
    .then(() => {
      const key = uuidv1()
      const editorProps = this.slateEditor.props
      const block = {
        type: "image",
        isVoid: true,
        data: {file, key, src: editorProps.options.imagePlaceholder},
      }
      const docket = this.state.pictureDocketNode
      let resolvedState
      fileToBase64(file).then(string => localForage.setItem(key, string))

      /**
       * If PictureDocket component isn't defined, simply inserts the image into the document.
       * @function insertBlock
       * @param {Object} block
       */
      if (!docket) resolvedState = editorProps.value.change().insertBlock(block)
      /**
       * If PictureDocket component is defined, inserts the image into the document AND removes the docket from the doc.
       * @function insertBlock
       * @param {Object} block
       */ else
        resolvedState = editorProps.value
          .change()
          .insertBlock(block)
          .value.change()
          .removeNodeByKey(docket)

      window.requestAnimationFrame(() => {
        this.handleChange(resolvedState)
        docket && this.setState({pictureDocketNode: undefined})
      })
    })
    .catch(reason => {
      this.props.callbackError("insert_image", reason)
    })
}
