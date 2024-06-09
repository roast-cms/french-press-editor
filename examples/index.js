import "typeface-rajdhani"
import "typeface-yanone-kaffeesatz"

import {ThemeProvider} from "styled-components"
import {render} from "react-dom"
import React from "react"

import {EXAMPLE_THEME, EXAMPLE_VALUE} from "./constants"
import {Editor} from "./editor"
import {
  //
  // wrapper component contains some default styles that make your editor
  // useable on mobile and desktop; you may like to check this component
  // and recreate it as your own with custom styles or attempt to overwrite
  // css in another way
  Wrapper,
  //
} from "./Wrapper"
import Picture from "../src/components/vignettes/Picture"
import Reader from "../src/components/vignettes/Reader"

const Link = props => (
  <strong>
    <a href={props.to} target="_blank">
      {props.children}
    </a>
  </strong>
)
const H3 = props => <h3>👉{props.children}</h3>

render(
  <div>
    <ThemeProvider theme={EXAMPLE_THEME}>
      <Wrapper>
        <h1>Editor</h1>
        <Editor />
        <h1>Reader</h1>
        <Reader
          options={{domain: "localhost:3002"}}
          value={EXAMPLE_VALUE}
          components={{Picture, Link, H3}}
        />
      </Wrapper>
    </ThemeProvider>
  </div>,
  window.document.getElementById("app")
)
