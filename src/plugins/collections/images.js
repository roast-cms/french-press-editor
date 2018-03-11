import localForage from "localforage"
import uuidv1 from "uuid/v1"
import { forceImageRestrictions } from "../../utils"
import InsertImages from "@roast-cms/slate-drop-or-paste-images"


export const images = [
  InsertImages({
    insertImage: (transform, file, editor) => {
      return forceImageRestrictions(
        file.size,
        file.type,
        editor.props.options.imageMaxSize
      )
        .then(() => {
          console.log(file);
          const key = uuidv1()
          localForage.setItem(key, file)

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
