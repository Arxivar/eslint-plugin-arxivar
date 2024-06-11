const allRules =  require('./rules');
const configRecommended = require('./configs/recommended');

module.exports = {  
  rules: allRules,
  configs: {
    recommended: configRecommended
  }
}
