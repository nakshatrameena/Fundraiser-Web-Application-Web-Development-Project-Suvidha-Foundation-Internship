const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const fundraiserRoutes = require("./routes/fundraisers");
const campaignRoutes = require("./routes/campaignRoutes");

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/fundraisers", fundraiserRoutes);
app.use("/api/campaigns", campaignRoutes);

// Test Route
app.get("/", (req, res) => {
  res.json({ message: "API running successfully 🚀" });
});

// IMPORTANT for Render deployment
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});