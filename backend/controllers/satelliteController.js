const axios = require('axios');
const { getSatelliteData } = require('../utils/satelliteUtils');

// Fetch satellite data
const getSatellites = async (req, res) => {
  try {
    const satelliteData = await getSatelliteData();
    res.json(satelliteData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching satellite data', error });
  }
};

module.exports = { getSatellites };
