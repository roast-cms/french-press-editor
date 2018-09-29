import "jest-styled-components"

import {Value} from "slate"
import React from "react"

import {shallow} from "enzyme"

import {DEFAULT_EDITOR_STATE} from "../../constants/defaults"
import FormatMenu from "./FormatMenu"

test("Snapshot", () => {
  expect(
    shallow(<FormatMenu value={Value.fromJSON(DEFAULT_EDITOR_STATE)} />)
  ).toMatchSnapshot()
})
