import "jest-styled-components"

import React from "react"

import {shallow} from "enzyme"

import ImageButton from "./ImageButton"

test("Snapshot", () => {
  expect(shallow(<ImageButton />)).toMatchSnapshot()
})
