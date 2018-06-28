import React from "react";

import { shallow } from "enzyme";

import Link from "./Link";

test("Render Link without crashing", () => {
  shallow(<Link />);
});
