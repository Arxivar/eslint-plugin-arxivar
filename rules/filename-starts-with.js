const minimatch = require('minimatch');

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
    meta: {
        type: 'suggestion',
    },
    create({ options, report, getFilename }) {

        const matchedPattern = options.filter((rule) =>
            rule.files.some((pattern) => minimatch(getFilename(), `**/${pattern}`)),
        )?.[0];

        if (!matchedPattern) {
            return;
        }

        return {
            ImportDeclaration(node) {
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