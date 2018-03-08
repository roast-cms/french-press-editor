// tools
import React from "react"
import { render } from "react-dom"
import { ThemeProvider } from "styled-components"

// theme
import { Sugar } from "@roast-cms/react-sugar-styled"

// editor component
import { FrenchPress } from "../src/index"

const Main = props =>
  <FrenchPress
    callbackStatus={status =>
      console.log(status === "ok" ? "Saved." : "Pending...")}
  />

render(
  <div>
    <ThemeProvider theme={Sugar}>
      <div
        style={{
          maxWidth: "800px",
          margin: "1em auto"
        }}
      >
        <Main />
      </div>
    </ThemeProvider>
  </div>,
  window.document.getElementById("app")
)
