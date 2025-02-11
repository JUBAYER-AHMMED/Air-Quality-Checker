const express = require("express");
const router = express.Router();
const AirQuality = require("../models/AirQuality.model"); // Import the model

router.post("/air-quality", async (req, res) => {
  const { location, airQuality } = req.body;
  try {
    const newEntry = new AirQuality({ location, airQuality });
    await newEntry.save();
    res.status(201).send({ message: "Data saved successfully" });
  } catch (error) {
    res.status(500).send({ error: "Failed to save data" });
  }
});

module.exports = router;
