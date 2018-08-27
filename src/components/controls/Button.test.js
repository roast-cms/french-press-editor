import "jest-styled-components"

import React from "react"

import {shallow} from "enzyme"

import Button from "./Button"

test("Render Button without crashing, matches snapshot", () => {
  const element = shallow(<Button />)
  expect(element).toMatchSnapshot()
})
