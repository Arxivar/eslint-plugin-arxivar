/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Ensures that JSX elements returned from array iteration methods like 'map' have a 'key' prop.",
      category: "Possible Errors",
      recommended: true,
    },
    fixable: "code",
    schema: [], // no options
  },
  create: function (context) {
    // Helper function to check a callback function for JSX elements missing a 'key' prop
    function checkCallbackForMissingKey(callbackNode) {
      if (
        !callbackNode ||
        (callbackNode.type !== "ArrowFunctionExpression" &&
          callbackNode.type !== "FunctionExpression")
      ) {
        return;
      }

      const reportMissingKey = (jsxElement) => {
        if (jsxElement.type === "JSXElement") {
          const hasKey = jsxElement.openingElement.attributes.some(
            (attr) =>
              attr.type === "JSXAttribute" && attr.name.name === "key"
          );

          if (!hasKey) {
            context.report({
              node: jsxElement,
              message: 'Missing "key" prop in JSX element within a list',
            });
          }
        }
      };

      if (callbackNode.body.type === "JSXElement") {
        // Concise arrow function: items.map(item => <div />)
        reportMissingKey(callbackNode.body);
      } else if (callbackNode.body.type === "BlockStatement") {
        // Block body: items.map(item => { return <div />; })
        callbackNode.body.body.forEach((statement) => {
          if (
            statement.type === "ReturnStatement" &&
            statement.argument
          ) {
            reportMissingKey(statement.argument);
          }
        });
      }
    }

    return {
      CallExpression(node) {
        // Check if the call is to a 'map' method (e.g., _.map or array.map)
        if (
          !(
            node.callee.type === "MemberExpression" &&
            node.callee.object.name === "_" &&
            node.callee.property.name === "map" 
          )
        ) {
          return;
        }

        let callbackArgument;

        // Determine which argument is the callback function
        if (
          node.callee.object.type === "Identifier" &&
          node.callee.object.name === "_"
        ) {
          // _.map(collection, callback)
          callbackArgument = node.arguments[1];
        } else {
          // array.map(callback) or otherObj.map(callback)
          callbackArgument = node.arguments[0];
        }

        checkCallbackForMissingKey(callbackArgument);
      },
    };
  },
};
