# React pure function components

This folder contains React pure function components that do not track state.
- `Button.js` is the primitive built based on [`@roast-cms/react-button-beans`](https://github.com/roast-cms/react-button-beans) package that renders responsive, easy to use React.js buttons using [Styled Components](https://github.com/styled-components/styled-components).
- `ButtonStrip.js` is a component that compiles buttons into a neat strip.
- `FromatMenu.js` is a component with all of the UI logic for the floating format menu.
- `ImageButton.js` is the button component that appears in the editor when user's carriage is on a new empty line. Have a good read through it if you'd like to build your own (you can plug it in to `<FrenchPress />` component).
- `Link.js` is an implementation of [`@roast-cms/react-link-filter`](https://github.com/roast-cms/react-link-filter) component that's built on top of React Router 4 with additional features, such as correcting user input (if they forgot to type http://), transforming absolute URLs on your domain to relative ones, and a proper function within React application that works in React Router 4 context.
- `Reader.js` is a read-only Slate component that easily renders JSON Value. `value` prop is required, while `options` and `components` props are only required if you provided them to `<FrenchPress />` component.
- `Wrapper.js` contains default CSS styles that visually render the editor component (nicely) using Styled Components.
