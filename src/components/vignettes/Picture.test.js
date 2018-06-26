import React from "react";

import { shallow } from "enzyme";

import { Picture } from "./Picture";

test("Render Picture without crashing", () => {
  shallow(
    <Picture
      node={{
        data: {
          get: () => {}
        }
      }}
      editor={{
        value: {}
      }}
    />
  );
});
