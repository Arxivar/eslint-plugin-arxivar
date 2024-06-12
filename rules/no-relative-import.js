/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
    meta: {
        type: 'problem',
        docs: {
            description: 'disallow relative parent imports using "../"',
            category: 'Best Practices',
            recommended: false,
        },
        schema: [], // no options
    },
    create(context) {
        return {
            ImportDeclaration(node) {
                const importPath = node.source.value;
                if (importPath.startsWith('../')) {
                    context.report({
                        node,
                        message: 'Relative parent imports using "../" are not allowed. Use an alias instead.',
                    });
                }
            }
        };
    }
};
