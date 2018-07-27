import "jest-styled-components";

import React from "react";

import { shallow } from "enzyme";

import Picture from "./Picture";

test("Render Picture without crashing, matches snapshot", () => {
  const element = shallow(
    <Picture
      node={{
        data: {
          get: () => {}
        }
      }}
      editor={{
        value: {}
      }}
    />
  );
  expect(element).toMatchSnapshot();
});
