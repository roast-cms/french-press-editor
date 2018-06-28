import { ThemeProvider } from 'styled-components';
import React from "react";

import { shallow } from "enzyme";

import { EXAMPLE_THEME } from '../../../examples/constants';
import Unquote from "./Unquote";

test("Render UnquoteButton without crashing", () => {
  shallow(
    <ThemeProvider theme={EXAMPLE_THEME}>
      <Unquote />
    </ThemeProvider>
  );
});
