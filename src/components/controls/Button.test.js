import "jest-styled-components"

import React from "react"

import {shallow} from "enzyme"

import Button from "./Button"

test("Snapshot", () => {
  expect(shallow(<Button />)).toMatchSnapshot()
})
