import "jest-styled-components";

import { ThemeProvider } from 'styled-components';
import React from "react";

import { shallow } from "enzyme";

import { EXAMPLE_THEME } from '../../../examples/constants';
import Unquote from "./Unquote";

test("Render UnquoteButton without crashing, matches snapshot", () => {
  const element = shallow(
    <ThemeProvider theme={EXAMPLE_THEME}>
      <Unquote />
    </ThemeProvider>
  );
  expect(element).toMatchSnapshot();
});
