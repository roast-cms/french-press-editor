# french-press-editor
[![npm version](https://badge.fury.io/js/%40roast-cms%2Ffrench-press-editor.svg)](https://badge.fury.io/js/%40roast-cms%2Ffrench-press-editor)
> ☕ A better editorial experience with React.js and Slate.

![Demo GIF](README-banner.gif?raw=true)

- **Offline-ready:** store content and images (!) in-browser.
- **Much better than ContentEditable:** don't make your users and developers suffer!
- **You're done:** get it working in five minutes.

***
### Examples in production:
- **[Analog.Cafe](https://www.analog.cafe/submit/compose):** a film photography publication.
- **[Archie.AI Blog](https://www.archie.ai/blog/new):** articles from the team behind Archie.AI, an artificially intelligent data scientist.
***

## Installation:
```
yarn add @roast-cms/french-press-editor
```
### 👉 Then follow **[these instructions](/examples/README.md)**.

## Why?
If you've ever tried building a rich-text editorial experience for your users in-browser with `ContentEditable`, you [may know](https://medium.engineering/why-contenteditable-is-terrible-122d8a40e480) what true torture feels like. Nobody wants that, hence tools like [Slate](https://github.com/ianstormtaylor/slate), [Quill](https://github.com/quilljs/quill), [Draft.js](https://github.com/facebook/draft-js), [Prose Mirror](https://github.com/ProseMirror/prosemirror), and many more exist to alleviate the pain. However, there's a learning curve and possible limitations to each system which take time to learn and understand.

`french-press-editor` simplifies the task of building simple, beautiful, and functional experience for your users further by packaging all of the plugins, components, and directives necessary in one easy to implement package (using Slate as a platform of choice). **No `ContentEditable` bullshit**, **no lengthy research**, **no complex APIs**.

## Specs.
To see if this tool is right for you, please have a look through the list of specs below. Everything listed is pre-packaged.

#### Shiny stuff.
- All content is stored in `localStorage` and all image data is stored in browser database. Your users may edit everything whilst offline!
- Content tree is stored in a well-structured JSON tree format. Good news for MongoDB users!
- Mobile-ready. Even for iOS: there's a cleverly-designed format menu that works with iPhone and iPad. Android devices may still have bugs though.
- Built to make it easy for you to create an experience that will mirror the final published article for your users, so that they don't have to click <btn>Preview</btn> button every time.
- `french-press-editor` is a ready-made, opinionated package, yet there is plenty that you can customize, far beyond CSS.

#### Built-in content block types.
- **Paragraph:** the default, rendered as `<p></p>`.
- **Heading:** there is only one level of heading, which is rendered as `<h3></h3>` to allow for semantic HTML structure in a document that has a title `<h1></h1>` and a subtitle `<h2></h2>`. Headings do not allow any formatting (links, bold, italic) within in order to maintain clean content structure.
- **Quote:** rendered as `<blockquote></blockquote>`. Quotes do not allow any formatting (links, bold, italic) within in order to maintain clean content structure. Quotes also do not allow images or any other blocks within to keep the documents clean and to-the-point.
- **Link:** rendered as `<Link></Link>` using [`react-link-filter`](https://github.com/roast-cms/react-link-filter) component built on top of React Router 4 with additional features, such as correcting user input (if they forgot to type http://), transforming absolute URLs on your domain to relative ones, and a proper function within React application that works in React Router 4 context.
- **Divider:** rendered as `<hr />`.
- **Image:** this is a pluggable component that renders `<Picture />`. With this package there is a ready-made component that you can use, which will properly render images in your document. You may, however, develop your own image components with a lot more options (such as different sizes, positions, captions etc.)
- **Docket:** this is a pluggable component that you can provide (there's none by default) that can display your component inside editor when the user clicks "Insert Image" button. A use case for something like this is giving user image suggestions before asking them to upload an image.
- **Placeholder text:** you can define grey text that users see on an empty document.

#### Text format options.
- **Bold:** rendered as `<strong></strong>`.
- **Italic:** rendered as `<em></em>`.

#### User controls.
- **Floating edit menu:** à la Medium. When user selects text a menu just above the highlighted area appears with options to _convert text block into a heading_, _convert text block into a quote_, _add link to selected text_, _make selected text bold_, _make selected text italic_.
- **Unquote button:** appears within the quote when user's carriage is inside of it.
- **Undo heading button:** appears just above the highlighted area of a heading when it's selected by user.
- **Insert image button:** shows up every time the user is on a new empty paragraph block.
- **Drag & drop image:** user can drag and drop image into the editor.
- **Keyboard shortcuts:**
  - <kbd>⌘</kbd>+<kbd>k</kbd> will make a link out of selected text.
  - <kbd>⌘</kbd>+<kbd>b</kbd> will make selected text bold.
  - <kbd>⌘</kbd>+<kbd>i</kbd> will make selected text italic.
  - Typing `***` on a new line and pressing <kbd>Enter</kbd> will create a divider line.
  - Typing `#` followed by space and text will convert paragraph into a heading after user moves to the next line with <kbd>Enter</kbd> key.
  - Typing `>` followed by space and text will convert paragraph into a quote after user moves to the next line with <kbd>Enter</kbd> key.
  - Hitting <kbd>Backspace</kbd> when the carriage is at the start of a heading or a quote will undo heading or quote.

#### Auto format.
- Typing `...` and pressing space will convert three dots into an ellipsis `…`.
- Typing space then dash `-` then space again will turn dash into `&mdash;` (` — `).
- Double and single quotes are _smart_.
- After user is hits <kbd>Enter</kbd> key within a heading a period will be added at the end of it if there are no other punctuation marks present at the end (for correct & consistent formatting).
- If the last element in the document is an image, an empty new line will follow so that the user has an easy way to continue adding content.
- If the user pastes HTML form another web page or document, it will be converted and interpreted to follow the structure outlined in "content block types" and "text format options" above.

#### Callback functions.
- `callbackStatus()` will send you "ok" or "pending" indicating whether the content is being stored in browser or not.
- `callbackError()` will send you error string and reason (i.e. if the image is too large).
- `callbackPropsUpdate()` will send you `props` and `nextProps` that you can react to as the internal editor component receives new props.

To learn more about what you can customize and build for `french-press-editor` to make it yours, check out the [complete API guide](/examples/README.md).


## Contributions welcome!
If you have a feature request, bug report or a question, please submit an issue. **Please keep in mind that this tool isn't built for everyone and it works best when there are _less_ features cluttering the experience and weighing down the package.**

**Pull requests are very much welcome.** To get started with the code: clone the repo, run `yarn install` then `yarn start` and open up `http://localhost:3002` in your browser.

**Every folder** in this repo has a `README.md` file to help you along 🤓
