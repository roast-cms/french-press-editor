// import {BeforePlugin, AfterPlugin} from "slate-react"
// import {Value} from "slate"
//
// import Simulator from "slate-simulator"
//
// import {chars} from "./collection-chars"
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

test("chars plugins transform double quotes into smart quotes.", () => {
  // const simulator = new Simulator({
  //   value: Value.fromJSON(valueGenerator()),
  //   plugins: [BeforePlugin(), ...chars, AfterPlugin()],
  // })
  // simulator
  //   .keyDown({key: '"'})
  //   .beforeInput({data: "a"})
  //   .keyDown({key: '"'})
  //
  // expect(simulator.value.toJSON()).toEqual(valueGenerator("“a”"))
})

test("chars plugins transform single quotes into smart quotes.", () => {
  // const simulator = new Simulator({
  //   value: Value.fromJSON(valueGenerator()),
  //   plugins: [BeforePlugin(), ...chars, AfterPlugin()],
  // })
  // simulator
  //   .keyDown({key: "'"})
  //   .beforeInput({data: "a"})
  //   .keyDown({key: "'"})
  //
  // expect(simulator.value.toJSON()).toEqual(valueGenerator("‘a’"))
})

test("chars plugins transform dash into long dash.", () => {
  // const simulator = new Simulator({
  //   value: Value.fromJSON(valueGenerator()),
  //   plugins: [BeforePlugin(), ...chars, AfterPlugin()],
  // })
  // simulator
  //   .beforeInput({data: "a"})
  //   .beforeInput({data: " "})
  //   .beforeInput({data: "-"})
  //   .keyDown({key: "space"})
  //
  // expect(simulator.value.toJSON()).toEqual(valueGenerator("a — "))
})

test("chars plugins transform dots into ellipsis.", () => {
  // const simulator = new Simulator({
  //   value: Value.fromJSON(valueGenerator()),
  //   plugins: [BeforePlugin(), ...chars, AfterPlugin()],
  // })
  // simulator
  //   .beforeInput({data: "..."})
  //   .keyDown({key: " "})
  //
  // expect(simulator.value.toJSON()).toEqual(valueGenerator("… "))
})
