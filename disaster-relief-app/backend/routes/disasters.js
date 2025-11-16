const express = require('express');
const router = express.Router();
const { getAllDisasters, getDisasterById } = require('../controllers/disasterController');

router.get('/', getAllDisasters);
router.get('/:id', getDisasterById);

module.exports = router;
