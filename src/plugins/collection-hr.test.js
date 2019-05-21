// import {BeforePlugin, AfterPlugin} from "slate-react"
// import {Value} from "slate"
//
// import Simulator from "slate-simulator"
//
// import {hr} from "./collection-hr"
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

test("hr plugins transform *** into <hr />", () => {
  // const simulator = new Simulator({
  //   value: Value.fromJSON(valueGenerator()),
  //   plugins: [BeforePlugin(), ...hr, AfterPlugin()],
  // })
  // simulator.beforeInput({data: "***"}).keyDown({key: "enter"})
  //
  // expect(simulator.value.toJSON()).toEqual(valueGenerator("***"))
})
