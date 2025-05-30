const { RuleTester } = require("eslint");
const rule = require("../../rules/no-missing-key-prop");

// Initialize RuleTester
const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    // Enable JSX parsing as this rule deals with JSX elements
    ecmaFeatures: {
      jsx: true,
    },
  },
});

ruleTester.run("no-missing-key-prop", rule, {
  valid: [
    // Code snippets that should NOT trigger the rule
    {
      code: "_.map(items, item => <div key={item.id}>{item.name}</div>);",
    },
    {
      code: "_.map(items, item => { return <div key={item.id}>{item.name}</div>; });",
    },    
    {
      code: "_.map(items, item => item.name);", // Not returning JSX element
    },
    {
      code: "items.map(item => item.name);", // Not returning JSX element
    },
    {
      code: "React.Children.map(children, child => <div key={child.id}>{child.name}</div>);",
    },
    {
      code: "_.map(items, (item, index) => <div key={index}>{item.name}</div>);",
    },
    {
      code: "function A() { return _.map(items, item => <div key={item.id}>{item.name}</div>) }",
    },
  ],
  invalid: [
    // Code snippets that SHOULD trigger the rule, with expected error messages
    {
      code: "_.map(items, item => <div>{item.name}</div>);",
      errors: [
        { message: 'Missing "key" prop in JSX element within a list' },
      ],
    },
    {
      code: "items.map(item => <div>{item.name}</div>);",
      errors: [
        { message: 'Missing "key" prop in JSX element within a list' },
      ],
    },
    {
      code: "_.map(items, item => { return <div>{item.name}</div>; });",
      errors: [
        { message: 'Missing "key" prop in JSX element within a list' },
      ],
    },
    {
      code: "_.map(items, (item, index) => { console.log(item); return <div>{item.name}</div>; });",
      errors: [
        { message: 'Missing "key" prop in JSX element within a list' },
      ],
    },
    {
      code: "function MyComponent({items}) { return _.map(items, item => <span>{item}</span>); }",
      errors: [
        { message: 'Missing "key" prop in JSX element within a list' },
      ],
    },
    {
      code: `
        const renderItems = (items) => {
          return _.map(items, function(item) {
            return <li className="item">{item}</li>;
          });
        };
      `,
      errors: [{ message: 'Missing "key" prop in JSX element within a list' }],
    }
  ],
});