# Usage Example

`french-press-editor` was built for fast installation and with a pre-defined set of tools. It's meant to make a good editorial experience that has most of the required features of a typical blog or publication entry for your users with the absolute minimum required from you, the developer. This tool is extendable, via Slate's [plugins](https://github.com/ianstormtaylor/slate/blob/master/docs/general/plugins.md) infrastructure, however, it has some prerequisites and opinionated limitations.

## Cheat mode
If you're new to developing with React you **may** find it easier to just clone this repo, run `yarn install` and then `yarn start` to see how this works. However, unless you are planning to contribute code I recommend you work within your own environment and take advantage of NPM.

## React.js environment
In order for you to use this tool you'll need to have React.js development environment working on your machine. If you don't and don't know where to start, have a look at [create-react-app](https://github.com/facebook/create-react-app). CRA will take care of everything that you need for you, though if you have your own system please make sure that you've got Babel transpiler, with an ability to load imports dynamically, understand spread operators, and this: `babel-plugin-transform-class-properties`.

## Peer dependencies
There are a few peer dependencies that you will need to install and manage yourself in order to use `french-press-editor`. The reason for this is that they tend to be used in other parts of blog and publication apps, so to keep the bundle size as small as possible you are being forced to use a single version of those components throughout. Here's what you'll need:

```
"peerDependencies": {
  "immutable": "^3.8.2",
  "lodash": "^4.17.4",
  "react": "^16.0.0",
  "react-dom": "^16.0.0",
  "react-router-dom": "^4.2.2",
  "styled-components": "3.0.2"
}
```
You can run `yarn add immutable` (and so fourth) on all of the above packages, except for styled-components, which needs to be of a particular version since their latest releases tend to break styles: `yarn add styled-components@3.0.2`.

## MVP
`index.js` in this folder gives you a complete example with full usage API (aside from importing custom components and plugins). However, to get started you don't need to build all that. Assuming you got your environment working and have all the dependencies installed this is what your component should have at minimum in order to render:

```javascript
//
// tools
import React from "react"
import { render } from "react-dom"
import { ThemeProvider } from "styled-components"
import { BrowserRouter } from "react-router-dom"
//
// theming is required to properly render the styled-components
// elements, however you can change it as you wish;
// please refer to the documentation and the code in the below component's repo
// to figure out how to do this yourself
import { Sugar } from "@roast-cms/react-sugar-styled"
//
// editor and components that help render it
import { FrenchPress, Wrapper } from "../src/index"
//
// this component will render the editor
render(
  <div>
    <ThemeProvider theme={Sugar}>
      <BrowserRouter>
        <Wrapper>
          <FrenchPress />
        </Wrapper>
      </BrowserRouter>
    </ThemeProvider>
  </div>,
  window.document.getElementById("app")
)
```
The above, however, won't let you add add and store images within your content. To do that simply add the provided `<Picture />` component as a prop:
```javascript
// ...
import { FrenchPress, Wrapper, Picture } from "../src/index"
// ...
<FrenchPress components={{Picture}} />
// ...
```

That's about it for the minimum viable editor experience.

## API
The easiest way to customize how your `french-press-editor` behaves is through the props passed into the `<FrenchPress />` component. This is not the only way as you may want to change the CSS theming or overwrite CSS with your own styles, create your own components and more.

### `<FrenchPress />` props
Prop | Accepts | Explanation
--- | --- | ---
`placeholder` | `String` | Placeholder text that's displayed inside empty editor.
`controls` | `Object` | You can pass pure React component functions here to render labels for the following controls: `MakeHeader` (button that converts the text block into a header), `CancelHeader` (button that converts header block back into paragraph), `MakeQuote` (button that converts text block into a quote), `MakeLink` (button that lets user add a link URL to selected text), `MakeBold` (button that marks selected text as bold (and the reverse)), `MakeItalic` (button that marks selected text as italic (and the reverse)), and `UploadImage` (button label for image upload control). For images, SVG animations, or whatever else you may fancy
`options` | `Object` | Here you can specify your app's domain address, a placeholder image, and a maximum image size. `domain` key helps rendering links better; for example, absolute links like `domain.com/page` can be automatically converted into `/page`. By default an image placeholder is a grey pixel, however, you can specify your own (note that user will rarely ever see it). Maximum upload image size in megabytes is specified as an integer value for `imageMaxSize` key.
`components` | `Object` | This prop accepts three possible components (as values for the following keys): `Picture`, `PictureDocket`, and `ImageButton`. `Picture` component renders images inside the document; you can provide your own, however, it's recommended that you start with the default component. `PictureDocket` component can be rendered when the user clicks "Insert Image" button instead of straight-up opening a file dialogue box; this may give you a chance to give the user "recommended" images to work with, however, this is an advanced case and isn't required. You can provide your own "Insert Image" button component(`ImageButton`), however, it's not required; if you'd like to do so, please have a  look at the default component to see how to build one properly. If you simply want to change the text or add an icon to the ImageButton component, see `controls` prop.
`slatePlugins` | `Array` | `<FrenchPress />` component contains a number of Slate plugins customized for a specific user experience; you may add your own plugins here as well should you want to extend them.
`callbackStatus` | `Function` | This prop will call a function with a parameter that specifies editor's localStorage save status (provides "ok" or "pending").
`callbackError` | `Function` | This prop will call a function with error name and additional info that you may like to display within your own dialogue box or interface; i.e.: "Image is too large!" (provides `error` and `reason` strings parameters).
`editorRef` | `Function` | Returns Slate Editor ref once it mounts. This is useful if you want to set events or manipulate the DOM of the `<Editor />` component.
 `componentWillReceiveProps` inside the editor (provides `props` and `nextProps` objects).
