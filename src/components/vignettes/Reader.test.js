import "jest-styled-components"

import React from "react"

import {shallow} from "enzyme"

import {EXAMPLE_VALUE} from "../../../examples/constants"
import Reader, {
  addKey,
  addRootSerialNumbers,
  nodeFactory,
  rules,
  serializeLeaf,
  serializeString,
} from "./Reader"

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
  expect(nodeFactory({value: EXAMPLE_VALUE})).toHaveLength(6)
})

test("serializeLeaf maps leaves into marks components with keys", () => {
  expect(
    serializeLeaf({
      object: "leaf",
      text: "This is the first post to go onto this website.",
      marks: [
        {
          data: {},
          object: "mark",
          type: "italic",
        },
      ],
    })
  ).toMatchSnapshot()
})

test("serializeString returns string, wrapped in consistent components.", () => {
  expect(
    serializeString({text: "This is the first post to go onto this website."})
  ).toMatchSnapshot()
})

test("addKey creates React elements that match snapshot.", () => {
  const element = shallow(<span node={{}}>Element</span>)
  expect(addKey(element)).toMatchSnapshot()
})

test("Render Reader without crashing, matches snapshot", () => {
  const element = shallow(<Reader />)
  expect(element).toMatchSnapshot()
})
