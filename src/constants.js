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

export const PLACEHOLDER_TEXT = "Write your story…"

// accepted upload file types
export const PICTURE_ACCEPTED_UPLOAD_MIME = ["image/png", "image/jpeg"]
// write the above in human language for warnign boxes
export const PICTURE_ACCEPTED_UPLOAD_MIME_HUMAN = "PNG or JPEG"
