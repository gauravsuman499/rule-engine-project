// controllers/ruleController.js
const Rule = require("../models/ruleModel");
const { parseRuleToAST, evaluateAST } = require("../utils/astParser");

// Create a new rule and save to MongoDB
exports.createRule = async (req, res) => {
  try {
    const { ruleString } = req.body;
    const ast = parseRuleToAST(ruleString); // Convert rule to AST
    const rule = new Rule({ ruleString, ast });
    await rule.save();
    res.status(201).json({ message: "Rule created", rule });
  } catch (error) {
    res.status(500).json({ message: "Error creating rule", error });
  }
};

// Modify an existing rule by ID
exports.modifyRule = async (req, res) => {
  try {
    const { id } = req.params;
    const { ruleString } = req.body;
    const ast = parseRuleToAST(ruleString); // Rebuild AST
    const updatedRule = await Rule.findByIdAndUpdate(
      id,
      { ruleString, ast },
      { new: true }
    );
    if (!updatedRule)
      return res.status(404).json({ message: "Rule not found" });
    res.status(200).json({ message: "Rule modified", updatedRule });
  } catch (error) {
    res.status(500).json({ message: "Error modifying rule", error });
  }
};

// Combine two or more rules into one AST
exports.combineRules = async (req, res) => {
  try {
    const { ruleStrings } = req.body;
    const combinedAST = ruleStrings.reduce((acc, ruleString) => {
      const ast = parseRuleToAST(ruleString);
      return new Node("operator", acc, ast, "AND"); // Combine rules with AND operator
    }, null);
    res.status(200).json({ combinedAST });
  } catch (error) {
    res.status(500).json({ message: "Error combining rules", error });
  }
};

// Evaluate a rule against provided data
exports.evaluateRule = async (req, res) => {
  try {
    const { ast, data } = req.body;
    const result = evaluateAST(ast, data);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: "Error evaluating rule", error });
  }
};
