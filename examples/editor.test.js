import "jest-styled-components"

import React from "react"

import {shallow} from "enzyme"

import {Editor} from "./editor"

test("Render Editor without crashing, matches snapshot", () => {
  const element = shallow(<Editor />)
  expect(element).toMatchSnapshot()
})
