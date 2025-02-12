const express = require("express");
const router = express.Router();
const AirQuality = require("../models/AirQuality.model"); // Import the model

// Save air quality data with location
router.post("/air-quality", async (req, res) => {
  const { location, airQuality } = req.body;
  if (!location || !airQuality) {
    return res
      .status(400)
      .send({ error: "Location and air quality are required." });
  }
  try {
    const newEntry = new AirQuality({ location, airQuality });
    await newEntry.save();
    res.status(201).send({ message: "Data saved successfully" });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).send({ error: "Failed to save data" });
  }
});

// Fetch all air quality data
// router.get("/air-quality/data", async (req, res) => {
//   try {
//     const data = await AirQuality.find(); // Fetch all records
//     res.status(200).json(data); // Send the data as JSON
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     res.status(500).send({ error: "Failed to fetch data" });
//   }
// });

module.exports = router;
