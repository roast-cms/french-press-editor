import React from "react";
import { Value } from "slate";

import { shallow } from "enzyme";

import { DEFAULT_EDITOR_STATE } from '../../constants';
import FormatMenu from "./FormatMenu";

test("Render FormatMenu without crashing", () => {
  shallow(<FormatMenu value={Value.fromJSON(DEFAULT_EDITOR_STATE)} />);
});
