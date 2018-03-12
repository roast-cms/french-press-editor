//
// A structure that Slate follows to display document content.
//
// tools
import { Block } from "slate"
//
// schema is a set of rules that transform document structure and keep
// it normalized to a defined format
export const schema = {
  //
  // document-level prescription
  document: {
    //
    // acceptable nodes within editor document
    nodes: [
      {
        types: [
          "paragraph",
          "heading",
          "divider",
          "quote",
          "image",
          "docket",
          "link"
        ]
      }
    ],
    //
    // the following definition ensures that there's at least one empty
    // paragraph block that follows a void block (such as picture);
    // this is required to ensure that the user can continue adding content
    // without additional effort below uploaded images (otherwise they will
    // be forced to move the image up to free up a trailing paragraph space)
    last: { types: ["paragraph"] },
    normalize: (change, reason, { node, child }) => {
      switch (reason) {
        case "last_child_type_invalid": {
          const paragraph = Block.create("paragraph")
          return change.insertNodeByKey(node.key, node.nodes.size, paragraph)
        }
        default:
          return null
      }
    }
  },
  //
  // definitions for the block types and what they may contain within editor
  blocks: {
    link: {
      nodes: [{ objects: ["text"] }]
    },
    divider: {
      isVoid: true
    },
    image: {
      isVoid: true,
      data: {
        src: v => v
      }
    },
    docket: {
      isVoid: true
    }
  },
  //
  // inline node definitions
  inlines: {
    quote: {
      nodes: [{ types: ["text"] }]
    },
    paragraph: {
      nodes: [{ types: ["text", "link"] }]
    },
    heading: {
      nodes: [{ types: ["text"] }]
    }
  }
}
