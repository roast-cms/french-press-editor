// tools
import throttle from "lodash/throttle"
import { fixHangingSelection } from "../HACKS"

// constants
import { DEFAULT_EDITOR_STATE } from "../constants"
import { PICTURE_ACCEPTED_UPLOAD_MIME } from "../constants"


// functions that load content from localStorage
export const loadContent = () => {
  let local = localStorage.getItem("composer-content-state")
  return local ? JSON.parse(local) : DEFAULT_EDITOR_STATE
}
export const loadTextContent = () => {
  return localStorage.getItem("composer-content-text") || ""
}

// functions that store content onto localStorage
export const storeContentState = json => {
  const contentState = JSON.stringify(json)
  localStorage.setItem("composer-content-state", contentState)
}
export const saveContent = throttle(
  (document, state, callbackStatus) => {
    storeContentState(state.toJSON())
    // save text version
    localStorage.setItem("composer-content-text", state.document.text)
    // save completed status
    callbackStatus && callbackStatus("ok")
  },
  3000
)
// intermediate status before actual saves
export const setDraftStatusHelper = callbackStatus => {
  callbackStatus && callbackStatus("pending")
}

// focus events
export const focusEvents = _this => {
  // highlight potential drop target when the draggable element enters it
  document.addEventListener(
    "dragover",
    event => {
      event.preventDefault()
      if (_this.state.dragOver) return
      const delayDragEvent = setTimeout(() => {
        _this.handleDragOver()
        clearTimeout(delayDragEvent)
      }, 100)
    },
    false
  )
  document.addEventListener(
    "drop",
    event => {
      // event.preventDefault()
      if (!_this.state.dragOver) return
      const delayDragEvent = setTimeout(() => {
        _this.handleDragEnd()
        clearTimeout(delayDragEvent)
      }, 100)
    },
    false
  )

  // blur editor on Esc (remove highlights and guides for preview)
  document.addEventListener(
    "keydown",
    event => {
      if (event.keyCode === 27 && _this.slateEditor) {
        _this.slateEditor.blur()
      }
    },
    false
  )
}

// formate menu commands
export const menuPosition = _this => {
  const { value } = _this.state
  const menu = _this.menu

  fixHangingSelection(_this, value.change())

  if (!menu) return
  if (window.getSelection().rangeCount <= 0) return
  const selection = window.getSelection()
  const range = selection.getRangeAt(0)
  const rect = range.getBoundingClientRect()
  if (value.isBlurred || value.isEmpty) {
    menu.style.display = ""
    return
  }
  menu.style.display = "block"
  const leftOffset =
    rect.left + window.scrollX - menu.offsetWidth / 2 + rect.width / 2
  const topOffset = rect.top + window.scrollY - menu.offsetHeight + 3
  menu.style.top = `${topOffset}px`
  menu.style.left = `${leftOffset >= 0 ? leftOffset : 5}px`

  // devices with touch screens will have edit menu considerably above the
  // selected text to give way to the native hover menu
  "ontouchstart" in document.documentElement
    ? menu.classList.add("touch")
    : menu.classList.remove("touch")
}

//
export const addLink = (value, returnType = "value") => {
  const href = window.prompt("Enter the URL for the link:")

  if (returnType === "value") {
    if (!href) return value.change().unwrapInline("link")
    return value.change().wrapInline({
      type: "link",
      data: { href }
    })
  } else if (returnType === "data") return { href }
}
export const formatCommand = (type, _this) => {
  const { value } = _this.state
  let resolvedState

  switch (type) {
    case "undo_heading":
      resolvedState = value.change().setBlocks({ type: "paragraph" })
      _this.setState({
        value: resolvedState.value
      })
      break
    case "make_heading":
      resolvedState = value
        .change()
        .unwrapInline("link")
        .value.change()
        .removeMark("bold")
        .value.change()
        .removeMark("italic")
        .value.change()
        .setBlocks({ type: "heading" })
      _this.setState({
        value: resolvedState.value
      })
      break
    case "make_quote":
      resolvedState = value
        .change()
        .unwrapInline("link")
        .value.change()
        .removeMark("bold")
        .value.change()
        .removeMark("italic")
        .value.change()
        .setBlocks({ type: "quote" })
      _this.setState({
        value: resolvedState.value
      })
      break
    case "toggle_bold":
      resolvedState = value.change().toggleMark({ type: "bold" })
      _this.setState({
        value: resolvedState.value
      })
      break
    case "toggle_italic":
      resolvedState = value.change().toggleMark({ type: "italic" })
      _this.setState({
        value: resolvedState.value
      })
      break
    case "toggle_link":
      const hasLinks = value.inlines.some(inline => inline.type === "link")
      if (hasLinks) resolvedState = value.change().unwrapInline("link")
      else resolvedState = addLink(value)
      _this.setState({
        value: resolvedState.value
      })
      break
    default:
      return false
  }
}


// "Add Image" button functions:
export const imageButtonPosition = (value, parentOffsets, _this) => {
  const { focusBlock } = value
  if (!focusBlock) return
  if (
    focusBlock.type !== "paragraph" &&
    focusBlock.type !== "heading" &&
    focusBlock.type !== "image"
  )
    return
  const cursorContext = {
    firstEmptyLine: value.document.isEmpty && value.document.nodes.size === 1,
    // if user is focusing on image, "Add Image" button should disappear
    newLine: focusBlock.type === "image" ? false : value.focusBlock.isEmpty,
    parentBlockOffsets: parentOffsets
  }
  _this.setState({ cursorContext })
}

// export const handleImageButton = (event, _this) => {
//   if (!event) return
//   event.preventDefault()
//   event.stopPropagation()
//
//   const activeBlockKey = _this.state.value.focusBlock.key
//   const resolvedState = _this.state.value
//     .change({ save: false })
//     .insertBlock({
//       type: "docket",
//       isVoid: true
//     })
//     .value.change({ save: false })
//     .removeNodeByKey(activeBlockKey)
//   _this.setState({
//     value: resolvedState.value,
//     cursorContext: { ..._this.state.cursorContext, newLine: false }
//   })
// }

// image size limit for user uploads
export const forceImageRestrictions = (size, type, max = 10) => {
  let correctFileType = false
  PICTURE_ACCEPTED_UPLOAD_MIME.forEach(acceptedFiletype => {
    if (acceptedFiletype === type) correctFileType = true
  })
  return new Promise((resolve, reject) => {
    if (size / 1000000 <= max && correctFileType) resolve()
    else reject()
  })
}
