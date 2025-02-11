const express = require("express");
const router = express.Router();
const AirQuality = require("../models/AirQuality");

// Save air quality data
router.post("/api/air-quality", async (req, res) => {
  const { airQuality } = req.body;

  if (!airQuality) {
    return res.status(400).send({ error: "Air quality is required." });
  }

  try {
    const newEntry = new AirQuality({ airQuality });
    await newEntry.save();
    res.status(201).send({ message: "Air quality data saved successfully." });
  } catch (error) {
    console.error("Error saving air quality:", error);
    res.status(500).send({ error: "Failed to save air quality." });
  }
});

// Save or update location data
router.post("/api/set-location", async (req, res) => {
  const { location } = req.body;

  if (!location) {
    return res.status(400).send({ error: "Location is required." });
  }

  try {
    // Update the most recent air quality entry with the location
    const result = await AirQuality.updateOne(
      {},
      { $set: { location } },
      { sort: { _id: -1 } } // Sort by most recent
    );

    if (result.modifiedCount === 0) {
      return res.status(404).send({ error: "No air quality data to update." });
    }

    res.status(201).send({ message: "Location data saved successfully." });
  } catch (error) {
    console.error("Error saving location:", error);
    res.status(500).send({ error: "Failed to save location." });
  }
});

module.exports = router;
