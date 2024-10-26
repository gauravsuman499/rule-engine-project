// routes/ruleRoutes.js
const express = require('express');
const router = express.Router();
const ruleController = require('../controllers/ruleController');

// Routes for rule operations
router.post('/create', ruleController.createRule);
router.put('/modify/:id', ruleController.modifyRule);
router.post('/combine', ruleController.combineRules);
router.post('/evaluate', ruleController.evaluateRule);

module.exports = router;
