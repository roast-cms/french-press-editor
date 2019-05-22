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
        types: [
          "paragraph",
          "heading",
          "divider",
          "quote",
          "image",
          "docket",
          "link",
        ],
      },
    ],
    last: {types: ["paragraph", "quote"]},
    normalize: (change, reason, {node}) => {
      switch (reason) {
        case "last_child_type_invalid": {
          const paragraph = Block.create("paragraph")
          return change.insertNodeByKey(node.key, node.nodes.size, paragraph)
        }
        default:
          return null
      }

    },
  },
  blocks: {
    link: {
      nodes: [{objects: ["text"]}],
    },
    divider: {
      isVoid: true,
    },
    image: {
      isVoid: true,
      data: {
        src: value => value,
      },
      parent: [{object: "document"}],
      normalize: (change, {code, node}) => {
        if (code === "parent_object_invalid") {
          return change.unwrapBlockByKey(node.key)
        } else return null
      },
    },
    docket: {
      isVoid: true,
    },
  },
  inlines: {
    quote: {
      nodes: [{types: ["text"]}],
    },
    paragraph: {
      nodes: [{types: ["text", "link"]}],
    },
    heading: {
      nodes: [{types: ["text"]}],
    },
  },
}
