const Task = require('../models/Task');

exports.createTask = async (req, res) => {
    const { title, dueDate, priority } = req.body;
    const task = new Task({ title, dueDate, priority, userId: req.user._id });

    try {
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: 'Error creating task' });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user._id }).sort({ dueDate: 1 });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks' });
    }
};

exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, dueDate, priority } = req.body;

    try {
        const task = await Task.findByIdAndUpdate(id, { title, dueDate, priority }, { new: true });
        res.json(task);
    } catch (error) {
        res.status(400).json({ message: 'Error updating task' });
    }
};

exports.deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        await Task.findByIdAndDelete(id);
        res.json({ message: 'Task deleted' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting task' });
    }
};