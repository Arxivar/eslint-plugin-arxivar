/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Disallow async callbacks in custom hooks",
      category: "Possible Errors",
      recommended: true,
    },
    schema: [
      {
        type: "object",
        properties: {
          hooks: {
            type: "array",
            items: { type: "string" },
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      noAsync: `Effect callbacks are synchronous to prevent race conditions. Put the async function inside:

        {{hookName}}(() => {
            async function fetchData() {
                // You can await here
                const response = await MyAPI.getData(someId);
                // ...
            }
            fetchData();
        }, [someId]); // Or [] if effect doesn't need props or state
        `,
    },
  },
  create(context) {
    const options = context.options[0] || {};
    const hooks = options.hooks || [];

    return {
      CallExpression(node) {
        if (
          node.callee.type === "Identifier" &&
          hooks.includes(node.callee.name)
        ) {
          const firstArg = node.arguments[0];
          if (
            firstArg &&
            (firstArg.type === "ArrowFunctionExpression" ||
              firstArg.type === "FunctionExpression") &&
            firstArg.async
          ) {
            context.report({
              node: firstArg,
              messageId: "noAsync",
              data: { hookName: node.callee.name },
            });
          }
        }
      },
    };
  },
};
