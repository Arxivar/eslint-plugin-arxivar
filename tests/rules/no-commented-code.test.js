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
    // Simple text comment
    {
      code: "// tutto ok",
    },
    // Simple text block comment
    {
      code: "/* tutto ok */",
    },
    // Comment with only punctuation (often used as a separator)
    {
      code: "// ---",
    },
    // Comment with only numbers (parses as a Literal, considered trivial)
    {
      code: "// 12345",
    },
    // Block comment with only numbers
    {
      code: "/* 12345 */",
    },
    // Comment resembling an arrow operation but with non-standard syntax (->)
    {
      code: "// $VARIABILE$ -> VARIABILE",
    },
    // Block comment resembling an arrow operation but with non-standard syntax (->)
    {
      code: "/* $VARIABILE$ -> VARIABILE */",
    },
    // Comment resembling an arrow function but with additional text, failing direct parse as ArrowFunctionExpression
    {
      code: "// $VARIABILE$ => VARIABILE and more text",
    },
    // Block comment resembling an arrow function but with additional text
    {
      code: "/* $VARIABILE$ => VARIABILE and more text*/",
    },
    // Comment resembling a labeled statement but with additional text, failing direct parse as LabeledStatement
    {
      code: "// $VARIABILE$: VARIABILE and more text",
    },
    // Block comment resembling a labeled statement but with additional text
    {
      code: "/* $VARIABILE$: VARIABILE and more text*/",
    },
    // Comment resembling a function call with PascalCase (often used for type annotations or descriptions)
    {
      code: "/**Notification (Receiving) */",
    },
    // Comment with a list of identifiers (parses as a SequenceExpression of Identifiers, considered trivial)
    {
      code: "//gridSettings, orderSettings, typesSettings, context",
    },
    // Commented parameter-like list (parses as a SequenceExpression within ParenthesizedExpression, considered trivial)
    {
      code: "//(collection, item, selectedItems, event)",
    },
    // Commented MemberExpression (e.g., object.property - considered trivial)
    {
      code: "// foo.bar",
    },
    // Commented UnaryExpression (e.g., !variable - considered trivial)
    {
      code: "// !isValid",
    },    
    // Commented TemplateLiteral (simple string - considered trivial)
    {
      code: "// `hello world`",
    },
    // Commented TaggedTemplateExpression (simple - considered trivial)
    {
      code: "// String.raw`foo`",
    },
    // {
    //   code: `
    //     switch(type) {
    //       // This is a comment about the case below
    //       case 'ACTION_TYPE':
    //         return {};
    //       /* This is a comment about the default */
    //       default:
    //         return {};
    //     }
    //   `,
    // },
  ],
  invalid: [
    // Code snippets that SHOULD trigger the rule, with expected error messages
    // Commented-out constant declaration
    {
      code: `
            // const answer = 54;
            const answer = 42;
    `,
      errors: [{ message: "Code commented forbidden" }],
    },
    // Commented-out constant declaration in a block comment
    {
      code: "/* const ok = false; */",
      errors: [{ message: "Code commented forbidden" }],
    },
    // Commented-out standard function declaration
    {
      code: "// function foo() { return true; }",
      errors: [{ message: "Code commented forbidden" }],
    },
    // Commented-out class declaration in a block comment
    {
      code: "/* class MyClass { constructor() {} } */",
      errors: [{ message: "Code commented forbidden" }],
    },
    // Commented-out if statement block
    {
      code: `
      // if (condition) {
      //   doSomething();
      // }
      `,
      errors: [{ message: "Code commented forbidden" }],
    },
    // Commented-out for loop in a block comment
    {
      code: `/*
      for (let i = 0; i < 10; i++) {
        console.log(i);
      }
      */`,
      errors: [{ message: "Code commented forbidden" }],
    },
    // Commented-out variable (let) declaration with assignment
    {
      code: "// let count = 0;",
      errors: [{ message: "Code commented forbidden" }],
    },
    // Commented-out variable (var) declaration with assignment in a block comment
    {
      code: "/* var total = 100; */",
      errors: [{ message: "Code commented forbidden" }],
    },
    // Commented-out arrow function (concise body, member expression)
    {
      code: "/* const getName = item => item.name; */",
      errors: [{ message: "Code commented forbidden" }],
    },
    // Commented-out arrow function (concise body, member expression, no semicolon)
    {
      code: "/* const getName = item => item.name */",
      errors: [{ message: "Code commented forbidden" }],
    },
    // Commented-out arrow function with a block body
    {
      code: "// const greet = () => { console.log('Hello'); }",
      errors: [{ message: "Code commented forbidden" }],
    },
    // Commented-out arrow function with a CallExpression body (considered non-trivial)
    {
      code: "// const callComplex = () => anotherFunction(param1, param2.prop);",
      errors: [{ message: "Code commented forbidden" }],
    },
    // Commented-out object literal assignment
    {
      code: "/* const config = { enabled: true, mode: 'test' }; */",
      errors: [{ message: "Code commented forbidden" }],
    },
    // Commented-out array literal assignment
    {
      code: "// const numbers = [1, 2, 3, 4];",
      errors: [{ message: "Code commented forbidden" }],
    },
    // Commented-out import (might be caught by direct parse or wrap)
    {
      code: "// import { something } from './module';",
      errors: [{ message: "Code commented forbidden" }],
    },
    // Commented-out switch case statement (block comment)
    {
      code: "/* case 'ACTION_TYPE': return { ...state, loading: true }; */",
      errors: [{ message: "Code commented forbidden" }],
    },
    // Commented-out switch case statement (line comment)
    {
      code: "// case 'ACTION_TYPE': return { ...state, loading: true };",
      errors: [{ message: "Code commented forbidden" }],
    },
    // Commented-out CallExpression with arguments
    {
      code: "//deferred.resolve(widgets);",
      errors: [{ message: "Code commented forbidden" }],
    },
    // Commented-out CallExpression with arguments (block comment)
    {
      code: "/* deferred.resolve(widgets); */",
      errors: [{ message: "Code commented forbidden" }],
    },
    // Commented-out CallExpression (MemberExpression as callee, with arguments)
    {
      code: "// foo.bar(baz, 1)",
      errors: [{ message: "Code commented forbidden" }],
    },
    // Commented-out CallExpression (Identifier as callee, no arguments)
    {
      code: "// foo()",
      errors: [{ message: "Code commented forbidden" }],
    },
    // Commented-out incomplete LogicalExpression (binary operator at the end)
    {
      code: "// enabled &&",
      errors: [{ message: "Code commented forbidden" }],
    },
    // Commented-out LogicalExpression
    {
      code: "// enabled && visible",
      errors: [{ message: "Code commented forbidden" }],
    },
    // Commented-out AssignmentExpression
    {
      code: "// isActive = true",
      errors: [{ message: "Code commented forbidden" }],
    },
    // --- Start: Tests for switch cases (currently commented out in test file) ---
    // {
    //   code: `
    //     switch(action.type) {
    //       /* default: return initialState; */
    //       case 'NEW_ACTION': return newState;
    //     }
    //   `,
    //   errors: [{ message: "Code commented forbidden" }],
    // },
    // {
    //   code: `
    //     switch(action.type) {
    //       // case 'NEW_ACTION': return newState;
    //       default: return initialState;
    //     }
    //   `,
    //   errors: [{ message: "Code commented forbidden" }],
    // },
    // --- End: Tests for switch cases ---
    // Commented-out ArrowFunctionExpression (simple identifiers)
    {
      code: "// $VARIABILE$ => VARIABILE",
      errors: [{ message: "Code commented forbidden" }],
    },
    // Commented-out ArrowFunctionExpression (simple identifiers, block comment)
    {
      code: "/* $VARIABILE$ => VARIABILE */",
      errors: [{ message: "Code commented forbidden" }],
    },
    // Commented-out LabeledStatement (label with '$' and Identifier body)
    {
      code: "// $VARIABILE$: VARIABILE",
      errors: [{ message: "Code commented forbidden" }],
    },
    // Commented-out LabeledStatement (label with '$' and Identifier body, block comment)
    {
      code: "/* $VARIABILE$: VARIABILE */",
      errors: [{ message: "Code commented forbidden" }],
    },
    // Commented-out BinaryExpression (comparison)
    {
      code: "// cutItem.params.id !== customPasteParams.stateParams.id",
      errors: [{ message: "Code commented forbidden" }],
    },
    // Commented-out BinaryExpression (comparison, block comment)
    {
      code: "/* cutItem.params.id !== customPasteParams.stateParams.id */",
      errors: [{ message: "Code commented forbidden" }],
    },
    // Trivial BinaryExpression
    {
      code: "// count + 1",
      errors: [{ message: "Code commented forbidden" }],
    },
    // Commented-out BinaryExpression (arithmetic, block comment)
    {
      code: "/* count + 1*/",
      errors: [{ message: "Code commented forbidden" }],
    },
  ],
});
