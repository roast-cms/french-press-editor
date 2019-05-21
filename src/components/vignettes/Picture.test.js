import "jest-styled-components"

import React from "react"

import {shallow} from "enzyme"

import {EXAMPLE_THEME} from "../../../examples/constants"
import Picture, {Figure} from "./Picture"

test("Render Picture without crashing, matches snapshot", () => {
  const element = shallow(
    <Picture
      node={{
        data: {
          get: () => {},
        },
      }}
      editor={{
        value: {},
      }}
    />
  )
  expect(element).toMatchSnapshot()
})

test("Render Figure without crashing, matches snapshot", () => {
  const element = shallow(<Figure theme={EXAMPLE_THEME} />)
  expect(element).toMatchSnapshot()
})
