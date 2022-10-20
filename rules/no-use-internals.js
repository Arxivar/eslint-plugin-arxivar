/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
    meta: {
        type: 'suggestion',
    },
    create({ report, options }) {
        return {
            ImportDeclaration(node) {
                const value = node.source.value;
                const {folder, message} = options[0];

                if(value.includes(folder) && !value.startsWith(`./${folder}`)) {
                    report({ node, message });
                }
            }
        }
    }
}