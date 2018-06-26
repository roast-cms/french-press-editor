import React from "react";

import { shallow } from "enzyme";

import { TinyButton } from "./Button";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

it("Render TinyButton without crashing", () => {
  shallow(<TinyButton />);
});
