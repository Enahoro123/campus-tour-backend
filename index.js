const express = require('express');
const cors = require('cors');
const buildings = require('./buildings.json');

const app = express();

// Define allowed origins for CORS
const allowedOrigins = [
  'https://achievers-campus-map.netlify.app', // Production frontend (no trailing slash)
  'http://localhost:8888',                   // Local development
];

// Configure CORS to allow multiple origins
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, origin);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
}));

app.get('/buildings', (req, res) => {
  console.log('GET /buildings - Returning all buildings');
  res.json(buildings);
});

app.get('/buildings/:id', (req, res) => {
  const id = parseInt(req.params.id);
  console.log(`GET /buildings/${id} - Looking for building with ID: ${id}`);
  const building = buildings.find((b) => b.id === id);
  if (building) {
    console.log(`Building found: ${building.name}`);
    res.json(building);
  } else {
    console.log(`Building with ID ${id} not found`);
    res.status(404).json({ error: 'Building not found' });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});