const express = require("express");
const cors = require("cors");
const buildings = require("./buildings.json");

const app = express();
app.use(cors());

// Route to get all buildings
app.get("/buildings", (req, res) => {
  console.log("GET /buildings - Returning all buildings");
  res.json(buildings);
});

// Route to get a specific building by ID
app.get("/buildings/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log(`GET /buildings/${id} - Looking for building with ID: ${id}`);
  const building = buildings.find((b) => b.id === id);
  if (building) {
    console.log(`Building found: ${building.name}`);
    res.json(building);
  } else {
    console.log(`Building with ID ${id} not found`);
    res.status(404).json({ error: "Building not found" });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});