import React from "react"

import {shallow} from "enzyme"

import {renderNode} from "./render"
import Link from "../components/controls/Link"
import Picture from "../components/vignettes/Picture"

test("renderNode produces paragraph element.", () => {
  const element = (
    <p>
      <span>a</span>
    </p>
  )
  expect(
    renderNode({
      children: <span>a</span>,
      node: {type: "paragraph"},
      editor: {value: {isFocused: false}},
    })
  ).toEqual(element)
})

test("renderNode produces heading element.", () => {
  const element = <h3>a</h3>
  expect(
    renderNode({
      children: "a",
      node: {type: "heading"},
      editor: {value: {isFocused: false}},
    })
  ).toEqual(element)
})

test("renderNode produces divider element with correct class name.", () => {
  const element = <hr className="nofocus" />
  expect(
    renderNode({
      node: {type: "divider"},
      editor: {value: {isFocused: false}},
    })
  ).toEqual(element)
})

test("renderNode produces quote element that matches a snapshot for readOnly prop.", () => {
  const element = shallow(
    renderNode({
      children: "a",
      node: {type: "quote"},
      editor: {value: {isFocused: false}},
      readOnly: true,
    })
  )
  expect(element).toMatchSnapshot()
})
test("renderNode produces quote element that matches a snapshot for readOnly===false prop.", () => {
  const element = shallow(
    renderNode({
      children: "a",
      node: {type: "quote"},
      editor: {value: {isFocused: false}},
    })
  )
  expect(element).toMatchSnapshot()
})

test("renderNode produces picture element that matches a snapshot.", () => {
  const element = shallow(
    renderNode({
      node: {type: "picture"},
      editor: {value: {isFocused: false}, props: {components: {Picture}}},
    })
  )
  expect(element).toMatchSnapshot()
})

test("renderNode produces link element with correct href prop.", () => {
  const element = (
    <Link to="https://github.com/roast-cms/french-press-editor">a</Link>
  )
  expect(
    renderNode({
      node: {
        type: "link",
        data: {
          get: () => "https://github.com/roast-cms/french-press-editor",
        },
      },
      editor: {
        value: {},
        props: {
          options: {
            domain: "https://github.com",
          },
        },
      },
      children: "a",
    })
  ).toEqual(element)
})
