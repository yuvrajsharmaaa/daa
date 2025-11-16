const express = require('express');
const router = express.Router();
const { calculate01Knapsack } = require('../controllers/knapsackController');

router.post('/calculate', calculate01Knapsack);

module.exports = router;
