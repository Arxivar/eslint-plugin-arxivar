/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Be careful using ToasterService methods.',
            category: 'Best Practices',
            recommended: true,
        },
    },
    create(context) {
        return {
            CallExpression(node) {
                const callee = node.callee;
                if (
                    callee.type === 'MemberExpression' &&
                    callee.object.type === 'Identifier' &&
                    callee.object.name === 'ToasterService' &&
                    callee.property.type === 'Identifier' &&
                    callee.property.name === 'infoUnsafe'
                ) {
                    context.report({
                        node,
                        message: 'Be careful using ToasterService methods, use them only if we pass static content that cannot be customized by the user, alternatively sanitize the dynamic part with $sanitize',
                    });
                }
            },
        };
    },
};

