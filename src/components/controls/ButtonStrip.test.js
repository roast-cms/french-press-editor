import "jest-styled-components"
import React from "react"
import {shallow} from "enzyme"

import {Item} from "./ButtonStrip"

test("Render Item without crashing, matches snapshot", () => {
  const element = shallow(<Item />)
  expect(element).toMatchSnapshot()
})
