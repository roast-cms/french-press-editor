import {shallow} from "enzyme"

import {squish} from "./squish-to-plaintext"

test("squish() converts DOM elements to plain text", () => {
  document.body.innerHTML =
    '<div id="test"><p>Paragraph text inside a div. <strong>Bold text.</strong></p></div>'
  const element = document.getElementById("test")
  expect(squish(element)).toEqual("Paragraph text inside a div. Bold text.")
})
