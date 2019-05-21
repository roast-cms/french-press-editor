import "jest-styled-components"

import {Value} from "slate"
import React from "react"

import {shallow} from "enzyme"

import {DEFAULT_EDITOR_STATE} from "../../constants"
import FormatMenu from "./FormatMenu"

test("Render FormatMenu without crashing, matches snapshot", () => {
  const element = shallow(
    <FormatMenu value={Value.fromJSON(DEFAULT_EDITOR_STATE)} />
  )
  expect(element).toMatchSnapshot()
})
