const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("Database connection failed:", err));

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