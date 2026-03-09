const express = require("express");
const router = express.Router();
const Fundraiser = require("../models/Fundraiser");

/* ======================
   GET all fundraisers
====================== */

router.get("/", async (req, res) => {

  try {

    const fundraisers = await Fundraiser.find();

    res.json(fundraisers);

  } catch (err) {

    res.status(500).json({ error: err.message });

  }

});


/* ======================
   CREATE fundraiser
====================== */

router.post("/", async (req, res) => {

  try {

    const fundraiser = new Fundraiser({
      title: req.body.title,
      description: req.body.description,
      goalAmount: req.body.goalAmount,
      raisedAmount: 0
    });

    const saved = await fundraiser.save();

    res.json(saved);

  } catch (err) {

    res.status(500).json({ error: err.message });

  }

});


/* ======================
   DONATE
====================== */

router.post("/donate/:id", async (req, res) => {

  try {

    const fundraiser = await Fundraiser.findById(req.params.id);

    fundraiser.raisedAmount += req.body.amount;

    const updated = await fundraiser.save();

    res.json(updated);

  } catch (err) {

    res.status(500).json({ error: err.message });

  }

});


/* ======================
   UPDATE fundraiser
====================== */

router.put("/:id", async (req, res) => {

  try {

    const updated = await Fundraiser.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);

  } catch (err) {

    res.status(500).json({ error: err.message });

  }

});


/* ======================
   DELETE fundraiser
====================== */

router.delete("/:id", async (req, res) => {
  try {

    await Fundraiser.findByIdAndDelete(req.params.id);

    res.json({ message: "Fundraiser deleted successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;