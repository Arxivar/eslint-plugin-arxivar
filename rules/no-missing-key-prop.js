/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
    meta: {
        type: 'problem',
        docs: {
            description: 'disallow missing key prop in elements inside a list',
            category: 'Possible Errors',
            recommended: true,
        },
        fixable: 'code',
        schema: [] // no options
    },
    create: function(context) {
        return {
            CallExpression(node) {
                if (
                    node.callee.type === 'MemberExpression' &&
                    node.callee.object.name === '_' &&
                    node.callee.property.name === 'map'
                ) {
                    const callback = node.arguments[1];
                    if (callback && callback.type === 'ArrowFunctionExpression') {
                        if (callback.body.type === 'JSXElement') {
                            // Handle concise body
                            const jsxElement = callback.body;
                            const hasKey = jsxElement.openingElement.attributes.some(
                                attr => attr.type === 'JSXAttribute' && attr.name.name === 'key'
                            );

                            if (!hasKey) {
                                context.report({
                                    node: jsxElement,
                                    message: 'Missing "key" prop in JSX element within a list',
                                });
                            }
                        } else if (callback.body.type === 'BlockStatement') {
                            // Handle block body
                            callback.body.body.forEach(statement => {
                                if (
                                    statement.type === 'ReturnStatement' &&
                                    statement.argument.type === 'JSXElement'
                                ) {
                                    const jsxElement = statement.argument;
                                    const hasKey = jsxElement.openingElement.attributes.some(
                                        attr => attr.type === 'JSXAttribute' && attr.name.name === 'key'
                                    );

                                    if (!hasKey) {
                                        context.report({
                                            node: jsxElement,
                                            message: 'Missing "key" prop in JSX element within a list',
                                        });
                                    }
                                }
                            });
                        }
                    }
                }
            }
        };
    }
};
