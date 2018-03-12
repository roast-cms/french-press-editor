//
// A plugin that lets user drag and drop images into the document
// (which then stores them in the browser database as files).
//
// tools
import localForage from "localforage"
import uuidv1 from "uuid/v1"
import { forceImageRestrictions } from "../../utils"
import InsertImages from "@roast-cms/slate-drop-or-paste-images"
//
// a plugin for inserting images on drag & drop
export const images = [
  InsertImages({
    insertImage: (transform, file, editor) => {
      return forceImageRestrictions(
        file.size,
        file.type,
        editor.props.options.imageMaxSize
      )
        .then(() => {
          //
          // generate unique ID for image file
          const key = uuidv1()
          //
          // store image file in browser database
          localForage.setItem(key, file)
          //
          // insert image block into document
          return transform.insertBlock({
            type: "image",
            isVoid: true,
            data: {
              file,
              key,
              src: editor.props.options.imagePlaceholder
            }
          })
        })
        .catch(reason => {
          editor.props.callbackError("insert_image", reason)
        })
    }
  })
]
