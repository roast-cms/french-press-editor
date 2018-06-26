import { ThemeProvider } from 'styled-components';
import React from "react";

import { shallow } from "enzyme";

import { EXAMPLE_THEME } from '../../../examples/constants';
import { UnquoteButton } from "./Unquote";

test("Render UnquoteButton without crashing", () => {
  shallow(
    <ThemeProvider theme={EXAMPLE_THEME}>
      <UnquoteButton />
    </ThemeProvider>
  );
});
