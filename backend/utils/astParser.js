// utils/astParser.js
class Node {
  constructor(type, left = null, right = null, value = null) {
    this.type = type;  // "operator" or "operand"
    this.left = left;  // Left child node
    this.right = right; // Right child node
    this.value = value;  // Value for operand nodes (e.g., comparisons)
  }
}

// Function to parse a rule string into an AST
function parseRuleToAST(ruleString) {
  // Example: Parsing rule "age > 30 AND salary > 50000"
  // Dummy example for illustration (implement proper parser)
  return new Node(
    "operator",
    new Node("operand", null, null, { age: '>30' }),
    new Node("operand", null, null, { salary: '>50000' }),
    "AND"
  );
}

// Function to evaluate an AST against provided data
function evaluateAST(ast, data) {
  if (ast.type === 'operator') {
    const leftEval = evaluateAST(ast.left, data);
    const rightEval = evaluateAST(ast.right, data);
    return ast.value === 'AND' ? leftEval && rightEval : leftEval || rightEval;
  } else if (ast.type === 'operand') {
    const [key, condition] = Object.entries(ast.value)[0];
    const operator = condition.charAt(0);  // >, <, etc.
    const comparisonValue = parseInt(condition.slice(1), 10);
    if (operator === '>') return data[key] > comparisonValue;
    if (operator === '<') return data[key] < comparisonValue;
    return false;
  }
}

module.exports = { parseRuleToAST, evaluateAST };
