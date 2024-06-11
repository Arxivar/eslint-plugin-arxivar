const allRules =  require('./rules');
const configRecommended = require('./configs/recommended');

module.exports = {
  meta: {
    name: 'eslint-plugin-arxivar'
  },
  rules: allRules,
  configs: {
    recommended: configRecommended
  }
}
