import "jest-styled-components"

import React from "react"

import {shallow} from "enzyme"

import Link from "./Link"

test("Snapshot", () => {
  expect(shallow(<Link />)).toMatchSnapshot()
})
