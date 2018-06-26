import React from "react";

import { shallow } from "enzyme";

import { DEFAULT_EDITOR_STATE } from '../../constants';
import { Reader } from "./Reader";

test("Render Reader without crashing", () => {
  shallow(<Reader value={DEFAULT_EDITOR_STATE} />);
});
