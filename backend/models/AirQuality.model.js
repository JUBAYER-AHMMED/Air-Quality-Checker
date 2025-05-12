const mongoose = require("mongoose");

const AirQualitySchema = new mongoose.Schema({
  location: {
    type: String,
    // required: true,
  }, // Store location name

  airQuality: { type: String, required: true },

  timestamp: { type: Date, default: Date.now },
});

const AirQuality = mongoose.model("AirQuality", AirQualitySchema);
module.exports = AirQuality;
