// tools
import throttle from "lodash/throttle"

// constants
import { DEFAULT_EDITOR_STATE } from "./constants"

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
export const storeHeaderState = header => {
  const headerState = JSON.stringify(header)
  localStorage.setItem("composer-header-state", headerState)
  //console.log(header.title);
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
export const saveHeader = throttle(header => storeHeaderState(header), 3000)
