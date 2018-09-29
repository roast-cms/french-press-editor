import "jest-styled-components"

import React from "react"

import {shallow} from "enzyme"

import {Item} from "./ButtonStrip"

test("Snapshot", () => {
  expect(shallow(<Item />)).toMatchSnapshot()
})
