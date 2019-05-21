import "jest-styled-components"

import {ThemeProvider} from "styled-components"
import React from "react"

import {shallow} from "enzyme"

import {EXAMPLE_THEME} from "../../../examples/constants"
import {Wrapper} from "./Wrapper"

test("Render Wrapper without crashing, matches snapshot", () => {
  const element = shallow(
    <ThemeProvider theme={EXAMPLE_THEME}>
      <Wrapper />
    </ThemeProvider>
  )
  expect(element).toMatchSnapshot()
})
