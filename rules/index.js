const rulesToImport = [
  "no-relative-import",
  "no-use-internals",
  "no-methods-allowed",
  "no-missing-key-prop",
  "no-use-style-inline",
  "no-commented-code",
  "no-async-custom-hooks",
];

module.exports = {
  // Dynamically import and export all rules from the rulesToImport array
  ...rulesToImport.reduce((acc, moduleName) => {
    acc[moduleName] = require(`./${moduleName}`);
    return acc;
  }, {}),
};
