import "jest-styled-components"

import React from "react"

import {shallow} from "enzyme"

import Reader, {addRootSerialNumbers, rules, nodeFactory} from "./Reader"
import {EXAMPLE_VALUE} from "../../../examples/constants"

test("rules() with no props creates three serialize objects in an array", () => {
  expect(rules({})).toHaveLength(3)
})

test("addRootSerialNumbers adds serial numbers to (shallow) node objects", () => {
  const nodes = [
    {
      object: "block",
      type: "paragraph",
      nodes: [{object: "text"}],
    },
    {
      object: "block",
      type: "heading",
    },
  ]
  expect(addRootSerialNumbers(nodes)).toEqual([
    {
      nodes: [{object: "text"}],
      object: "block",
      serial: 0,
      type: "paragraph",
    },
    {
      object: "block",
      serial: 1,
      type: "heading",
    },
  ])
})

test("nodeFactory maps Value nodes onto serializeNode function instances, produces six blocks", () => {
  const serializeNode = jest.fn()
  expect(nodeFactory({value: EXAMPLE_VALUE})).toHaveLength(6)
})

test("Render Reader without crashing, matches snapshot", () => {
  const element = shallow(<Reader />)
  expect(element).toMatchSnapshot()
})
