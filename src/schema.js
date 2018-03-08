import { Block } from "slate"

// return
export const schema = {
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
          "link"
        ]
      }
    ],
    last: { types: ["paragraph"] },
    normalize: (change, reason, { node, child }) => {
      switch (reason) {
        // case "child_type_invalid": {
        //   change.setNodeByKey(child.key, { type: "paragraph" })
        //   return
        // }
        case "last_child_type_invalid": {
          const paragraph = Block.create("paragraph")
          return change.insertNodeByKey(node.key, node.nodes.size, paragraph)
        }
        default:
          return null
      }
    }
  },
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
