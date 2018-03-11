import { forceImageRestrictions } from "./"
import uuidv1 from "uuid/v1"
import localForage from "localforage"

export const handleFileUpload = (event, _this) => {
  const file = event.target.files[0]
  forceImageRestrictions(file.size, file.type, _this.props.options.imageMaxSize)
    .then(() => {
      const key = uuidv1()
      const editorProps = _this.slateEditor.props
      const block = {
        type: "image",
        isVoid: true,
        data: { file, key, src: editorProps.options.imagePlaceholder }
      }
      const docket = _this.state.pictureDocketNode
      let resolvedState
      localForage.setItem(key, file)

      if (!docket) resolvedState = editorProps.value.change().insertBlock(block)
      else
        resolvedState = editorProps.value
          .change()
          .insertBlock(block)
          // remove picture docket from document if we have one
          .value.change()
          .removeNodeByKey(docket)

      // execute change
      window.requestAnimationFrame(() => {
        _this.handleChange(resolvedState)
        docket && _this.setState({ pictureDocketNode: undefined })
      })
    })
    .catch(reason => {
      _this.props.callbackError("insert_image", reason)
    })
}