## Modules

<dl>
<dt><a href="#module_addLink">addLink</a> ⇒ <code>Object</code></dt>
<dd><p>Transforms an inline block by making it a link.</p>
</dd>
<dt><a href="#module_formatCommand">formatCommand</a></dt>
<dd><p>Format commands switch for inline transformations.</p>
</dd>
<dt><a href="#module_menuPosition">menuPosition</a></dt>
<dd><p>Figures out where the format menu should appear, according to user&#39;s selection location within editor.</p>
</dd>
<dt><a href="#module_imageButtonPosition">imageButtonPosition</a></dt>
<dd><p>Figures out the image button location and appearance, depending on user&#39;s carriage position within the editor and calls appropriate functions when the user clicks &quot;Add Image&quot; button.</p>
</dd>
<dt><a href="#module_handleImageButton">handleImageButton</a></dt>
<dd><p>Image button click action.</p>
</dd>
<dt><a href="#module_handleFileUpload">handleFileUpload</a></dt>
<dd><p>Handles insertion of image file into the document and storing it in the browser&#39;s database.</p>
</dd>
<dt><a href="#module_loadContent">loadContent</a></dt>
<dd><p>Loads stored Slate Value object from localStorage.</p>
</dd>
<dt><a href="#module_loadTextContent">loadTextContent</a></dt>
<dd><p>Loads stored text version of user&#39;s document from localStorage.</p>
</dd>
<dt><a href="#module_storeContentState">storeContentState</a></dt>
<dd><p>Encodes ans tores Slate Value object in localStorage.</p>
</dd>
<dt><a href="#module_saveContent">saveContent</a> ⇒ <code>String</code></dt>
<dd><p>Processes Slate Value object, as well as plain text document, stores in localStorage and returns save status - periodically.</p>
</dd>
<dt><a href="#module_setDraftStatusHelper">setDraftStatusHelper</a> ⇒ <code>String</code></dt>
<dd><p>Sets intermedia status between saves.</p>
</dd>
<dt><a href="#module_focusEvents">focusEvents</a></dt>
<dd><p>A collection of functions that call appropriate functions in response to user interactions.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#forceImageRestrictions">forceImageRestrictions(size, type, max)</a> ⇒ <code>Promise</code></dt>
<dd><p>Enforces image size and filetype.</p>
</dd>
</dl>

<a name="module_addLink"></a>

## addLink ⇒ <code>Object</code>
Transforms an inline block by making it a link.

**Returns**: <code>Object</code> - Value  

| Param | Type |
| --- | --- |
| value | <code>Object</code> | 
| returnType | <code>String</code> | 

<a name="module_formatCommand"></a>

## formatCommand
Format commands switch for inline transformations.


| Param | Type |
| --- | --- |
| type | <code>String</code> | 
| _this | <code>Object</code> | 

<a name="module_menuPosition"></a>

## menuPosition
Figures out where the format menu should appear, according to user's selection location within editor.


| Param | Type |
| --- | --- |
| _this | <code>Object</code> | 

<a name="module_imageButtonPosition"></a>

## imageButtonPosition
Figures out the image button location and appearance, depending on user's carriage position within the editor and calls appropriate functions when the user clicks "Add Image" button.


| Param | Type | Description |
| --- | --- | --- |
| value | <code>Object</code> | Slate Editor Value. |
| parentOffsets | <code>Object</code> | Offset pixel values. |
| _this | <code>Object</code> |  |

<a name="module_handleImageButton"></a>

## handleImageButton
Image button click action.


* [handleImageButton](#module_handleImageButton)
    * [~responseDelay()](#module_handleImageButton..responseDelay)
    * [~click()](#module_handleImageButton..click)
    * [~insertBlock()](#module_handleImageButton..insertBlock)
    * [~setState()](#module_handleImageButton..setState)

<a name="module_handleImageButton..responseDelay"></a>

### handleImageButton~responseDelay()
Timeout allows to paint the image button downstate before bringing up file upload dialogue or a docket component.

**Kind**: inner method of [<code>handleImageButton</code>](#module_handleImageButton)  
<a name="module_handleImageButton..click"></a>

### handleImageButton~click()
If PictureDocket component isn't defined, brings up the dialogue to upload image file.

**Kind**: inner method of [<code>handleImageButton</code>](#module_handleImageButton)  
<a name="module_handleImageButton..insertBlock"></a>

### handleImageButton~insertBlock()
Inserts docket block into editor if the PictureDocket component is defiend.

**Kind**: inner method of [<code>handleImageButton</code>](#module_handleImageButton)  
<a name="module_handleImageButton..setState"></a>

### handleImageButton~setState()
Hides "Insert Image" button when docket is shown.

**Kind**: inner method of [<code>handleImageButton</code>](#module_handleImageButton)  
<a name="module_handleFileUpload"></a>

## handleFileUpload
Handles insertion of image file into the document and storing it in the browser's database.


| Param | Type |
| --- | --- |
| event | <code>Event</code> | 
| _this | <code>Object</code> | 


* [handleFileUpload](#module_handleFileUpload)
    * [~insertBlock(block)](#module_handleFileUpload..insertBlock)
    * [~insertBlock(block)](#module_handleFileUpload..insertBlock)

<a name="module_handleFileUpload..insertBlock"></a>

### handleFileUpload~insertBlock(block)
If PictureDocket component isn't defined, simply inserts the image into the document.

**Kind**: inner method of [<code>handleFileUpload</code>](#module_handleFileUpload)  

| Param | Type |
| --- | --- |
| block | <code>Object</code> | 

<a name="module_handleFileUpload..insertBlock"></a>

### handleFileUpload~insertBlock(block)
If PictureDocket component is defined, inserts the image into the document AND removes the docket from the doc.

**Kind**: inner method of [<code>handleFileUpload</code>](#module_handleFileUpload)  

| Param | Type |
| --- | --- |
| block | <code>Object</code> | 

<a name="module_loadContent"></a>

## loadContent
Loads stored Slate Value object from localStorage.

<a name="module_loadTextContent"></a>

## loadTextContent
Loads stored text version of user's document from localStorage.

<a name="module_storeContentState"></a>

## storeContentState
Encodes ans tores Slate Value object in localStorage.


| Param | Type |
| --- | --- |
| json | <code>Object</code> | 

<a name="module_saveContent"></a>

## saveContent ⇒ <code>String</code>
Processes Slate Value object, as well as plain text document, stores in localStorage and returns save status - periodically.


| Param | Type | Description |
| --- | --- | --- |
| document | <code>Object</code> | Slate document. |
| state | <code>Object</code> | Slate state. |
| callbackStatus | <code>function</code> | Callback function that returns save status. |

<a name="module_setDraftStatusHelper"></a>

## setDraftStatusHelper ⇒ <code>String</code>
Sets intermedia status between saves.

<a name="module_focusEvents"></a>

## focusEvents
A collection of functions that call appropriate functions in response to user interactions.


| Param | Type |
| --- | --- |
| _this | <code>Object</code> | 


* [focusEvents](#module_focusEvents)
    * [~addEventListener()](#module_focusEvents..addEventListener) ⇒ <code>Event</code>
    * [~addEventListener()](#module_focusEvents..addEventListener) ⇒ <code>Event</code>

<a name="module_focusEvents..addEventListener"></a>

### focusEvents~addEventListener() ⇒ <code>Event</code>
Highlights potential drop target when the draggable element enters it.

**Kind**: inner method of [<code>focusEvents</code>](#module_focusEvents)  
<a name="module_focusEvents..addEventListener"></a>

### focusEvents~addEventListener() ⇒ <code>Event</code>
Blurs editor on Esc (remove highlights and guides for preview).

**Kind**: inner method of [<code>focusEvents</code>](#module_focusEvents)  
<a name="forceImageRestrictions"></a>

## forceImageRestrictions(size, type, max) ⇒ <code>Promise</code>
Enforces image size and filetype.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| size | <code>Int</code> | Size in bytes. |
| type | <code>Array</code> | Image memes accepted. |
| max | <code>Int</code> | Cut-off image size in megabytes. |

