import lscache from "lscache"
import throttle from "lodash/throttle"

import {DEFAULT_EDITOR_STATE} from "../constants/defaults"

/**
 * Loads stored Slate Value object from localStorage.
 * @module loadContent
 */
export const loadContent = () => {
  return lscache.get("composer-content-state") || DEFAULT_EDITOR_STATE
}

/**
 * Loads stored text version of user's document from localStorage.
 * @module loadTextContent
 */
export const loadTextContent = () => {
  return lscache.get("composer-content-text") || ""
}
//
// functions that store content onto localStorage

/**
 * Encodes ans tores Slate Value object in localStorage.
 * @module storeContentState
 * @param {Object} json
 */
export const storeContentState = json => {
  lscache.set("composer-content-state", json)
}

/**
 * Processes Slate Value object, as well as plain text document, stores in localStorage and returns save status - periodically.
 * @module saveContent
 * @param {Object} document Slate document.
 * @param {Object} state Slate state.
 * @param {Function} callbackStatus Callback function that returns save status.
 * @return {String}
 */
export const saveContent = throttle((document, state, callbackStatus) => {
  storeContentState(state.toJSON())
  lscache.set("composer-content-text", state.document.text)
  callbackStatus && callbackStatus("ok")
}, 3000)

/**
 * Sets intermedia status between saves.
 * @module setDraftStatusHelper
 * @return {String}
 */
export const setDraftStatusHelper = () => {
  return "pending"
}
