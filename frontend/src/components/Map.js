import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { getSatellites } from '../services/api';

const Map = () => {
  const [satelliteData, setSatelliteData] = useState([]);

  useEffect(() => {
    const fetchSatelliteData = async () => {
      const data = await getSatellites();
      setSatelliteData(data);
    };
    fetchSatelliteData();
  }, []);

  return (
    <MapContainer center={[51.505, -0.09]} zoom={2} style={{ height: '100vh', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {satelliteData.map((satellite, index) => (
        <Marker key={index} position={[satellite.lat, satellite.lon]}>
          <Popup>
            <div>
              <h3>{satellite.name}</h3>
              <p>Altitude: {satellite.altitude} km</p>
              <p>Location: {satellite.lat.toFixed(2)}, {satellite.lon.toFixed(2)}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
