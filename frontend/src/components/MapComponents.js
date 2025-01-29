import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import axios from "axios";
import SearchBar from "./SearchBar";

const MapComponent = () => {
  const [satellite, setSatellite] = useState(null);
  const [path, setPath] = useState([]);

  // Function to fetch real-time position
  const fetchSatellitePosition = async (sat) => {
    try {
      const response = await axios.get(
        `https://api.n2yo.com/rest/v1/satellite/positions/${sat.norad_id}/0/0/0/1/&apiKey=YOUR_N2YO_API_KEY`
      );

      const position = response.data.positions[0];

      setSatellite({
        ...sat,
        lat: position.satlatitude,
        lng: position.satlongitude,
      });

      setPath([...path, { lat: position.satlatitude, lng: position.satlongitude }]);
    } catch (error) {
      console.error("Error fetching satellite position:", error);
    }
  };

  return (
    <div>
      <SearchBar onSelectSatellite={fetchSatellitePosition} />

      <MapContainer center={[0, 0]} zoom={2} style={{ height: "500px", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {satellite && (
          <>
            <Marker position={[satellite.lat, satellite.lng]}>
              <Popup>
                <strong>{satellite.name}</strong> <br />
                Country: {satellite.country} <br />
                Altitude: {satellite.altitude_km} km <br />
                Status: {satellite.status}
              </Popup>
            </Marker>

            {/* Draw satellite orbit path */}
            <Polyline positions={path} color="red" />
          </>
        )}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
