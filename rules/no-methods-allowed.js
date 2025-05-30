/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Disallow specified methods on specified objects",
      category: "Best Practices",
      recommended: false,
    },
    // Defines the schema for the rule's options.
    // Accepts a list of objects with methods to disallow
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
    ], 
    // Defines messages that can be used by context.report() by id
    messages: {
      disallowedMethod:
        "The method '{{method}}' on object '{{object}}' is disallowed.{{message}}",
    },
  },
  create(context) {
    // Get the options for the rule, defaulting to an empty array if none are provided.
    const disallowed = context.options[0] || [];

    return {
      // MemberExpression nodes (e.g., object.property)
      MemberExpression(node) {
        const objectName = node.object.name;
        const methodName = node.property.name;

        disallowed.forEach(({ object, methods, message }) => {
          if (object === objectName && methods.includes(methodName)) {
            context.report({
              node,
              messageId: "disallowedMethod",
              data: {
                object: objectName,
                method: methodName,
                message: message ? " " + message : "",
              },
            });
          }
        });
      },
    };
  },
};
