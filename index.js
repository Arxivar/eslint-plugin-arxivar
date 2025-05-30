// Import all rules from the rules directory
const allRules = require("./rules");
// Import recommended configuration
const configRecommended = require("./configs/recommended");

module.exports = {
  meta: {
    name: "eslint-plugin-arxivar", // The name of the plugin
  },
  rules: allRules,
  configs: {
    recommended: configRecommended,
  },
};
