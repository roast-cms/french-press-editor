import {Block} from "slate"

/**
 * A set of rules that transform document structure and keep it normalized to a defined format.
 * @constant schema
 * @property {Array} nodes Acceptable nodes within editor document.
 * @property {Object} last Defines at least one empty paragraph block that follows a void block (such as picture); this is required to ensure that the user can continue adding content without additional effort below uploaded images (otherwise they will be forced to move the image up to free up a trailing paragraph space).
 */

export const SCHEMA = {
  document: {
    nodes: [
      {
        match: [
          {type: "paragraph"},
          {type: "heading"},
          {type: "divider"},
          {type: "quote"},
          {type: "image"},
          {type: "docket"},
          {type: "link"},
        ],
      },
    ],
    last: [{type: "quote"}, {type: "paragraph"}],
    normalize: (change, {code, node}) => {
      if (code === "last_child_type_invalid") {
        const paragraph = Block.create("paragraph")
        return change.insertNodeByKey(node.key, node.nodes.size, paragraph)
      } else return null
    },
  },
  blocks: {
    link: {
      match: {object: "text"},
    },
    divider: {
      isVoid: true,
    },
    image: {
      isVoid: true,
      data: {
        src: value => value,
      },
    },
    docket: {
      isVoid: true,
    },
    quote: {
      match: {object: "text"},
    },
    paragraph: {
      match: [{object: "text"}, {object: "link"}],
    },
    heading: {
      match: {object: "text"},
    },
  },
}
