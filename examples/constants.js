import { Sugar } from "@roast-cms/react-sugar-styled"

export const EXAMPLE_THEME = Sugar({
  //
  // you can "theme" your editor components with react-sugar-styled
  // theming dictionary API
  //
  color_brand: "rgb(132,50,72)",
  //
  font_heading: "'Yanone Kaffeesatz', sans-serif",
  font_heading_weight: 400,
  //
  font_body: "'Rajdhani', sans-serif",
  //
  size_base: 20,
  size_column_medium: 700,
  size_column_large: 900,
  size_block_spacing: .75,
  //
  effects_border_radius: .75,
  //
  // for detailed docs on how to customize buttons' theme please refer to
  // the guide on https://github.com/roast-cms/react-sugar-styled
  // - it is a themeing dictionary used with Styled Components
  //
})
