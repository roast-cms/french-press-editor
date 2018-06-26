import { ThemeProvider } from 'styled-components';
import React from "react";

import { shallow } from "enzyme";

import { EXAMPLE_THEME } from '../../../examples/constants';
import { Wrapper } from "./Wrapper";

test("Render Wrapper without crashing", () => {
  shallow(
    <ThemeProvider theme={EXAMPLE_THEME}>
      <Wrapper />
    </ThemeProvider>
  );
});
