import React from "react";

import { shallow } from "enzyme";

import { TinyButton } from "./Button";

test("Render TinyButton without crashing", () => {
  shallow(<TinyButton />);
});
