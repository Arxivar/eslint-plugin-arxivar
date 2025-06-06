const { RuleTester: ESLintRuleTester } = require("eslint"); // Alias to avoid naming conflict if RuleTester is used elsewhere

/**
 * A pre-configured ESLint RuleTester instance for the plugin.
 * It uses @typescript-eslint/parser and modern ECMAScript features, including JSX.
 * This configuration is suitable for ESLint 9.
 */
const configuredRuleTester = new ESLintRuleTester({
  languageOptions: {
    parserOptions: {
      ecmaVersion: 2022, // Use the latest ECMAScript version
      sourceType: "module",
      ecmaFeatures: {
        jsx: true, // Enable JSX parsing for all tests
      },
    },
    parser: require("@typescript-eslint/parser"), // Use TypeScript parser for all tests
  },
});

module.exports = configuredRuleTester;