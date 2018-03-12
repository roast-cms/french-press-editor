# Utility functions

This folder contains functions used across the application separated by designation for better refactoring and readability.

- `inex.js` is a convenience file that exports all constants from a single place.
- `browser-storage.js` saves and retrieves editor content JSON to/from localStorage.
- `focus-events.js` is a collection of functions that call appropriate functions in response to user interactions.
- `format-menu.js` figures out where the format menu should appear, according to user's selection within editor.
- `image-button.js` figures out the image button location and appearance, depending on user's carriage position within the editor and calls appropriate functions when the user clicks that button.
- `image-file.js` handles insertion of image file into the document and storing it in the browser's database.
- `image-rules.js` enforces image size and filetype.
- `HACKS.js` ideally this file would remain empty...
