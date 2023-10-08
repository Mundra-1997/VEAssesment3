const Task = require('../Models/Task');

// Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a single task by ID
exports.getTaskById = async (req, res) => {
  const taskId = req.params.id;
  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new task
exports.createTask = async (req, res) => {
  const { title, description, completed } = req.body;
  try {
    const task = new Task({
      title,
      description,
      completed,
    });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: 'Bad Request' });
  }
};

// Update a task by ID
exports.updateTaskById = async (req, res) => {
  const taskId = req.params.id;
  const { title, description, completed } = req.body;
  try {
    const task = await Task.findByIdAndUpdate(
      taskId,
      { title, description , completed},
      
    );
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a task by ID
exports.deleteTaskById = async (req, res) => {
  const taskId = req.params.id;
  try {
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(204).send(task);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
