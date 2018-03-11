// tools
import React from "react"
import localForage from "localforage"
import styled from "styled-components"

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

export const Picture = class extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      src: props.node.data.get("src") || "",
      key: ""
    }
  }
  componentDidMount = () => {
    const { node } = this.props
    const { data } = node
    const key = data.get("key")
    this.loadImage(data.get("file"), key, data.get("src"))

    // store DB key if available
    this.setState({ key })
  }
  loadImage = (file, key, src) => {
    if (!key) {
      this.setState({ src })
      // this calls function to populate optional image info (if available)
      this.props.readOnly && this.props.getInfo && this.props.getInfo(src)
    } else {
      localForage.getItem(key).then(data => {
        const reader = new FileReader()
        reader.addEventListener("load", () => {
          this.setState({ src: reader.result })
        })
        if (
          data &&
          Object.keys(file).length === 0 &&
          file.constructor === Object
        ) {
          reader.readAsDataURL(data)
        } else if (file && file.constructor !== Object) {
          reader.readAsDataURL(file)
        }
      })

      // store DB key if available
      this.setState({ key })
    }
  }
  render = () => {
    const { attributes, node, isSelected, editor } = this.props
    const { src } = this.state
    const focus = editor.value.isFocused && isSelected
    const className = focus ? "focus" : "nofocus"
    return (
      <Figure className={className}>
        <img src={src} />
      </Figure>
    )
  }
}
