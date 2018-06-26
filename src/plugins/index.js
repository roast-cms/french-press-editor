import { Paste } from "./paste-html"
import { chars } from "./collection-chars"
import { header } from "./collection-header"
import { hotkeys } from "./collection-hotkeys"
import { hr } from "./collection-hr"
import { html } from "../rules"
import { images } from "./collection-images"
import { quote } from "./collection-quote"

/**
 * A concatenation of all plugins required to run `french-press-editor` into a single array.
 * @module plugins
 */
export const plugins = [].concat.apply(
  [],
  [[Paste({ html })], chars, header, hotkeys, hr, images, quote]
)
