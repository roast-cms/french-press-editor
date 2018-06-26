## Modules

<dl>
<dt><a href="#module_chars">chars</a></dt>
<dd><p>An array of plugins that makes quotes smart, turns dashes into long dashes and triple dots into an ellipsis.</p>
</dd>
<dt><a href="#module_header">header</a></dt>
<dd><p>An array of plugins that creates headings out of markup (<code># Text</code>) strings, adds periods at the end of headings if there&#39;s no punctuation or cancels headings if user hits Backspace at the beginning of the line.</p>
</dd>
<dt><a href="#module_hotkeys">hotkeys</a></dt>
<dd><p>An array of plugins that creates links, bold text, and italics when user executes ⌘+k/b/i.</p>
</dd>
<dt><a href="#module_hr">hr</a></dt>
<dd><p>A plugin function that creates divider line via markup command (<code>***</code> on new line + Enter).</p>
</dd>
<dt><a href="#module_images">images</a></dt>
<dd><p>A plugin that lets user drag and drop images into the document (which then stores them in the browser database as files).</p>
</dd>
<dt><a href="#module_quote">quote</a></dt>
<dd><p>An array of plugins that creates quotes out of markup (<code>&gt; Text</code>) strings, cancels headings if user hits Backspace at the begginning of the line and exits quote block into a new default paragraph if user hits Enter at the end of the line.</p>
</dd>
<dt><a href="#module_plugins">plugins</a></dt>
<dd><p>A concatenation of all plugins required to run <code>french-press-editor</code> into a single array.</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#Paste">Paste</a> ⇒ <code>Event</code></dt>
<dd><p>MarkHotkey - A plugin that preserves allowed HTML structure when user pastes HTML content, and converts the rest into either plain text.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#LinkHotkey">LinkHotkey(options)</a> ⇒ <code>Event</code></dt>
<dd><p>LinkHotkey - A plugin function that can add a link to a Slate text string.</p>
</dd>
<dt><a href="#MarkHotkey">MarkHotkey(options)</a> ⇒ <code>Event</code></dt>
<dd><p>MarkHotkey - A plugin function that turns Slate plain text into formatted text with bold or italic styles.</p>
</dd>
</dl>

<a name="module_chars"></a>

## chars
An array of plugins that makes quotes smart, turns dashes into long dashes and triple dots into an ellipsis.


* [chars](#module_chars)
    * [~AutoReplace()](#module_chars..AutoReplace)
    * [~AutoReplace()](#module_chars..AutoReplace)

<a name="module_chars..AutoReplace"></a>

### chars~AutoReplace()
Smart quotes.

**Kind**: inner method of [<code>chars</code>](#module_chars)  
<a name="module_chars..AutoReplace"></a>

### chars~AutoReplace()
Long dash and ellipsis.

**Kind**: inner method of [<code>chars</code>](#module_chars)  
<a name="module_header"></a>

## header
An array of plugins that creates headings out of markup (`# Text`) strings, adds periods at the end of headings if there's no punctuation or cancels headings if user hits Backspace at the beginning of the line.

<a name="module_hotkeys"></a>

## hotkeys
An array of plugins that creates links, bold text, and italics when user executes ⌘+k/b/i.

<a name="module_hr"></a>

## hr
A plugin function that creates divider line via markup command (`***` on new line + Enter).

<a name="module_images"></a>

## images
A plugin that lets user drag and drop images into the document (which then stores them in the browser database as files).


* [images](#module_images)
    * [~key](#module_images..key)
    * [~localForage()](#module_images..localForage)
    * [~transform()](#module_images..transform)

<a name="module_images..key"></a>

### images~key
Unique ID for inserted image file.

**Kind**: inner constant of [<code>images</code>](#module_images)  
<a name="module_images..localForage"></a>

### images~localForage()
Stores image file in browser database.

**Kind**: inner method of [<code>images</code>](#module_images)  
<a name="module_images..transform"></a>

### images~transform()
Inserts image block into document.

**Kind**: inner method of [<code>images</code>](#module_images)  
<a name="module_quote"></a>

## quote
An array of plugins that creates quotes out of markup (`> Text`) strings, cancels headings if user hits Backspace at the begginning of the line and exits quote block into a new default paragraph if user hits Enter at the end of the line.

<a name="module_plugins"></a>

## plugins
A concatenation of all plugins required to run `french-press-editor` into a single array.

<a name="Paste"></a>

## Paste ⇒ <code>Event</code>
MarkHotkey - A plugin that preserves allowed HTML structure when user pastes HTML content, and converts the rest into either plain text.

**Kind**: global constant  
**Returns**: <code>Event</code> - Change Transformation for Slate.  

| Param | Type |
| --- | --- |
| options | <code>Object</code> | 

<a name="LinkHotkey"></a>

## LinkHotkey(options) ⇒ <code>Event</code>
LinkHotkey - A plugin function that can add a link to a Slate text string.

**Kind**: global function  
**Returns**: <code>Event</code> - Change Transformation for Slate.  

| Param | Type |
| --- | --- |
| options | <code>Object</code> | 

<a name="MarkHotkey"></a>

## MarkHotkey(options) ⇒ <code>Event</code>
MarkHotkey - A plugin function that turns Slate plain text into formatted text with bold or italic styles.

**Kind**: global function  
**Returns**: <code>Event</code> - Change Transformation for Slate.  

| Param | Type |
| --- | --- |
| options | <code>Object</code> | 

