// tools
import React from "react"
import { render } from "react-dom"
import { ThemeProvider } from "styled-components"
import { BrowserRouter } from "react-router-dom"

// theme
import { Sugar } from "@roast-cms/react-sugar-styled"


// editor component
import { FrenchPress, Picture, Wrapper } from "../src/index"

class Editor extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      status: "ok"
    }
  }
  handleCallbackStatus = status => {
    this.setState({
      status
    })
  }
  render = () => {
    return (
      <div>
        <div style={{background: "#eee", color: "#999", padding: ".5em"}}>
          {this.state.status === "ok" ? "Draft Saved." : "Saving..."}
        </div>
        <FrenchPress
          placeholder="Write here..."
          components={{
            Picture, // REQUIRED (to render images)
            PictureDocket: null,
            ImageButton: null
          }}
          options={{
            domain: "localhost:3002",
            imagePlaceholder:
              "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
            imageMaxSize: 10
          }}
          callbackStatus={this.handleCallbackStatus}
          callbackError={(error, reason) => {
            // console.log(error, reason)
          }}
          callbackPropsUpdate={(prpos, nextProps) => {
            // console.log(nextProps)
          }}
          controls={{
            MakeHeader: () => <span>H</span>,
            CancelHeader: () => <span>⇲</span>,
            MakeQuote: () => <span>“</span>,
            MakeLink: () => <u>a</u>,
            MakeBold: () => <strong>b</strong>,
            MakeItalic: () => <em>i</em>,
            UploadImage: () => <span>Upload Image</span>
          }}
          slatePlugins={[]}
        />
      </div>
    )
  }
}

render(
  <div>
    <ThemeProvider theme={Sugar}>
      <BrowserRouter>
        <Wrapper>
          <Editor />
        </Wrapper>
      </BrowserRouter>
    </ThemeProvider>
  </div>,
  window.document.getElementById("app")
)
