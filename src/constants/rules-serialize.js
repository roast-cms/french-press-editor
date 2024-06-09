import React from "react"

import {addKey} from "../components/vignettes/Reader"

export const rulesSerializeWithProps = props => [
  {
    serialize(node, children) {
      const element = node.type
      switch (element) {
        case "link": {
          const href = node.data.href

          if (props.components && props.components.Link) {
            const Link = props.editor
              ? props.editor.props.components.Link
              : props.components.Link
            return addKey(<Link to={href}>{children}</Link>)
          } else {
            return addKey(<a href={href}>{children}</a>)
          }
        }
        case "heading": {
          // generate id based on header text or a random string
          const id =
            children[0] && children[0][0]
              ? // TODO: this needs a test
                (typeof children[0][0]?.props?.children === "string"
                  ? children[0][0]?.props?.children
                  : ""
                )
                  .toLowerCase()
                  .replace(/[ ]+/g, "-")
                  .replace(/[^a-z0-9-]+/gi, "")
              : Math.random()
                  .toString(36)
                  .substring(7)

          if (props.components && props.components.H3) {
            const H3 = props.editor
              ? props.editor.props.components.H3
              : props.components.H3
            return addKey(<H3 id={id}>{children}</H3>)
          }
          return addKey(<h3 id={id}>{children}</h3>)
        }
        case "image": {
          if (props.components && props.components.Picture) {
            const Picture = props.editor
              ? props.editor.props.components.Picture
              : props.components.Picture
            return addKey(
              <Picture
                editor={{value: {isSelected: false}}}
                node={{
                  data: {
                    get: object => node.data[object],
                  },
                  serial: node.serial,
                }}
                readOnly={true}
              />
            )
          } else return null
        }
        default:
          return addKey(<>{children}</>)
      }
    },
  },
]
export const RULES_SERIALIZE = [
  {
    serialize(node, children) {
      const element = node.type
      switch (element) {
        case "paragraph": {
          return addKey(<p>{children}</p>)
        }
        case "quote": {
          return addKey(
            <div style={{clear: "both"}}>
              <blockquote>{children}</blockquote>
            </div>
          )
        }
        case "divider": {
          return addKey(<hr />)
        }
        case "italic": {
          return addKey(<em>{children}</em>)
        }
        case "bold": {
          return addKey(<strong>{children}</strong>)
        }
      }
    },
  },
]
