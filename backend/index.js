// index.js
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// NASA NeoWs API endpoint for the next 7 days of asteroid data
const NASA_API_URL = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=2025-06-19&end_date=2025-06-26&api_key=x4n1JZan9cepqYnkzW1Ihc3nxmVuJEM8fbJllAjG';
const API_KEY = process.env.NASA_API_KEY;

// Fetch asteroid data for the next 7 days
app.get('/api/asteroids', async (req, res) => {
    try {
        const today = new Date().toISOString().split('T')[0];
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + 7);
        const endDateStr = endDate.toISOString().split('T')[0];

        const response = await axios.get(NASA_API_URL, {
            params: {
                start_date: today,
                end_date: endDateStr,
                api_key: API_KEY
            }
        });

        const data = response.data;
        const asteroids = [];

        // Process the data to extract relevant fields
        for (const date in data.near_earth_objects) {
            data.near_earth_objects[date].forEach(asteroid => {
                asteroids.push({
                    name: asteroid.name,
                    discoveryDate: asteroid.orbital_data ? asteroid.orbital_data.first_observation_date : 'N/A',
                    closestApproachDate: asteroid.close_approach_data[0].close_approach_date,
                    phaFactor: asteroid.is_potentially_hazardous_asteroid ? 1 : 0, // Simplified PHA indicator (1 = true, 0 = false)
                    nasaJplUrl: asteroid.nasa_jpl_url
                });
            });
        }

        res.json(asteroids);
    } catch (error) {
        console.error('Error fetching asteroid data:', error.message);
        res.status(500).json({ error: 'Failed to fetch asteroid data' });
    }
});

