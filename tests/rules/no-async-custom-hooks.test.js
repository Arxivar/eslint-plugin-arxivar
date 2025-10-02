const ruleTester = require("../test-utils");
const rule = require("../../rules/no-async-custom-hooks");

ruleTester.run("no-async-custom-hooks", rule, {
  valid: [
    // Code snippets that should NOT trigger the rule
    {
      code: "useInit(() => {})",
      options: [{ hooks: ["useInit"] }],
    },
    {
      code: "useCustomNotInHooksOptions(() => {})",
      options: [{ hooks: ["useCustom"] }],
    },
    {
      code: `useUpdate(() => {
            async function fetchData() {
                const response = await MyAPI.getData(someId);
            }
            fetchData();
        })`,
      options: [{ hooks: ["useUpdate"] }],
    },
    {
      code: "useInit(function() {})",
      options: [{ hooks: ["useInit"] }],
    },
    {
      code: "useInit()",
      options: [{ hooks: ["useInit"] }],
    },
    {
      code: "useUpdate()",
      options: [{ hooks: ["useUpdate"] }],
    },
  ],
  invalid: [
    // Code snippets that SHOULD trigger the rule, with expected error messages
    {
      code: "useInit(async() => {})",
      options: [{ hooks: ["useInit"] }],
      errors: [{ messageId: "noAsync", data: { hookName: "useInit" } }],
    },
    {
      code: "useUpdate(async() => {})",
      options: [{ hooks: ["useUpdate"] }],
      errors: [{ messageId: "noAsync", data: { hookName: "useUpdate" } }],
    },
    {
      code: "useInit(async() => {}); useUpdate(async() => {})",
      options: [{ hooks: ["useInit", "useUpdate"] }],
      errors: [
        { messageId: "noAsync", data: { hookName: "useInit" } },
        { messageId: "noAsync", data: { hookName: "useUpdate" } },
      ],
    },
    {
      code: `useUpdate(async () => {
            function fetchData() {
                return MyAPI.getData(someId);
            }
            await fetchData();
        })`,
      options: [{ hooks: ["useUpdate"] }],
      errors: [{ messageId: "noAsync", data: { hookName: "useUpdate" } }],
    },
    {
      code: "useInit(async function() {})",
      options: [{ hooks: ["useInit"] }],
      errors: [{ messageId: "noAsync", data: { hookName: "useInit" } }],
    },
  ],
});
