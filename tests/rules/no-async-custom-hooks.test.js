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
  ],
  invalid: [
    // Code snippets that SHOULD trigger the rule, with expected error messages
    {
      code: "useInit(async() => {})",
      options: [{ hooks: ["useInit"] }],
      errors: [
        {
          message: `Effect callbacks are synchronous to prevent race conditions. Put the async function inside:

        useInit(() => {
            async function fetchData() {
                // You can await here
                const response = await MyAPI.getData(someId);
                // ...
            }
            fetchData();
        }, [someId]); // Or [] if effect doesn't need props or state
        `,
        },
      ],
    },
    {
      code: "useInit(async() => {}); useUpdate(async() => {})",
      options: [{ hooks: ["useInit", "useUpdate"] }],
      errors: [
        {
          message: `Effect callbacks are synchronous to prevent race conditions. Put the async function inside:

        useInit(() => {
            async function fetchData() {
                // You can await here
                const response = await MyAPI.getData(someId);
                // ...
            }
            fetchData();
        }, [someId]); // Or [] if effect doesn't need props or state
        `,
        },
        {
          message: `Effect callbacks are synchronous to prevent race conditions. Put the async function inside:

        useUpdate(() => {
            async function fetchData() {
                // You can await here
                const response = await MyAPI.getData(someId);
                // ...
            }
            fetchData();
        }, [someId]); // Or [] if effect doesn't need props or state
        `,
        },
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
      errors: [
        {
          message: `Effect callbacks are synchronous to prevent race conditions. Put the async function inside:

        useUpdate(() => {
            async function fetchData() {
                // You can await here
                const response = await MyAPI.getData(someId);
                // ...
            }
            fetchData();
        }, [someId]); // Or [] if effect doesn't need props or state
        `,
        },
      ],
    },
  ],
});
