const rulesToImport = [
    'filename-starts-with',
    'no-use-internals',
    'toaster-service-unsafe-methods',
    'no-missing-key-prop'
];

module.exports = {
    ...rulesToImport.reduce((acc, moduleName) => {
        acc[moduleName] = require(`./${moduleName}`);
        return acc;
    }, {})
};
