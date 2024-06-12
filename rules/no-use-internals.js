const path = require('path');

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
    meta: {
        type: 'problem',
        docs: {
            description: 'disallow imports from "Internals" folder if the importing file is not in the same root directory',
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

                    const getRootDir = (filePath) => {
                        const parts = filePath.split(path.sep);
                        return parts.length > 1 ? parts[0] : null;
                    };

                    const importingFileRootDir = getRootDir(path.relative(context.getCwd(), filename));
                    const internalsFolderRootDir = getRootDir(path.relative(context.getCwd(), importDir));

                    if (importingFileRootDir !== internalsFolderRootDir) {
                        context.report({
                            node,
                            message: 'Imports from "Internals" folder are not allowed if the importing file is not in the same root directory.',
                        });
                    }
                }
            }
        };
    }
};
