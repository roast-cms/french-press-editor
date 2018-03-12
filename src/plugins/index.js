//
// This is a concatenation of all plugin collections into a single array.
//
// paste-html plugin
import { html } from "../rules"
import { Paste } from "./paste-html"
//
// all other plugins
import { chars } from "./collections/chars"
import { header } from "./collections/header"
import { hotkeys } from "./collections/hotkeys"
import { hr } from "./collections/hr"
import { images } from "./collections/images"
import { quote } from "./collections/quote"
//
// assembled plugins array
export const plugins = [].concat.apply(
  [],
  [[Paste({ html })], chars, header, hotkeys, hr, images, quote]
)
