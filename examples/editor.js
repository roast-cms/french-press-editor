import React from "react"

import {
  //
  // editor compoent itself
  FrenchPress,
  //
  //
} from "../src/index"
import {TestPlugin} from "./plugin"
import {EXAMPLE_VALUE} from "./constants"
import //
// picture component that you will need to pass as a prop in order to
// render images within your documents; you can create your own Picture
// compnent with advanced features like subtitles, various custom positions,
// responsive image sizes etc, however that's outside the scope of this
// project; advanced Picture components may be created later for you to
// choose from within a different repo/package
Picture from "../src/components/vignettes/Picture"

//
// this component will render the editor
export class Editor extends React.PureComponent {
  //
  // initializing component state
  constructor(props) {
    super(props)
    this.state = {
      status: "ok",
    }
  }
  //
  // handle editor's save status callback function, this function
  // manages state that displays "Saving..." and "Saved." message
  handleCallbackStatus = status => {
    this.setState({
      status,
    })
  }
  //
  // render editor compnent!
  render = () => {
    return (
      <div>
        {/*
          *
          this component displays the save status that's being updated
          every time the content is saved into localStorage
        */}
        <div style={{background: "#eee", color: "#999", padding: ".5em"}}>
          {this.state.status === "ok" ? "Draft Saved." : "Saving..."}
        </div>
        {/*
          *
          this is the editor component
        */}
        <FrenchPress
          //
          // ALL PROPS ARE OPTIONAL
          //
          // placeholder text that's displayed inside empty editor
          placeholder="Write here..."
          //
          //
          // If this is the first time the editor is opened, there is no memory
          // in localStorage. In that case, an EXAMPLE_VALUE content is to be
          // loaded. However, once it's modified, the saved version will be
          // loaded every time. Note that
          // localStorage.getItem("composer-content-state") is never NULL, even
          // for empty documents after first auto save, since even an empty
          // document has a structure that's stored in the LS.
          value={
            localStorage.getItem("composer-content-state")
              ? null
              : EXAMPLE_VALUE
          }
          //
          // components prop accepts three possible components: Picture,
          // PictureDocket, and ImageButton
          components={{
            //
            // Picture component renders images inside the document; you
            // can provide your own, however, it's recommended that you start
            // with the default component
            Picture,
            //
            //Link,
          }}
          //
          options={{
            //
            // domain prop helps rendering links better; for example, absolute
            // links like `domain.com/page` can be automatically converted into
            // `/page`
            domain: "localhost:3002",
            //
            // by default an image placeholder is a grey pixel, however, you can
            // specify your own here
            imagePlaceholder:
              "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
            //
            // maximum upload image size in megabytes
            //imageMaxSize: 10
          }}
          //
          // this prop will call a function with a parameter that specifies
          // editor's localStorage save status (see above)
          callbackStatus={this.handleCallbackStatus}
          //
          // this prop will call a function with error name and additional info
          // that you may like to display within your own dialogue box or interface;
          // i.e.: "Image is too large!"
          callbackError={(error, reason) => {
            console.log(error, reason)
          }}
          //
          // this prop returns Slate Editor component ref to be used by developer
          // (such as to set focus, events. and more)
          editorRef={editorRef => {}}
          //
          // render components within user controls; you may substitute them
          // for images, SVG animations, or whatever else you may fancy
          controls={{
            //
            // button that converts the text block into a header
            MakeHeader: () => <span>H</span>,
            //
            // button that converts header block back into paragraph
            CancelHeader: () => <span>undo heading</span>,
            //
            // button that converts text block into a quote
            MakeQuote: () => <span>“</span>,
            //
            // button that lets user add a link URL to selected text
            MakeLink: () => <u>a</u>,
            //
            // button that marks selected text as bold (and the reverse)
            MakeBold: () => <strong>b</strong>,
            //
            // button that marks selected text as italic (and the reverse)
            MakeItalic: () => <em>i</em>,
            // button label for image upload control
            UploadImage: () => <span>Upload Image</span>,
          }}
          //
          // <FrenchPress /> component contains a number of Slate plugins
          // customized for a specific user experience; you may add your own
          // plugins here as well should you want to extend them
          slatePlugins={[TestPlugin({key: "b"})]}
        />
      </div>
    )
  }
}
