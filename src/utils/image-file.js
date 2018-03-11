import { forceImageRestrictions } from "./"
import uuidv1 from "uuid/v1"
import localForage from "localforage"

export const handleFileUpload = (event, _this, pictureDocketNode = null) => {
  const file = event.target.files[0]
  forceImageRestrictions(file.size, file.type, _this.props.options.imageMaxSize)
    .then(() => {
      const key = uuidv1()
      const editorProps = _this.slateEditor.props
      localForage.setItem(key, file)

      console.log(file);
      const resolvedState = editorProps.value
        .change()
        .insertBlock({
          type: "image",
          isVoid: true,
          data: { file, key, src: editorProps.options.imagePlaceholder }
        })
        // remove docket
        //.value.change()

      // remove picture docket from document if we have one
      //  pictureDocketNode && resolvedState.removeNodeByKey(node.key)
      window.requestAnimationFrame(() => {
      _this.handleChange(resolvedState)
    })

      // window.requestAnimationFrame(() => {
      //   editorProps.onChange(resolvedState)
      // })
    })
    .catch(reason => {
      _this.props.callbackError("insert_image", reason)
    })
}
