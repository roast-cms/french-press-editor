import "jest-styled-components"

import React from "react"

import {shallow} from "enzyme"

import {Editor} from "./Editor"

test("Snapshot", () => {
  expect(shallow(<Editor />)).toMatchSnapshot()
})
