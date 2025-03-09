const express = require("express");
const axios = require("axios"); // Import axios for API request
const router = express.Router();
const AirQuality = require("../models/AirQuality.model"); // Import the model

// Function to get location name from latitude and longitude using OpenCage API
// const getLocationName = async (latitude, longitude) => {
//   try {
//     const apiKey = "bbc25f7246c44be1bd2506a54adfbbf7"; // Replace with your OpenCage API Key
//     const response = await axios.get(
//       `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`
//     );

//     // Log the entire response to see what is being returned
//     console.log("OpenCage API Response:", response.data);

//     // Check if we have valid results
//     if (response.data.results && response.data.results.length > 0) {
//       const location =
//         response.data.results[0]?.formatted || "Unknown Location";
//       return location;
//     } else {
//       console.error("No valid location found for the coordinates");
//       return "Unknown Location"; // Return a default value if no location is found
//     }
//   } catch (error) {
//     console.error("Error fetching location name:", error);
//     return "Unknown Location"; // Return a default value if there is an error
//   }
// // };

// Save air quality data with location (convert latitude/longitude to location name)

// Store latest values in memory
let airQuality = 0;
let location = null;

router.post("/air-quality", async (req, res) => {
  airQuality = req.body.airQuality;
  // location = req.body.location;
  if (!airQuality) {
    return res
      .status(400)
      .send({ error: "Location and air quality are required." });
  }

  try {
    // Save the air quality data along with the location name
    const newEntry = new AirQuality({
      location,
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
router.post("/air-quality/location", async (req, res) => {
  if (typeof req.body.location === "object" && req.body.location.name) {
    location = req.body.location.name; // Extract `name` from the object
  } else {
    location = req.body.location; // Directly assign if it's a string
  }

  res.status(200).json({ message: "Location updated", location });
});

module.exports = router;
