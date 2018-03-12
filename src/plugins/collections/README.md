# Plugin Collections

This folder groups Slate plugins by function into separate files, which can then be concatenated into a single array. This way it's easier to manage the code.
- `chars.js` - an array of plugins that makes quotes smart, turns dashes into long dashes and triple dots into an ellipsis.
- `header.js` - an array of plugins that creates headings out of markup (`# Text`) strings, adds periods at the end of headings if there's no punctuation or cancels headings if user hits <kbd>Backspace</kbd> at the beginning of the line.
- `quote.js` - an array of plugins that creates quotes out of markup (`> Text`) strings, cancels headings if user hits <kbd>Backspace</kbd> at the begginning of the line and exits quote block into a new default paragraph if user hits <kbd>Enter</kbd> at the end of the line.
- `hr.js` - a plugin that creates divider line via markup command (`***` on new line + <kbd>Enter</kbd>).
- `hotkeys.js` - an array of plugins that creates links, bold text, and italics when user executes <kbd>⌘</kbd>+<kbd>k</kbd>/<kbd>b</kbd>/<kbd>i</kbd>.
- `images.js` - a plugin that lets user drag and drop images into the document (which then stores them in the browser database as files).
