const express = require("express");
const axios = require("axios"); // Import axios for API request
const router = express.Router();
const AirQuality = require("../models/AirQuality.model"); // Import the model

// Function to get location name from latitude and longitude using OpenCage API
const getLocationName = async (latitude, longitude) => {
  try {
    const apiKey = "YOUR_OPENCAGE_API_KEY"; // Replace with your OpenCage API Key
    const response = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`
    );
    const location = response.data.results[0]?.formatted || "Unknown Location"; // Default if no location is found
    return location;
  } catch (error) {
    console.error("Error fetching location name:", error);
    return "Unknown Location";
  }
};

// Save air quality data with location (convert latitude/longitude to location name)
router.post("/air-quality", async (req, res) => {
  const { location, airQuality } = req.body;

  if (!location || !location.latitude || !location.longitude || !airQuality) {
    return res
      .status(400)
      .send({ error: "Location and air quality are required." });
  }

  try {
    // Convert latitude and longitude to location name
    const locationName = await getLocationName(
      location.latitude,
      location.longitude
    );

    // Save the air quality data along with the location name
    const newEntry = new AirQuality({
      location: {
        name: locationName, // Save location name
      },
      airQuality,
    });

    await newEntry.save();
    res.status(201).send({ message: "Data saved successfully" });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).send({ error: "Failed to save data" });
  }
});

// Fetch all air quality data
router.get("/air-quality", async (req, res) => {
  try {
    const data = await AirQuality.find(); // Fetch all records
    res.status(200).json(data); // Send the data as JSON
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send({ error: "Failed to fetch data" });
  }
});

module.exports = router;
