require("dotenv").config();
const express = require("express");
const cors = require("cors"); // <-- Add this line
const router = require("./router/sendData.route");
const { connectToDB } = require("./connection");
const AirQuality = require("./models/AirQuality.model");

const app = express();
const PORT = process.env.PORT || 3030;

// Middleware
app.use(cors()); // <-- Enable CORS for all origins
app.use(express.json());

// Connect to MongoDB
connectToDB(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection failed:", err));

// Routes
app.use("/api", router);

// Root route
// app.get("/", (req, res) => {
//   // res.send("Welcome to the Air Quality API!");
// });
app.get("/", async (req, res) => {
  try {
    const data = await AirQuality.find(); // Fetch all records
    res.status(200).json(data); // Send the data as JSON
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send({ error: "Failed to fetch data" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
