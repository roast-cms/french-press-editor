import "jest-styled-components"

import React from "react"

import {shallow} from "enzyme"

import {rulesSerializeWithProps} from "./rules-serialize"
import Picture from "../components/vignettes/Picture"

test("rulesSerializeWithProps() with no props creates one serialize object in an array", () => {
  expect(rulesSerializeWithProps({})).toHaveLength(1)
})
test("rulesSerializeWithProps() with image as a prop creates one serialize object in an array", () => {
  expect(rulesSerializeWithProps({components: {Picture}})).toHaveLength(1)
})
