import InsertImages from "slate-drop-or-paste-images";
import localForage from "localforage";
import uuidv1 from "uuid/v1";

import { forceImageRestrictions } from "../utils";

/**
 * A plugin that lets user drag and drop images into the document (which then stores them in the browser database as files).
 * @module images
 */
export const images = [
  InsertImages({
    insertImage: (transform, file, editor) => {
      return forceImageRestrictions(
        file.size,
        file.type,
        editor.props.options.imageMaxSize
      )
        .then(() => {

          /**
           * Unique ID for inserted image file.
           * @constant key
           */
          const key = uuidv1();

          /**
           * Stores image file in browser database.
           * @function localForage
           */
          localForage.setItem(key, file);

          /**
           * Inserts image block into document.
           * @function transform
           */
          return transform.insertBlock({
            type: "image",
            isVoid: true,
            data: {
              file,
              key,
              src: editor.props.options.imagePlaceholder
            }
          });
        })
        .catch(reason => {
          editor.props.callbackError("insert_image", reason);
        });
    }
  })
];
