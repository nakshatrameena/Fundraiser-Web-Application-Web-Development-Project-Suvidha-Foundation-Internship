const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const fundraiserRoutes = require("./routes/fundraisers");
const campaignRoutes = require("./routes/campaignRoutes");

const app = express();

// connect database
connectDB();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/fundraisers", fundraiserRoutes);
app.use("/api/campaigns", campaignRoutes);

// test route
app.get("/", (req, res) => {
  res.json({ message: "API running" });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));