const rulesToImport = [
    'no-relative-import',
    'no-use-internals',
    'no-methods-allowed',
    'no-missing-key-prop'
];

module.exports = {
    ...rulesToImport.reduce((acc, moduleName) => {
        acc[moduleName] = require(`./${moduleName}`);
        return acc;
    }, {})
};
