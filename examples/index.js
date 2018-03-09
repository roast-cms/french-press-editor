// tools
import React from "react"
import { render } from "react-dom"
import { ThemeProvider } from "styled-components"
import { BrowserRouter } from "react-router-dom"

// theme
import { Sugar } from "@roast-cms/react-sugar-styled"
import { Wrapper } from "./styles"

// editor component
import { FrenchPress } from "../src/index"

const Main = props =>
  <FrenchPress
    // required
    options={{
      domain: "localhost:3002"
    }}
    //optional
    callbackStatus={status => {}}
    controls={{
      MakeHeader: props => <span>H</span>,
      CancelHeader: props => <span>⇲</span>,
      MakeQuote: props => <span>“</span>,
      MakeLink: props => <u>a</u>,
      MakeBold: props => <strong>b</strong>,
      MakeItalic: props => <em>i</em>
    }}
  />

render(
  <div>
    <ThemeProvider theme={Sugar}>
      <BrowserRouter>
        <Wrapper>
          <Main />
        </Wrapper>
      </BrowserRouter>
    </ThemeProvider>
  </div>,
  window.document.getElementById("app")
)
