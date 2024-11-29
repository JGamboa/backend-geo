const axios = require('axios');
require('dotenv').config();

const getLatLngFromAddress = async (address) => {
  const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY; // Asegúrate de tener configurado .env
  const endpoint = `https://maps.googleapis.com/maps/api/geocode/json`;

  try {
    const response = await axios.get(endpoint, {
      params: {
        address,
        key: GOOGLE_API_KEY,
      },
    });

    if (response.data.status === 'OK') {
      const location = response.data.results[0].geometry.location;
      return {
        latitude: location.lat,
        longitude: location.lng,
      };
    } else {
      throw new Error(`Error geocoding address: ${response.data.status}`);
    }
  } catch (error) {
    console.error('Error fetching geolocation:', error);
    throw error;
  }
};

module.exports = { getLatLngFromAddress };
