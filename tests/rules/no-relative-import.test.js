const { RuleTester } = require("eslint");
const rule = require("../../rules/no-relative-import");

// Initialize RuleTester with parser options
const ruleTester = new RuleTester({
  parserOptions: {
    // Using a modern ECMAScript version
    ecmaVersion: 2018,
    sourceType: "module",
  },
});

ruleTester.run("no-relative-import", rule, {
  valid: [
    // Code snippets that should NOT trigger the rule
    {
      code: "import foo from 'bar';",
    },
    {
      code: "import foo from './bar';",
    },
    {
      code: "import foo from '~/bar';",
    },
    {
      code: "import foo from '@/bar';",
    },
  ],
  invalid: [
    // Code snippets that SHOULD trigger the rule, with expected error messages
    {
      code: "import foo from '../bar';",
      errors: [
        {
          message:
            'Relative parent imports using "../" are not allowed. Use an alias instead.',
        },
      ],
    },
    {
      code: "import foo from '../../bar';",
      errors: [
        { message: 'Relative parent imports using "../" are not allowed. Use an alias instead.' },
      ],
    },
  ],
});