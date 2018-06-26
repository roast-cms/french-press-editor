import React from "react";

import { shallow } from "enzyme";

import { TinyButton } from "./Button";

it("Render TinyButton without crashing", () => {
  shallow(<TinyButton />);
});
