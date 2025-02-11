const mongoose = require("mongoose");

// Mongoose schema
const AirQualitySchema = new mongoose.Schema({
  location: String,
  airQuality: Number,
  timestamp: { type: Date, default: Date.now },
});

const AirQuality = mongoose.model("AirQuality", AirQualitySchema);
module.exports = AirQuality;
