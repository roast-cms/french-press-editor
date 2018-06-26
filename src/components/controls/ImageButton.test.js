import React from "react";

import { shallow } from "enzyme";

import ImageButton from "./ImageButton";

test("Render ImageButton without crashing", () => {
  shallow(<ImageButton  />);
});
