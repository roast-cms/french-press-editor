//
// Global defaults, some of which may be overwritten by user.
//
// this is the default structure for Slate editor; an empty document
export const DEFAULT_EDITOR_STATE = {
  document: {
    nodes: [
      {
        object: "block",
        type: "paragraph",
        nodes: [
          {
            object: "text",
            leaves: [
              {
                text: ""
              }
            ]
          }
        ]
      }
    ]
  }
}
//
// this is a dictionary list that transpiles HTML/DOM elements into
// slate node types and mark types
export const BLOCK_TAGS = {
  p: "paragraph",
  blockquote: "quote",
  hr: "divider",
  h1: "heading",
  h2: "heading",
  h3: "heading",
  h4: "heading",
  a: "link",
  img: "image"
}
export const MARK_TAGS = {
  em: "italic",
  i: "italic",
  strong: "bold",
  b: "bold"
}
//
// default placeholder text that appears in the editor
export const PLACEHOLDER_TEXT = "Write your story…"
//
// default accepted upload file types
export const PICTURE_ACCEPTED_UPLOAD_MIME = ["image/png", "image/jpeg"]
//
// default accepted upload file types, written in human language
export const PICTURE_ACCEPTED_UPLOAD_MIME_HUMAN = "PNG or JPEG"
