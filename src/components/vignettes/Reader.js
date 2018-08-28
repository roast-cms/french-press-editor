import React from "react"

import {
  RULES_SERIALIZE,
  rulesSerializeWithProps,
} from "../../constants/rules-serialize"

const rules = props => [
  ...RULES_SERIALIZE,
  ...rulesSerializeWithProps(props),
  {
    serialize(node, children) {
      if (node.object === "string") {
        return children.split("\n").reduce((array, text, i) => {
          if (i !== 0) array.push(<br key={i} />)
          array.push(text)
          return array
        }, [])
      }
    },
  },
]

export const addRootSerialNumbers = nodes => {
  nodes.forEach((node, iterator) => {
    node.serial = iterator
  })
  return nodes
}
let nodes = []
export const Reader = props => {
  const {document} = props.value
  nodes = addRootSerialNumbers(document.nodes)
  const elements = nodes.map(serializeNode).filter(Boolean)
  return elements
}
export const serializeNode = node => {
  if (node.object === "text") {
    const {leaves} = node
    return leaves.map(serializeLeaf)
  }
  const children = node.nodes.map(serializeNode)
  for (const rule of rules) {
    if (!rule.serialize) continue
    const ret = rule.serialize(node, children)
    if (ret === null) return
    if (ret) return addKey(ret)
  }
  throw new Error(`No serializer defined for node of type "${node.type}".`)
}
export const serializeLeaf = leaf => {
  const string = {object: "string", text: leaf.text}
  const text = serializeString(string)
  if (!leaf.marks) return leaf.text

  return leaf.marks.reduce((children, mark) => {
    for (const rule of rules) {
      if (!rule.serialize) continue
      const ret = rule.serialize(mark, children)
      if (ret === null) return null
      if (ret) return addKey(ret)
    }
    throw new Error(`No serializer defined for mark of type "${mark.type}".`)
  }, text)
}
export const serializeString = string => {
  for (const rule of rules) {
    if (!rule.serialize) continue
    const ret = rule.serialize(string, string.text)
    if (ret) return ret
  }
}
let key = 0
export const addKey = element => {
  const thisKey = key++
  return React.cloneElement(element, {
    key: thisKey,
    node: element.props.node
      ? {
          ...element.props.node,
          get: object => {
            return object === "key" && thisKey
          },
        }
      : null,
    parent: {
      getNextBlock: () => {
        const node = nodes.filter(object => {
          return object.serial === element.props.node.serial + 1
        })[0]
        const nodeFunction = {
          get: object =>
            object === "data" && {
              get: object => (node.data ? node.data[object] : undefined),
            },
        }
        return nodeFunction
      },
    },
  })
}

export default Reader
