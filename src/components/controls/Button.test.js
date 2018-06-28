import React from "react";

import { shallow } from "enzyme";

import Button from "./Button";

test("Render Button without crashing", () => {
  shallow(<Button />);
});
