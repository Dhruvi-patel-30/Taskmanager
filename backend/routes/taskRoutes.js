import express from "express";
import Task from "../models/Task.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create Task
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description } = req.body;

    const task = new Task({
      title,
      description,
      userId: req.user.id,
    });

    await task.save();

    res.status(201).json({
      message: "Task Created Successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Get All Tasks
router.get("/", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({
      userId: req.user.id,
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Update Task
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id,
      },
      req.body,
      { new: true },
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Delete Task
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json({
      message: "Task Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Toggle Status
router.patch("/:id/status", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    task.status = task.status === "Pending" ? "Completed" : "Pending";

    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;
