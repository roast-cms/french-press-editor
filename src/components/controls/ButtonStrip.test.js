import React from "react";

import { shallow } from "enzyme";

import { Item } from "./ButtonStrip";

test("Render Item without crashing", () => {
  shallow(<Item />);
});
