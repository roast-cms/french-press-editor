## Modules

<dl>
<dt><a href="#module_FrenchPress">FrenchPress</a></dt>
<dd><p>Editor component. Import this component and pass your props.</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#DEFAULT_EDITOR_STATE">DEFAULT_EDITOR_STATE</a></dt>
<dd><p>Default document structure for Slate editor; an empty document.</p>
</dd>
<dt><a href="#BLOCK_TAGS">BLOCK_TAGS</a></dt>
<dd><p>Dictionary list that transpiles HTML/DOM elements into Slate node types.</p>
</dd>
<dt><a href="#MARK_TAGS">MARK_TAGS</a></dt>
<dd><p>Dictionary list that transpiles HTML/DOM elements into Slate mark types.</p>
</dd>
<dt><a href="#PLACEHOLDER_TEXT">PLACEHOLDER_TEXT</a></dt>
<dd><p>Default placeholder text that appears in the Editor.</p>
</dd>
<dt><a href="#PICTURE_ACCEPTED_UPLOAD_MIME">PICTURE_ACCEPTED_UPLOAD_MIME</a></dt>
<dd><p>Default accepted upload file types.</p>
</dd>
<dt><a href="#PICTURE_ACCEPTED_UPLOAD_MIME_HUMAN">PICTURE_ACCEPTED_UPLOAD_MIME_HUMAN</a></dt>
<dd><p>Default accepted upload file types, written in human language.</p>
</dd>
<dt><a href="#rules">rules</a></dt>
<dd><p>A set of rules that defines how to transpile HTML itno slate document nodes and marks (and back).</p>
</dd>
<dt><a href="#schema">schema</a></dt>
<dd><p>A set of rules that transform document structure and keep it normalized to a defined format.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#renderNode">renderNode(props)</a></dt>
<dd><p>Defines how all block-level nodes within the document are going to be rendered.</p>
</dd>
<dt><a href="#renderMark">renderMark()</a></dt>
<dd><p>Marks are inline &quot;rules&quot; for text that apply bold and italic formatting.</p>
</dd>
<dt><a href="#squish">squish()</a></dt>
<dd><p>Flattens HTML into plain text.</p>
</dd>
</dl>

<a name="module_FrenchPress"></a>

## FrenchPress
Editor component. Import this component and pass your props.

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| placeholder | <code>String</code> | Placeholder text that's displayed inside empty editor. |
| controls | <code>Object</code> | You can pass pure React component functions here to render labels for the following controls: `MakeHeader` (button that converts the text block into a header), `CancelHeader` (button that converts header block back into paragraph), `MakeQuote` (button that converts text block into a quote), `MakeLink` (button that lets user add a link URL to selected text), `MakeBold` (button that marks selected text as bold (and the reverse)), `MakeItalic` (button that marks selected text as italic (and the reverse)), and `UploadImage` (button label for image upload control). For images, SVG animations, or whatever else you may fancy. |
| options | <code>Object</code> | Here you can specify your app's domain address, a placeholder image, and a maximum image size. `domain` key helps rendering links better; for example, absolute links like `domain.com/page` can be automatically converted into `/page`. By default an image placeholder is a grey pixel, however, you can specify your own (note that user will rarely ever see it). Maximum upload image size in megabytes is specified as an integer value for `imageMaxSize` key. |
| components | <code>Object</code> | his prop accepts three possible components (as values for the following keys): `Picture`, `PictureDocket`, and `ImageButton`. `Picture` component renders images inside the document; you can provide your own, however, it's recommended that you start with the default component. `PictureDocket` component can be rendered when the user clicks "Insert Image" button instead of straight-up opening a file dialogue box; this may give you a chance to give the user "recommended" images to work with, however, this is an advanced case and isn't required. You can provide your own "Insert Image" button component(`ImageButton`), however, it's not required; if you'd like to do so, please have a  look at the default component to see how to build one properly. If you simply want to change the text or add an icon to the ImageButton component, see `controls` prop. |
| slatePlugins | <code>Array</code> | <FrenchPress />` component contains a number of Slate plugins customized for a specific user experience; you may add your own plugins here as well should you want to extend them. |
| callbackStatus | <code>function</code> | This prop will call a function with a parameter that specifies editor's localStorage save status (provides "ok" or "pending"). |
| callbackError | <code>function</code> | This prop will call a function with error name and additional info that you may like to display within your own dialogue box or interface; i.e.: "Image is too large!" (provides `error` and `reason` strings parameters). |
| editorRef | <code>function</code> | Returns Slate Editor ref once it mounts. This is useful if you want to set events or manipulate the DOM of the `<Editor />` component. |


* [FrenchPress](#module_FrenchPress)
    * [~slatePlugins](#module_FrenchPress..slatePlugins)
    * [~unusedImageKeys](#module_FrenchPress..unusedImageKeys)
    * [~contentImageKeys](#module_FrenchPress..contentImageKeys)
    * [~ImageButton](#module_FrenchPress..ImageButton)
    * [~ImageButtonLabel](#module_FrenchPress..ImageButtonLabel)
    * [~componentDidMount()](#module_FrenchPress..componentDidMount)
    * [~handleChange()](#module_FrenchPress..handleChange)
    * [~cursorContextDelay()](#module_FrenchPress..cursorContextDelay)
    * [~handleImageButton(event)](#module_FrenchPress..handleImageButton)
    * [~handleFileUpload(event)](#module_FrenchPress..handleFileUpload)
    * [~handleClickPropagation(event)](#module_FrenchPress..handleClickPropagation)
    * [~handleDragOver()](#module_FrenchPress..handleDragOver)
    * [~handleDragEnd()](#module_FrenchPress..handleDragEnd)
    * [~menuRef(menu)](#module_FrenchPress..menuRef)
    * [~formatCommand(type)](#module_FrenchPress..formatCommand)

<a name="module_FrenchPress..slatePlugins"></a>

### FrenchPress~slatePlugins
Chain all Slate plugins into a single array to be consumed by Editor.

**Kind**: inner property of [<code>FrenchPress</code>](#module_FrenchPress)  
<a name="module_FrenchPress..unusedImageKeys"></a>

### FrenchPress~unusedImageKeys
Creates a list of image keys in the database which aren't part of the content.

**Kind**: inner property of [<code>FrenchPress</code>](#module_FrenchPress)  
<a name="module_FrenchPress..contentImageKeys"></a>

### FrenchPress~contentImageKeys
Finds all used image keys in the document.

**Kind**: inner constant of [<code>FrenchPress</code>](#module_FrenchPress)  
<a name="module_FrenchPress..ImageButton"></a>

### FrenchPress~ImageButton
Image upload button (prop) can be defined or created by user.

**Kind**: inner constant of [<code>FrenchPress</code>](#module_FrenchPress)  
<a name="module_FrenchPress..ImageButtonLabel"></a>

### FrenchPress~ImageButtonLabel
Defines component label for image button.

**Kind**: inner constant of [<code>FrenchPress</code>](#module_FrenchPress)  
<a name="module_FrenchPress..componentDidMount"></a>

### FrenchPress~componentDidMount()
`french-press-editor` stores images in browser's database for use offline, however, this may take up way too much space after a while and should be treated with care. Deleting images from database when they are removed from editor by user is not a good option since the user may want to undo delete, but if the image is gone from DB they can't restore it. This script typically runs after the component was freshly mounted and there are no undo's available in the history - it runs through entire document and matches DB entries against images within the doc, it then cleans images from DB which have not been found in the doc.

**Kind**: inner method of [<code>FrenchPress</code>](#module_FrenchPress)  
<a name="module_FrenchPress..handleChange"></a>

### FrenchPress~handleChange()
Tracks user interactions with editor in component state. Note that due to Slate Editor's design only the default React state management works out of the box.

**Kind**: inner method of [<code>FrenchPress</code>](#module_FrenchPress)  

| Type |
| --- |
| <code>value</code> | 

<a name="module_FrenchPress..cursorContextDelay"></a>

### FrenchPress~cursorContextDelay()
Tracks user's carriage position inside empty text blocks in order to display "Insert Image" button.

**Kind**: inner method of [<code>FrenchPress</code>](#module_FrenchPress)  
<a name="module_FrenchPress..handleImageButton"></a>

### FrenchPress~handleImageButton(event)
Respond to user clicking/tapping "Insert Image" button that appears on the new empty line of every paragraph.

**Kind**: inner method of [<code>FrenchPress</code>](#module_FrenchPress)  

| Param |
| --- |
| event | 

<a name="module_FrenchPress..handleFileUpload"></a>

### FrenchPress~handleFileUpload(event)
Use the <input /> file handler and inserts user's selected image from their device into the document.

**Kind**: inner method of [<code>FrenchPress</code>](#module_FrenchPress)  

| Param |
| --- |
| event | 

<a name="module_FrenchPress..handleClickPropagation"></a>

### FrenchPress~handleClickPropagation(event)
Prevents unexpected propagations on the components which are part of the editor.

**Kind**: inner method of [<code>FrenchPress</code>](#module_FrenchPress)  

| Param |
| --- |
| event | 

<a name="module_FrenchPress..handleDragOver"></a>

### FrenchPress~handleDragOver()
Registers user's dragOver event in component state

**Kind**: inner method of [<code>FrenchPress</code>](#module_FrenchPress)  
<a name="module_FrenchPress..handleDragEnd"></a>

### FrenchPress~handleDragEnd()
Registers the end of user's dragOver event in component state.

**Kind**: inner method of [<code>FrenchPress</code>](#module_FrenchPress)  
<a name="module_FrenchPress..menuRef"></a>

### FrenchPress~menuRef(menu)
Stores the reference for the format menu DOM object for future use.

**Kind**: inner method of [<code>FrenchPress</code>](#module_FrenchPress)  

| Param |
| --- |
| menu | 

<a name="module_FrenchPress..formatCommand"></a>

### FrenchPress~formatCommand(type)
Perform user commands from within the format menu

**Kind**: inner method of [<code>FrenchPress</code>](#module_FrenchPress)  

| Param |
| --- |
| type | 

<a name="DEFAULT_EDITOR_STATE"></a>

## DEFAULT_EDITOR_STATE
Default document structure for Slate editor; an empty document.

**Kind**: global constant  
<a name="BLOCK_TAGS"></a>

## BLOCK_TAGS
Dictionary list that transpiles HTML/DOM elements into Slate node types.

**Kind**: global constant  
<a name="MARK_TAGS"></a>

## MARK_TAGS
Dictionary list that transpiles HTML/DOM elements into Slate mark types.

**Kind**: global constant  
<a name="PLACEHOLDER_TEXT"></a>

## PLACEHOLDER_TEXT
Default placeholder text that appears in the Editor.

**Kind**: global constant  
<a name="PICTURE_ACCEPTED_UPLOAD_MIME"></a>

## PICTURE_ACCEPTED_UPLOAD_MIME
Default accepted upload file types.

**Kind**: global constant  
<a name="PICTURE_ACCEPTED_UPLOAD_MIME_HUMAN"></a>

## PICTURE_ACCEPTED_UPLOAD_MIME_HUMAN
Default accepted upload file types, written in human language.

**Kind**: global constant  
<a name="rules"></a>

## rules
A set of rules that defines how to transpile HTML itno slate document nodes and marks (and back).

**Kind**: global constant  
<a name="schema"></a>

## schema
A set of rules that transform document structure and keep it normalized to a defined format.

**Kind**: global constant  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| nodes | <code>Array</code> | Acceptable nodes within editor document. |
| last | <code>Object</code> | Defines at least one empty paragraph block that follows a void block (such as picture); this is required to ensure that the user can continue adding content without additional effort below uploaded images (otherwise they will be forced to move the image up to free up a trailing paragraph space). |

<a name="renderNode"></a>

## renderNode(props)
Defines how all block-level nodes within the document are going to be rendered.

**Kind**: global function  

| Param |
| --- |
| props | 

<a name="renderMark"></a>

## renderMark()
Marks are inline "rules" for text that apply bold and italic formatting.

**Kind**: global function  
<a name="squish"></a>

## squish()
Flattens HTML into plain text.

**Kind**: global function  
