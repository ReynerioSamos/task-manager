const express = require('express');
const router = express.Router();
const Task = require('../classes/task');
const TaskManager = require('../classes/taskmanager');

let tasknum = 1;
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

    const id = tasknum++;

    const newTask = new Task(id, title, desc);
    taskManager.addTask(newTask);
    console.log(`Added new task with ID: ${id}`);
    res.redirect('/tasks');
});

router.post('/toggle-task/:id', (req, res) => {
    const taskID = parseInt(req.params.id);
    console.log(`Attempting to toggle task with ID: ${taskID}`);
    const task = taskManager.getTask(taskID);
    if (!task) {
        console.log(`Task with ID: ${taskID} was not found`);
        return res.status(404).send(`Task not found`);
    }
    task.toggleCompleted();
    console.log(`Task with ID: ${taskID} was successfully toggled with new status: `, task.completed);
    res.redirect('/tasks');
 });

router.post('/delete-task/:id', (req, res) => {
    const taskID = parseInt(req.params.id, 10);
    console.log(`Attempting to delete task with ID: ${taskID}`);
    console.log(`Current tasks:`, taskManager.tasks);
    const task = taskManager.getTask(taskID);
    if (!task) {
        console.log(`Task with ID: ${taskID} not found`);
        return res.status(404).send(`Task not found`);
    }
    taskManager.deleteTask(taskID);
    console.log(`Task with ID: ${taskID} deleted successfully`)
    console.log(`Remaining tasks:`, taskManager.tasks);
    res.redirect('/tasks');
 });

 router.get('/:id', (req, res) => {
    const taskID = parseInt(req.params.id, 10);
    const task = taskManager.getTask(taskID);

    if (!task) {
        return res.status(400).send(`Task not found`);
    }
    res.render('task', {
        task
    });
 });

 module.exports = router;
