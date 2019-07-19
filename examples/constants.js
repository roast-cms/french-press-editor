
export const EXAMPLE_THEME = {

}

export const EXAMPLE_VALUE = {
  object: "value",
  document: {
    object: "document",
    data: {},
    nodes: [
      {
        object: "block",
        type: "paragraph",
        isVoid: false,
        data: {},
        nodes: [
          {
            object: "text",
            leaves: [{object: "leaf", text: "Paragraph test.", marks: []}],
          },
        ],
      },
      {
        object: "block",
        type: "paragraph",
        isVoid: false,
        data: {},
        nodes: [
          {
            object: "text",
            leaves: [
              {
                object: "leaf",
                text: "Inline",
                marks: [{object: "mark", type: "italic", data: {}}],
              },
              {object: "leaf", text: " ", marks: []},
              {
                object: "leaf",
                text: "marks",
                marks: [{object: "mark", type: "bold", data: {}}],
              },
              {object: "leaf", text: " ", marks: []},
              {
                object: "leaf",
                text: "test",
                marks: [
                  {object: "mark", type: "bold", data: {}},
                  {object: "mark", type: "italic", data: {}},
                ],
              },
              {object: "leaf", text: ".", marks: []},
            ],
          },
        ],
      },
      {
        object: "block",
        type: "paragraph",
        isVoid: false,
        data: {},
        nodes: [
          {
            object: "text",
            leaves: [{object: "leaf", text: "Links ", marks: []}],
          },
          {
            object: "inline",
            type: "link",
            isVoid: false,
            data: {href: "https://github.com/roast-cms/french-press-editor"},
            nodes: [
              {
                object: "text",
                leaves: [{object: "leaf", text: "test", marks: []}],
              },
            ],
          },
          {object: "text", leaves: [{object: "leaf", text: ".", marks: []}]},
        ],
      },
      {
        object: "block",
        type: "heading",
        isVoid: false,
        data: {},
        nodes: [
          {
            object: "text",
            leaves: [{object: "leaf", text: "Header test.", marks: []}],
          },
        ],
      },
      {
        object: "block",
        type: "quote",
        isVoid: false,
        data: {},
        nodes: [
          {
            object: "text",
            leaves: [{object: "leaf", text: "Quote test.", marks: []}],
          },
        ],
      },
      {
        object: "block",
        type: "image",
        isVoid: true,
        data: {
          src:
            "https://raw.githubusercontent.com/roast-cms/french-press-editor/develop/graphics/logo.gif",
        },
        nodes: [
          {object: "text", leaves: [{object: "leaf", text: "", marks: []}]},
        ],
      },
      {
        object: "block",
        type: "paragraph",
        isVoid: false,
        data: {},
        nodes: [
          {object: "text", leaves: [{object: "leaf", text: "", marks: []}]},
        ],
      },
    ],
  },
}
