/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "disallow inline style attribute. Prefer using CSS classes",
      category: "Best Practices",
      recommended: true,
    },
  },
  create: function (context) {
    return {
      // JSXAttribute nodes (e.g., <div style={...} />)
      JSXAttribute(node) {
        if (node.name.name === "style") {
          // Report an error if the attribute name is 'style'
          context.report({
            node,
            message: "Inline style is not allowed. Use CSS classes instead.",
          });
        }
      },
    };
  },
};
