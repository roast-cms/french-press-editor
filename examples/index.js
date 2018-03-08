// tools
import React from "react"
import { render } from "react-dom"
import { ThemeProvider } from "styled-components"

// theme
import { Sugar } from "@roast-cms/react-sugar-styled"

// editor component
import { FrenchPress } from "../src/index"


const Main = props => <FrenchPress />

render(
  <div>
    <ThemeProvider theme={Sugar}>
      <Main />
    </ThemeProvider>
  </div>,
  window.document.getElementById("app")
)
