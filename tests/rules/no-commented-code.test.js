const { RuleTester } = require("eslint");
const rule = require("../../rules/no-commented-code");

// Initialize RuleTester
const ruleTester = new RuleTester({
  parserOptions: {
    // Standard parser options for modern JavaScript modules
    ecmaVersion: 2018,
    sourceType: "module",
  },
});

ruleTester.run("no-commented-code", rule, {
  valid: [
    // Code snippets that should NOT trigger the rule
    {
      code: "// tutto ok",
    },
    // Simple block comment
    {
      code: "/* tutto ok */",
    },
    // Comment with just punctuation
    {
      code: "// ---",
    },
    // Comment with just numbers (parses as literal)
    {
      code: "// 12345",
    },
    {
      code: "/* 12345 */",
    },
    {
      code: "// $VARIABILE$ => VARIABILE",
    },
    {
      code: "/* $VARIABILE$ => VARIABILE */",
    },
    {
      code: "// $VARIABILE$ -> VARIABILE",
    },
    {
      code: "/* $VARIABILE$ -> VARIABILE */",
    },
    {
      code: "// $VARIABILE$: VARIABILE",
    },
    {
      code: "/* $VARIABILE$: VARIABILE */",
    },
    {
      code: "/**Notification (Receiving) */",
    },
    {
      code: "//gridSettings, orderSettings, typesSettings, context",
    },
    // Commented parameter list (parses as trivial sequence expression)
    {
      code: "//(collection, item, selectedItems, event)",
    },
    // Trivial MemberExpression
    {
      code: "// foo.bar",
    },
    // Trivial CallExpression (simple identifier as callee, no args)
    {
      code: "// foo()",
    },
    // Trivial CallExpression (member expression as callee, simple args)
    {
      code: "// foo.bar(baz, 1)",
    },
    // Trivial UnaryExpression
    {
      code: "// !isValid",
    },
    // Trivial BinaryExpression
    {
      code: "// count + 1",
    },
    // Trivial LogicalExpression
    {
      code: "// enabled && visible",
    },
    // Trivial AssignmentExpression
    {
      code: "// isActive = true",
    },
    // Trivial TemplateLiteral (simple)
    {
      code: "// `hello world`",
    },
    {
      code: "// String.raw`foo`",
    },
    //  {
    //   code: `
    //     switch(type) {
    //       // This is a comment about the case below
    //       case 'ACTION_TYPE':
    //         return {};
    //       /* This is a comment about the default */
    //       default:
    //         return {};
    //     }
    //   `
    // },
  ],
  invalid: [
    // Code snippets that SHOULD trigger the rule, with expected error messages
    {
      code: `
            // const answer = 54;
            const answer = 42;
    `,
      errors: [{ message: "Code commented forbidden" }],
    },
    // Block comment with commented-out code
    {
      code: "/* const ok = false; */",
      errors: [{ message: "Code commented forbidden" }],
    },
    // Commented-out function declaration
    {
      code: "// function foo() { return true; }",
      errors: [{ message: "Code commented forbidden" }],
    },
    // Commented-out class declaration
    {
      code: "/* class MyClass { constructor() {} } */",
      errors: [{ message: "Code commented forbidden" }],
    },
    // Commented-out if statement
    {
      code: `
      // if (condition) {
      //   doSomething();
      // }
      `,
      errors: [{ message: "Code commented forbidden" }],
    },
    // Commented-out loop
    {
      code: `/*
      for (let i = 0; i < 10; i++) {
        console.log(i);
      }
      */`,
      errors: [{ message: "Code commented forbidden" }],
    },
    // Commented-out variable declaration with assignment
    {
      code: "// let count = 0;",
      errors: [{ message: "Code commented forbidden" }],
    },
    {
      code: "/* var total = 100; */",
      errors: [{ message: "Code commented forbidden" }],
    },
    {
      code: "/* const getName = item => item.name; */",
      errors: [{ message: "Code commented forbidden" }],
    },
    {
      code: "/* const getName = item => item.name */",
      errors: [{ message: "Code commented forbidden" }],
    },
    // Commented-out arrow function with a block statement body
    {
      code: "// const greet = () => { console.log('Hello'); }",
      errors: [{ message: "Code commented forbidden" }],
    },
    // Commented-out arrow function with non-trivial call expression body
    {
      code: "// const callComplex = () => anotherFunction(param1, param2.prop);",
      errors: [{ message: "Code commented forbidden" }],
    },
    // Commented-out object literal
    {
      code: "/* const config = { enabled: true, mode: 'test' }; */",
      errors: [{ message: "Code commented forbidden" }],
    },
    // Commented-out array literal
    {
      code: "// const numbers = [1, 2, 3, 4];",
      errors: [{ message: "Code commented forbidden" }],
    },
    // Commented-out import (might be caught by direct parse or wrap)
    {
      code: "// import { something } from './module';",
      errors: [{ message: "Code commented forbidden" }],
    },
    // Commented-out switch case (might be caught by direct parse or wrap)
    {
      code: "/* case 'ACTION_TYPE': return { ...state, loading: true }; */",
      errors: [{ message: "Code commented forbidden" }],
    },
    // Commented-out switch case (might be caught by direct parse or wrap)
    {
      code: "// case 'ACTION_TYPE': return { ...state, loading: true };",
      errors: [{ message: "Code commented forbidden" }],
    },
        // {
    //   code: `
    //     switch(action.type) {
    //       /* default: return initialState; */
    //       case 'NEW_ACTION': return newState;
    //     }
    //   `,
    //   errors: [{ messageId: "commentedCase" }],
    // },
  ],
});
