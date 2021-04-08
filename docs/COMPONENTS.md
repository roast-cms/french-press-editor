## Modules

<dl>
<dt><a href="#module_FormatMenu">FormatMenu</a></dt>
<dd><p>A component with all of the UI logic for the floating format menu.</p>
</dd>
<dt><a href="#module_ImageButton">ImageButton</a></dt>
<dd><p>A button component that appears in the editor when user&#39;s carriage is on a new empty line. Have a good read through it if you&#39;d like to build your own (you can plug it in to <code>&lt;FrenchPress /&gt;</code> component).</p>
</dd>
<dt><a href="#module_Unquote">Unquote</a></dt>
<dd><p>CSS for the Unquote button which appears inside the quote for an easy way to revert formatting to plain text.</p>
</dd>
<dt><a href="#module_Picture">Picture</a></dt>
<dd><p>This component will render an image if it&#39;s an URL or request <code>data-uri</code> from browser&#39;s database using <code>localForage</code>.</p>
</dd>
</dl>

<a name="module_FormatMenu"></a>

## FormatMenu
A component with all of the UI logic for the floating format menu.

<a name="module_ImageButton"></a>

## ImageButton
A button component that appears in the editor when user's carriage is on a new empty line. Have a good read through it if you'd like to build your own (you can plug it in to `<FrenchPress />` component).


| Param | Type |
| --- | --- |
| followComposerCursor | <code>Boolean</code> | 
| onMouseDown | <code>function</code> | 

<a name="module_Unquote"></a>

## Unquote
CSS for the Unquote button which appears inside the quote for an easy way to revert formatting to plain text.

<a name="module_Picture"></a>

## Picture
This component will render an image if it's an URL or request `data-uri` from browser's database using `localForage`.

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| node | <code>Object</code> | Slate Editor node object. |
| attributes | <code>Object</code> | Attributes for the Slate Editor node. |
| isSelected | <code>Boolean</code> | Specifies whether the image is in user's focus. |
| editor | <code>Object</code> | Slate Editor state. |

<a name="module_Picture..loadImage"></a>

### Picture~loadImage()
Load image from URL or browser database via localForage

**Kind**: inner method of [<code>Picture</code>](#module_Picture)  
**Parameter**: <code>Object</code> file image file  
**Parameter**: <code>String</code> key key to image file in browser DB  
**Parameter**: <code>String</code> src  
