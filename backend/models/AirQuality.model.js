const AirQualitySchema = new mongoose.Schema({
  location: {
    latitude: Number,
    longitude: Number,
  },
  airQuality: Number,
  timestamp: { type: Date, default: Date.now },
});
