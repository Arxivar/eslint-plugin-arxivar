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
  ],
});
