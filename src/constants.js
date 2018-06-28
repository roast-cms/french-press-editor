/**
 * Default document structure for Slate editor; an empty document.
 * @constant DEFAULT_EDITOR_STATE
 */
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

/**
 * Dictionary list that transpiles HTML/DOM elements into Slate node types.
 * @constant BLOCK_TAGS
 */
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
/**
 * Dictionary list that transpiles HTML/DOM elements into Slate mark types.
 * @constant MARK_TAGS
 */
export const MARK_TAGS = {
  em: "italic",
  i: "italic",
  strong: "bold",
  b: "bold"
}

/**
 * Default placeholder text that appears in the Editor.
 * @constant PLACEHOLDER_TEXT
 */
export const PLACEHOLDER_TEXT = "Write your story…"

/**
 * Default accepted upload file types.
 * @constant PICTURE_ACCEPTED_UPLOAD_MIME
 */
export const PICTURE_ACCEPTED_UPLOAD_MIME = ["image/png", "image/jpeg"]

/**
 * Default accepted upload file types, written in human language.
 * @constant PICTURE_ACCEPTED_UPLOAD_MIME_HUMAN
 */
 export const PICTURE_ACCEPTED_UPLOAD_MIME_HUMAN = "PNG or JPEG"
