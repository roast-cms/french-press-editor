import "jest-styled-components"

import React from "react"

import {shallow} from "enzyme"

import {FrenchPress} from "./"

test("Render FrenchPress without crashing, matches snapshot", () => {
  const element = shallow(<FrenchPress />)
  expect(element).toMatchSnapshot()
})
