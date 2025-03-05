const express = require('express');
const router = express.Router();
const TaskManager = require('../classes/taskmanager');

const taskManager = new TaskManager();

router.get('/', (req, res) => {
    const tasks = taskManager.displayAllTasks();
    res.json(tasks);
});

router.post('add-task', (req, res) => {
    const {title, description } = req.body;
    if (!title || !description) {
        return res.status(400).json({ error: 'Title and description are required' });
    }

    const newTask = taskManager.addTask(title,description);
    res.status(201).json(newTask);
});

router.post('/toggle-task/:id', (req, res) => {
    const { id } = req.params;

    if (taskManager.toggleTaskStatus(id)){
        res.json({ message: 'Task status toggled successfully'});
    } else {
        res.status(404).json({ error: 'Task not found'});
    }
 });

 router.post('/delete-task/:id', (req, res) => {
    const { id } = req.params;

    if (taskManager.deleteTask(id)) {
        res.join({ message: 'Task deleted succeessfully' });
    } else {
        res.status(404).json({ error: 'Task not found'});
    }
 });

 module.exports = router;
