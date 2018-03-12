# Parent code folder

Everything in this folder gets transpiled by Babel into `/dist` and delivered to NPM. However, `/dist` folder is hidden from GitHub to keep things tidy.

- `inex.js` - `<FrenchPress />` component, "☕ A better editorial experience with React.js and Slate."
- `constants.js` - global defaults, some of which may be overwritten by user.
- `render.js` - a "prescription" set of React components which render given block types and text marksups.
 - `rules.js` - a "prescription" set that defines how HTML may be rendered via `render.js`
 - `schema.js` - a structure that Slate follows to display document content.
