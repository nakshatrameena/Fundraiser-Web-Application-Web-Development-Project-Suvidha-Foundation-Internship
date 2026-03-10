const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  campaignId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Campaign",
    required: true
  },

  donorName: {
    type: String,
    required: true
  },

  amount: {
    type: Number,
    required: true
  },

  message: {
    type: String
  },

  donatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Donation", donationSchema);