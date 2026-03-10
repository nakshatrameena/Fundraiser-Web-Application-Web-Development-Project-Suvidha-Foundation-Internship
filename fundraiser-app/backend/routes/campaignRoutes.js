const express = require("express");
const router = express.Router();
const Campaign = require("../models/Campaign");

// GET all campaigns
router.get("/", async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE campaign
router.post("/", async (req, res) => {
  try {
    const campaign = new Campaign({
      title: req.body.title,
      description: req.body.description,
      goalAmount: req.body.goalAmount,
      creatorName: req.body.creatorName,
      raisedAmount: 0,
    });
    const saved = await campaign.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DONATE to campaign
router.post("/donate/:id", async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    campaign.raisedAmount += req.body.amount;
    const updated = await campaign.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE campaign
router.put("/:id", async (req, res) => {
  try {
    const updated = await Campaign.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE campaign
router.delete("/:id", async (req, res) => {
  try {
    await Campaign.findByIdAndDelete(req.params.id);
    res.json({ message: "Campaign deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
