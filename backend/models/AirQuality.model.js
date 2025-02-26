const mongoose = require("mongoose");

const AirQualitySchema = new mongoose.Schema({
  location: {
    name: { type: String, required: true }, // Store location name
  },
  airQuality: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

const AirQuality = mongoose.model("AirQuality", AirQualitySchema);
module.exports = AirQuality;
