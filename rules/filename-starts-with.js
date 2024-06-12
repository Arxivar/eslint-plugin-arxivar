const minimatch = require('minimatch');

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
    meta: {
        type: 'suggestion',
    },
    create(context) {
        const { options, report, getFilename } = context;
        const matchedPattern = options.filter((rule) =>
            rule.files.some((pattern) => minimatch(getFilename(), `**/${pattern}`)),
        )?.[0];

        if (!matchedPattern) {
            return;
        }

        return {
            CallExpression(node) {
                matchedPattern.startWith.forEach((startWithString) => {
                    if (node.source.value.startsWith(startWithString)) {
                        report({
                            node,
                            message: matchedPattern.errorMessage,
                        });
                    }
                });
            }
        }
    }
}
