// import { focusEvents } from "./events-focus";
// import { addLink, formatCommand, menuPosition } from "./actions-format";
import {
  // imageButtonPosition,
  // handleImageButton,
  // handleFileUpload,
  forceImageRestrictions
} from "./actions-image";
// import {
//   loadContent,
//   loadTextContent,
//   storeContentState,
//   saveContent,
//   setDraftStatusHelper
// } from "./actions-storage";

test("Reject images over 10mb via forceImageRestrictions()", () => {
  return expect(
    forceImageRestrictions(10000001, "image/jpeg")
  ).rejects.toEqual("size");
});
test("Reject images over custom size via forceImageRestrictions()", () => {
  return expect(
    forceImageRestrictions(1000001, "image/jpeg", 1)
  ).rejects.toEqual("size");
});
test("Reject GIF (unsupported) image mime via forceImageRestrictions()", () => {
  return expect(
    forceImageRestrictions(10000000, "image/gif")
  ).rejects.toEqual("mime");
});
