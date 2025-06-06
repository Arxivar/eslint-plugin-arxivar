const ruleTester = require("../test-utils");
const rule = require("../../rules/no-methods-allowed");

const options = [
  [
    // Define the disallowed methods for specific objects
    { object: "console", methods: ["log", "warn"], message: "Use logger service instead." },
    { object: "_", methods: ["map", "filter"] },
  ],
];

ruleTester.run("no-methods-allowed", rule, {
  valid: [
    // Code snippets that should NOT trigger the rule
    {
      code: "console.error('error');",
      options,
    },
    {
      code: "myObj.log();",
      options,
    },
    {
      code: "_.forEach([1,2], i => i);",
      options,
    },
    {
      // This case has no options provided to the rule in the test, so it's valid by default.
      code: "obj.anotherMethod();", // No options provided, so nothing is disallowed
    },
  ],
  invalid: [
    // Code snippets that SHOULD trigger the rule, with expected error messages
    {
      code: "console.log('hello');",
      options,
      errors: [
        {
          messageId: "disallowedMethod",
          data: { object: "console", method: "log", message: " Use logger service instead." },
        },
      ],
    },
    {
      code: "console.warn('world');",
      options,
      errors: [
        {
          messageId: "disallowedMethod",
          data: { object: "console", method: "warn", message: " Use logger service instead." },
        },
      ],
    },
    {
      code: "_.map([1,2], i => i);",
      options,
      errors: [
        {
          messageId: "disallowedMethod",
          data: { object: "_", method: "map", message: "" },
        },
      ],
    },
    {
      code: "_.filter([1,2], i => i);",
      options,
      errors: [
        {
          messageId: "disallowedMethod",
          data: { object: "_", method: "filter", message: "" },
        },
      ],
    },
  ],
});