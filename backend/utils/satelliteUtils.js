const satellite = require('satellite.js');

// Example utility to get satellite data
const getSatelliteData = async () => {
  // Here, fetch real satellite data or use static data for testing.
  const tle = [
    'ISS (ZARYA)',
    '1 25544U 98067A   22034.19668519  .00002412  00000-0  52044-4 0  9997',
    '2 25544  51.6443 226.7179 0008605  43.8756 316.1849 15.50174042520518',
  ];
  const satrec = satellite.twoline2satrec(tle[1], tle[2]);
  const positionAndVelocity = satellite.propagate(satrec, new Date());
  const position = satellite.eciToGeodetic(positionAndVelocity.position, new Date());
  
  return {
    name: tle[0],
    lat: position.latitude,
    lon: position.longitude,
    altitude: position.height,
  };
};

module.exports = { getSatelliteData };
