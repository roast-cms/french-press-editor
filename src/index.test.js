import React from "react";

import { shallow } from "enzyme";

import { FrenchPress } from "./";

test("Render FrenchPress without crashing", () => {
  shallow(<FrenchPress />);
});
