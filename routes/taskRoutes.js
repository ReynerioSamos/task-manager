const express = require('express');
const router = express.Router();
const Task = require('../classes/task');
const TaskManager = require('../classes/taskmanager');

let tasknum = 0;
const taskManager = new TaskManager();

router.get('/', (req, res) => {
    const tasks = taskManager.tasks;
    res.render('tasks', {
        tasks
    });
});

router.post('/add-task', (req, res) => {
    const {
        title,
        desc
    } = req.body;

    if (!title || !desc) {
        return res.status(400).send(`Title and description are required.`);
    }

    const id = tasknum;
    tasknum = tasknum++;

    const newTask = new Task(id, title, desc);
    taskManager.addTask(newTask);
    res.redirect('/tasks');
});

router.post('/toggle-task/:id', (req, res) => {
    const taskID = req.params.id;
    const task = taskManager.getTask(taskID);

    if (!task) {
        return res.status(404).send(`Task not found`);
    }
    task.toggleCompleted;
    res.redirect('/tasks');
 });

 router.post('/delete-task/:id', (req, res) => {
    const taskId = req.params.id;
    taskManager.deleteTask(taskId);
    res.redirect('/tasks');
 });

 router.get('/:id', (req, res) => {
    const taskID = req.params.id;
    const task = taskManager.getTask(taskID);

    if (!task) {
        return res.status(400).send(`Task not found`);
    }
    res.render('task', {
        task
    });
 });

 module.exports = router;
