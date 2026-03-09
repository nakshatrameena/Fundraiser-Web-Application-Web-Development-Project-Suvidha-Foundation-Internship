const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

/* ======================
   MongoDB Connection
====================== */

mongoose.connect("mongodb://127.0.0.1:27017/fundraiserDB")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });

mongoose.connection.once("open", () => {
  console.log("MongoDB Connected");
});

mongoose.connection.on("error", (err) => {
  console.log("MongoDB error:", err);
});

/* ======================
   Routes
====================== */

const fundraiserRoutes = require("./routes/fundraisers");

app.use("/api/fundraisers", fundraiserRoutes);

/* ======================
   Test Route
====================== */

app.get("/", (req, res) => {
  res.json({ message: "Fundraiser API running" });
});

/* ======================
   Start Server
====================== */

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});