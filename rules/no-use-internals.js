/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: "problem",
    docs: {
      description:
        'disallow imports from "Internals" folder unless preceded by "./"',
      category: "Best Practices",
      recommended: false,
    },
    schema: [], // no options
  },
  create(context) {
    return {
      // ImportDeclaration nodes (e.g., import foo from 'bar';)
      ImportDeclaration(node) {
        const importPath = node.source.value;
        if (
          // Check if the path includes "/Internals/" but does not start with "./Internals/"
          importPath.includes("/Internals/") &&
          !importPath.startsWith("./Internals/")
        ) {
          context.report({
            node,
            message:
              'Imports from "Internals" folder must be preceded by "./".',
          });
        }
      },
    };
  },
};
