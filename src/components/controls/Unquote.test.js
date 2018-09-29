import "jest-styled-components"

import {ThemeProvider} from "styled-components"
import React from "react"

import {shallow} from "enzyme"

import {EXAMPLE_THEME} from "../../../examples/constants"
import Unquote from "./Unquote"

test("Snapshot", () => {
  expect(
    shallow(
      <ThemeProvider theme={EXAMPLE_THEME}>
        <Unquote />
      </ThemeProvider>
    )
  ).toMatchSnapshot()
})
