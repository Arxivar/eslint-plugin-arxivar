const rulesToImport = [
    'filename-starts-with',
    'no-use-internals'
];

module.exports = {
    ...rulesToImport.reduce((acc, moduleName) => {
        acc[moduleName] = require(`./${moduleName}`);
        return acc;
    }, {})
};
