import "jest-styled-components"

import React from "react"

import {shallow} from "enzyme"

import Link from "./Link"

test("Render Link without crashing, matches snapshot", () => {
  const element = shallow(<Link />)
  expect(element).toMatchSnapshot()
})
