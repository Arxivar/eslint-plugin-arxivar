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
      noAsync: `You can't use async function inside {{hookName}}.`,
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
