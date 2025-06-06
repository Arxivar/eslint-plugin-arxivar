const ruleTester = require("../test-utils");
const rule = require("../../rules/no-use-style-inline");

ruleTester.run("no-use-style-inline", rule, {
  valid: [
    // Code snippets that should NOT trigger the rule
    {
      code: '<div className="my-class">Hello</div>',
    },
    {
      code: 'const myObject = { style: { color: "red" } };',
    },
    {
      code: "<MyComponent someProp />",
    },
    {
      code: 'function Aaa(props) { const {style} = props; return <div className="foo">Hello</div> }',
    },
  ],
  invalid: [
    // Code snippets that SHOULD trigger the rule, with expected error messages
    {
      code: '<div style={{ color: "red" }}>Hello</div>',
      errors: [
        { message: "Inline style is not allowed. Use CSS classes instead." },
      ],
    },
    {
      code: 'const MyComponent = () => <div style={{ fontSize: "12px" }} />;',
      errors: [
        { message: "Inline style is not allowed. Use CSS classes instead." },
      ],
    },
    {
      code: "function Aaa(props) { const {style} = props; return <div style={style}>Hello</div> }",
      errors: [
        { message: "Inline style is not allowed. Use CSS classes instead." },
      ],
    },
  ],
});
