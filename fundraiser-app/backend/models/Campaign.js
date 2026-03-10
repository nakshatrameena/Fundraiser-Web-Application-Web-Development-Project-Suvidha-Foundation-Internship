const mongoose = require("mongoose");

const CampaignSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  goalAmount: { type: Number, required: true },
  creatorName: { type: String, required: true },
  raisedAmount: { type: Number, default: 0 }
});

module.exports = mongoose.model("Campaign", CampaignSchema);