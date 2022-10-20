/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
    meta: {
        type: 'suggestion',
    },
    create({ report, options }) {
        return {
            ImportDeclaration(node) {
                const value = node.source.value;
                const folderToExclude = options[0];
                const message = options[0];
                
                if(value.includes(folderToExclude) && !value.startsWith(`./${folderToExclude}`)) {
                    report({ node, message });
                }
            }
        }
    }
}