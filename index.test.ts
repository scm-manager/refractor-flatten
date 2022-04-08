import { refractor } from "refractor";
import { noColor as inspect } from "unist-util-inspect";
import flatten from "./index";

test("simple", () => {
  // language=JavaScript
  const javascript = "`${value}`";
  const nodes = refractor.highlight(javascript, "js").children;
  expect(stringify(nodes)).toMatchInlineSnapshot(`
"root[1]
└─0 element<span>[3]
    │ properties: {\\"className\\":[\\"token\\",\\"template-string\\"]}
    ├─0 element<span>[1]
    │   │ properties: {\\"className\\":[\\"token\\",\\"template-punctuation\\",\\"string\\"]}
    │   └─0 text \\"\`\\"
    ├─1 element<span>[3]
    │   │ properties: {\\"className\\":[\\"token\\",\\"interpolation\\"]}
    │   ├─0 element<span>[1]
    │   │   │ properties: {\\"className\\":[\\"token\\",\\"interpolation-punctuation\\",\\"punctuation\\"]}
    │   │   └─0 text \\"\${\\"
    │   ├─1 text \\"value\\"
    │   └─2 element<span>[1]
    │       │ properties: {\\"className\\":[\\"token\\",\\"interpolation-punctuation\\",\\"punctuation\\"]}
    │       └─0 text \\"}\\"
    └─2 element<span>[1]
        │ properties: {\\"className\\":[\\"token\\",\\"template-punctuation\\",\\"string\\"]}
        └─0 text \\"\`\\""
`);
  const flat = flatten(nodes);
  expect(stringify(flat)).toMatchInlineSnapshot(`
"root[5]
├─0 element<span>[1]
│   │ properties: {\\"className\\":[\\"token\\",\\"template-string\\",\\"template-punctuation\\",\\"string\\"]}
│   └─0 text \\"\`\\"
├─1 element<span>[1]
│   │ properties: {\\"className\\":[\\"token\\",\\"template-string\\",\\"interpolation\\",\\"interpolation-punctuation\\",\\"punctuation\\"]}
│   └─0 text \\"\${\\"
├─2 element<span>[1]
│   │ properties: {\\"className\\":[\\"token\\",\\"template-string\\",\\"interpolation\\"]}
│   └─0 text \\"value\\"
├─3 element<span>[1]
│   │ properties: {\\"className\\":[\\"token\\",\\"template-string\\",\\"interpolation\\",\\"interpolation-punctuation\\",\\"punctuation\\"]}
│   └─0 text \\"}\\"
└─4 element<span>[1]
    │ properties: {\\"className\\":[\\"token\\",\\"template-string\\",\\"template-punctuation\\",\\"string\\"]}
    └─0 text \\"\`\\""
`);
});

function stringify(nodes: any): string {
  return inspect({ type: "root", children: nodes });
}
