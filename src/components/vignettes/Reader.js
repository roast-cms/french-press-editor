import React from "react"

import {DEFAULT_EDITOR_STATE} from "../../constants/defaults"
import {
  RULES_SERIALIZE,
  rulesSerializeWithProps,
} from "../../constants/rules-serialize"

export const rules = props => [
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
export const nodeFactory = props => {
  const {document} = props.value || DEFAULT_EDITOR_STATE
  nodes = addRootSerialNumbers(document.nodes)
  const elements = nodes.map(node => serializeNode(node, props)).filter(Boolean)
  return elements
}
export const serializeNode = (node, props) => {
  if (node.object === "text") {
    const {leaves} = node
    return leaves.map(leaf => serializeLeaf(leaf, props))
  }
  const children = node.nodes.map(serializeNode)
  for (const rule of rules(props)) {
    if (!rule.serialize) continue
    const ret = rule.serialize(node, children)
    if (ret === null) return
    if (ret) return addKey(ret)
  }
  throw new Error(`No serializer defined for node of type "${node.type}".`)
}
export const serializeLeaf = (leaf, props) => {
  const string = {object: "string", text: leaf.text}
  const text = serializeString(string, props)
  if (!leaf.marks) return leaf.text

  return leaf.marks.reduce((children, mark) => {
    for (const rule of rules(props)) {
      if (!rule.serialize) continue
      const ret = rule.serialize(mark, children)
      if (ret === null) return null
      if (ret) return addKey(ret)
    }
    throw new Error(`No serializer defined for mark of type "${mark.type}".`)
  }, text)
}
export const serializeString = (string, props) => {
  for (const rule of rules(props)) {
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

export default props => nodeFactory(props)
