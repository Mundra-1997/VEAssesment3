const express = require('express');
const router = express.Router();
const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTaskById,
  deleteTaskById,
} = require('../Controllers/controllers');

// GET all tasks
router.get('/', getAllTasks);

// GET a single task by ID
router.get('/:id', getTaskById);

// POST create a new task
router.post('/', createTask);

// PUT update a task by ID
router.put('/:id', updateTaskById);

// DELETE a task by ID
router.delete('/:id', deleteTaskById);

module.exports = router;
