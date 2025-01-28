import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = () => {
  const [query, setQuery] = useState(''); // State to store the search query
  const [satellites, setSatellites] = useState([]); // State to store satellite data
  const [error, setError] = useState(null); // State to handle errors

  const handleSearch = async (event) => {
    event.preventDefault(); // Prevent form from refreshing the page
    console.log('Searching for:', query);

    try {
      // Make an API call to the backend to fetch satellite data
      const response = await axios.get('http://localhost:5000/api/satellites', {
        params: { search: query }, // Send the query as a parameter (optional for filtering)
      });

      console.log('Satellite data:', response.data);
      setSatellites(response.data); // Update the state with the fetched data
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error('Error fetching satellite data:', err);
      setError('Failed to fetch satellite data. Please try again.');
      setSatellites([]); // Clear data if an error occurs
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search for satellites..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '16px',
            width: '300px',
            marginRight: '10px',
          }}
        />
        <button type="submit" style={{ padding: '10px 20px', fontSize: '16px' }}>
          Search
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Display the satellite data */}
      <ul>
        {satellites.map((satellite, index) => (
          <li key={index}>
            <strong>Name:</strong> {satellite.name} | <strong>Launch Year:</strong> {satellite.launchYear} | <strong>Country:</strong> {satellite.country}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
