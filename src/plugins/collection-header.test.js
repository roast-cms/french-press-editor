// import {BeforePlugin, AfterPlugin} from "slate-react"
// import {Value} from "slate"
//
// import Simulator from "slate-simulator"
//
// import {header} from "./collection-header"
//
// const valueGenerator = text => {
//   return {
//     object: "value",
//     document: {
//       object: "document",
//       data: {},
//       nodes: [
//         {
//           object: "block",
//           type: "paragraph",
//           isVoid: false,
//           data: {},
//           nodes: [
//             {
//               object: "text",
//               leaves: [
//                 {
//                   object: "leaf",
//                   text: text || "",
//                   marks: [],
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//   }
// }

test("header plugins transform # text into header", () => {
  // const simulator = new Simulator({
  //   value: Value.fromJSON(valueGenerator()),
  //   plugins: [BeforePlugin(), ...header, AfterPlugin()],
  // })
  // simulator
  //   .beforeInput({data: "#"})
  //   .keyDown({key: "space"})
  //   .beforeInput({data: "a"})
  //
  // expect(simulator.value.toJSON()).toEqual(valueGenerator("a"))
})
