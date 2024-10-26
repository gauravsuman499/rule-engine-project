// src/components/RuleForm.js
import React, { useState } from "react";
import axios from "axios";

const RuleForm = () => {
  const [rule, setRule] = useState("");
  const [data, setData] = useState({
    age: 35,
    department: "Sales",
    salary: 60000,
  });
  const [result, setResult] = useState(null);

  // Create Rule API Call
  const createRule = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/rules/create",
        {
          ruleString: rule,
        }
      );
      console.log("Rule created successfully:", response.data);
    } catch (error) {
      console.error("Error creating rule:", error);
    }
  };

  // Evaluate Rule API Call
  const evaluateRule = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/rules/evaluate",
        { ast: rule, data }
      );
      setResult(response.data.result);
    } catch (error) {
      console.error("Error evaluating rule:", error);
    }
  };

  return (
    <div>
      <h1>Rule Engine</h1>
      <textarea
        value={rule}
        onChange={(e) => setRule(e.target.value)}
        placeholder="Enter rule in string format"
        rows="4"
        cols="50"
      />
      <br />
      <button onClick={createRule}>Create Rule</button>
      <button onClick={evaluateRule}>Evaluate Rule</button>
      {result !== null && <p>Evaluation Result: {result.toString()}</p>}
    </div>
  );
};

export default RuleForm;
