const express = require("express");

const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// GET ALL TASKS
router.get("/", authMiddleware, async (req, res) => {

  const tasks = await Task.find({ user: req.user.id });

  res.json(tasks);

});


// CREATE TASK
router.post("/", authMiddleware, async (req, res) => {

  const { title, description } = req.body;

  const task = new Task({
    title,
    description,
    user: req.user.id
  });

  await task.save();

  res.json(task);

});


// UPDATE TASK
router.put("/:id", authMiddleware, async (req, res) => {

  const task = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(task);

});


// DELETE TASK
router.delete("/:id", authMiddleware, async (req, res) => {

  await Task.findByIdAndDelete(req.params.id);

  res.json({ message: "Task deleted" });

});

module.exports = router;