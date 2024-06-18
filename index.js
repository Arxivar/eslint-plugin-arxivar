const allRules =  require('./rules');
const configRecommended = require('./configs/recommended');

const plugin = {
  meta: {
    name: 'eslint-plugin-arxivar'
  },
  rules: allRules,
  configs: {
    recommended: configRecommended
  }
};

// for ESM
export default plugin;

// OR for CommonJS
module.exports = plugin;
