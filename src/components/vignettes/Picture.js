//
// This component will render an image if it's an URL or request `data-uri`
// from browser's database using `localForage`.
//
// tools
import React from "react"
import localForage from "localforage"
import styled from "styled-components"

//
// CSS
const Figure = styled.figure`
  margin: ${props => props.theme.size.block.spacing}em 0;
  &.focus {
    box-shadow: 0 0 0 4px ${props => props.theme.color.brand};
  }
  img {
    display: block;
    max-width: 100%;
  }
`
//
export const Picture = class extends React.PureComponent {
  //
  // initializing component state
  constructor(props) {
    super(props)
    this.state = {
      //
      // image prop that turns into image attribute on render
      src: props.node.data.get("src") || "",
      //
      // `key` is how we can track the image data from browser's databse
      key: ""
    }
  }
  componentDidMount = () => {
    //
    // derrive values from props
    const { node } = this.props
    const { data } = node
    const key = data.get("key")
    this.loadImage(data.get("file"), key, data.get("src"))
    //
    // store DB key if available
    this.setState({ key })
  }
  loadImage = (file, key, src) => {
    if (!key) {
      // there's no `key` prop, most likely there's `src` which makes
      // things simple
      //
      this.setState({ src })
    } else {
      //
      // queue browser database
      localForage.getItem(key).then(data => {
        const reader = new FileReader()
        // reader will help convert files into images
        //
        reader.addEventListener("load", () => {
          this.setState({ src: reader.result })
        })
        if (
          data &&
          Object.keys(file).length === 0 &&
          file.constructor === Object
        ) {
          //
          // valid image file from db
          reader.readAsDataURL(data)
        } else if (file && file.constructor !== Object) {
          //
          // valid image file from user upload
          reader.readAsDataURL(file)
        }
      })
      //
      // store DB key if available
      this.setState({ key })
    }
  }
  render = () => {
    //
    // derrive values from props
    const { attributes, node, isSelected, editor } = this.props
    const { src } = this.state
    //
    // if image is in focus, CSS style will be applied to make that
    // more obvious
    const focus = editor.value.isFocused && isSelected
    const className = focus ? "focus" : "nofocus"
    //
    // render image component
    return (
      <Figure className={className}>
        <img src={src} />
      </Figure>
    )
  }
}
