const mongoose = require("mongoose");

const AirQualitySchema = new mongoose.Schema({
  location: {
    latitude: Number,
    longitude: Number,
  },
  airQuality: Number,
  timestamp: { type: Date, default: Date.now },
});

const AirQuality = mongoose.model("AirQuality", AirQualitySchema);
module.exports = AirQuality;
