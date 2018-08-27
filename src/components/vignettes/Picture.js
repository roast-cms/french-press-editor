import React from "react"
import localForage from "localforage"
import styled from "styled-components"

import {fileToBase64} from "../../utils"

const Figure = styled.figure`
  margin: ${props => props.theme.size.block.spacing}em 0;
  &.focus {
    box-shadow: 0 0 0 4px ${props => props.theme.color.brand()};
  }
  img {
    display: block;
    max-width: 100%;
  }
`

/**
 * This component will render an image if it's an URL or request `data-uri` from browser's database using `localForage`.
 * @module Picture
 * @prop {Object} node Slate Editor node object.
 * @prop {Object} attributes Attributes for the Slate Editor node.
 * @prop {Boolean} isSelected Specifies whether the image is in user's focus.
 * @prop {Object} editor Slate Editor state.
 */
export default class extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      src: props.node.data.get("src") || "",
      key: "",
    }
  }
  componentDidMount = () => {
    const {node} = this.props
    const {data} = node
    const key = data.get("key")
    this.loadImage(data.get("file"), key, data.get("src"))
    this.setState({key})
  }

  /**
   * Load image from URL or browser database via localForage
   * @function loadImage
   * @parameter {Object} file image file
   * @parameter {String} key key to image file in browser DB
   * @parameter {String} src
   */
  loadImage = (file, key, src) => {
    if (!key) {
      this.setState({src})
    } else {
      localForage.getItem(key).then(data => {
        if (data) {
          fileToBase64(data).then(string => this.setState({src: string}))
        } else if (file && file.constructor !== Object) {
          fileToBase64(file).then(string => this.setState({src: string}))
        }
      })
      this.setState({key})
    }
  }
  render = () => {
    const {isSelected, editor} = this.props
    const {src} = this.state

    const focus = editor.value.isFocused && isSelected
    const className = focus ? "focus" : "nofocus"

    return (
      <Figure className={className}>
        <img src={src} />
      </Figure>
    )
  }
}
