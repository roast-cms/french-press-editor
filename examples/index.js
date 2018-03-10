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

// custom components
import Picture from "../src/containers/Picture"

const Main = props =>
  <FrenchPress
    options={{
      domain: "localhost:3002", // REQUIRED
      imagePlaceholder: // REQUIRED
        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
      imageMaxSize: 10 // optional
    }}
    // below this line all props are optional:
    callbackStatus={status => {}}
    callbackError={error => {
      alert(`Error: ${error}`)
    }}
    controls={{
      MakeHeader: props => <span>H</span>,
      CancelHeader: props => <span>⇲</span>,
      MakeQuote: props => <span>“</span>,
      MakeLink: props => <u>a</u>,
      MakeBold: props => <strong>b</strong>,
      MakeItalic: props => <em>i</em>
    }}
    components={{
      Picture // REQUIRED for images
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
