import "jest-styled-components"

import React from "react"

import {shallow} from "enzyme"
import ImageButton from "./ImageButton"

test("Render ImageButton without crashing,  matches snapshot", () => {
  const element = shallow(<ImageButton />)

  expect(element).toMatchSnapshot()
})
