const ruleTester = require("../test-utils");
const rule = require("../../rules/no-use-internals");

ruleTester.run("no-use-internals", rule, {
  valid: [
    // Code snippets that should NOT trigger the rule
    {
      code: "import foo from './Internals/bar';",
    },
    {
      code: "import foo from 'some/other/path';",
    },
    {
      code: "import foo from 'bar';",
    },
  ],
  invalid: [
    // Code snippets that SHOULD trigger the rule, with expected error messages
    {
      code: "import foo from '../../Internals/bar';",
      errors: [
        {
          message: 'Imports from "Internals" folder must be preceded by "./".',
        },
      ],
    },
    {
      code: "import foo from 'some/path/Internals/bar';",
      errors: [
        {
          message: 'Imports from "Internals" folder must be preceded by "./".',
        },
      ],
    },
  ],
});