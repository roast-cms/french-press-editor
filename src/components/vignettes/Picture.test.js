import "jest-styled-components"

import React from "react"

import {shallow} from "enzyme"

import {EXAMPLE_THEME} from "../../../examples/constants"
import Picture, {Figure} from "./Picture"

test("Snapshot", () => {
  expect(
    shallow(
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
  ).toMatchSnapshot()
})

test("Snapshot", () => {
  expect(shallow(<Figure theme={EXAMPLE_THEME} />)).toMatchSnapshot()
})
