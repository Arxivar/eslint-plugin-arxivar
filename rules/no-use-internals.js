const path = require('path');

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
    meta: {
        type: 'problem',
        docs: {
            description: 'disallow imports from "Internals" folder if the importing file is not in the same parent directory',
            category: 'Best Practices',
            recommended: false,
        },
        schema: [], // no options
    },
    create(context) {
        return {
            ImportDeclaration(node) {
                const importPath = node.source.value;
                const filename = context.getFilename();

                if (importPath.includes('Internals')) {
                    const importFullPath = path.resolve(path.dirname(filename), importPath);
                    const importDir = path.dirname(importFullPath);

                    const importingFileDir = path.dirname(filename);

                    // Resolve the parent directory of the importing file
                    const importingFileParentDir = path.resolve(importingFileDir, '..');

                    // Resolve the parent directory of the internals folder
                    const internalsFolderParentDir = path.resolve(importDir, '..');

                    if (importingFileParentDir !== internalsFolderParentDir) {
                        context.report({
                            node,
                            message: 'Imports from "Internals" folder are not allowed if the importing file is not in the same parent directory.',
                        });
                    }
                }
            }
        };
    }
};
