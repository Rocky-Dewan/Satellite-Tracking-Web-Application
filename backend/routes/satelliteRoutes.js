const express = require('express');
const { getSatellites } = require('../controllers/satelliteController');

const router = express.Router();

// Get all satellites
router.get('/', getSatellites);

module.exports = router;
