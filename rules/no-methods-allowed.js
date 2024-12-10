/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Disallow specified methods on specified objects",
      category: "Best Practices",
      recommended: false,
    },
    schema: [
      {
        type: "array",
        items: {
          type: "object",
          properties: {
            object: { type: "string" },
            methods: {
              type: "array",
              items: { type: "string" },
              uniqueItems: true,
            },
			message: { type: "string" },
          },
          required: ["object", "methods"],
          additionalProperties: false,
        },
        uniqueItems: true,
      },
    ], // Accepts a list of objects with methods to disallow
    messages: {
      disallowedMethod:
        "The method '{{method}}' on object '{{object}}' is disallowed.{{message}}",
    },
  },
  create(context) {
    const disallowed = context.options[0] || [];

    return {
      MemberExpression(node) {
        const objectName = node.object.name;
        const methodName = node.property.name;		

        disallowed.forEach(({ object, methods, message}) => {
          if (object === objectName && methods.includes(methodName)) {
            context.report({
              node,
              messageId: "disallowedMethod",
              data: { object: objectName, method: methodName, message: message ? ' ' + message : ''},
            });
          }
        });
      },
    };
  },
};
