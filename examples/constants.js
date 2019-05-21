import {Sugar} from "@roast-cms/react-sugar-styled"

export const EXAMPLE_THEME = Sugar({
  //
  // you can "theme" your editor components with react-sugar-styled
  // theming dictionary API
  //
  color_brand: "rgb(132,50,72)",
  //
  font_heading: "'Yanone Kaffeesatz', sans-serif",
  font_heading_weight: 400,
  //
  font_body: "'Rajdhani', sans-serif",
  //
  size_base: 20,
  size_column_medium: 700,
  size_column_large: 900,
  size_block_spacing: 0.75,
  //
  effects_border_radius: 0.75,
  //
  // for detailed docs on how to customize buttons' theme please refer to
  // the guide on https://github.com/roast-cms/react-sugar-styled
  // - it is a themeing dictionary used with Styled Components
  //
})

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
            "https://instagram.fyvr3-1.fna.fbcdn.net/vp/08c7b82dfdb7bdbac00bfac0afd49dd7/5C233865/t51.2885-15/e35/29740602_208947276504723_8552082654378328064_n.jpg",
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
