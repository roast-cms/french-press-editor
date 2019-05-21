import "jest-styled-components"

import React from "react"

import {shallow} from "enzyme"

import {FrenchPress} from "./"

test("Snapshot", () => {
  expect(shallow(<FrenchPress />)).toMatchSnapshot()
})
