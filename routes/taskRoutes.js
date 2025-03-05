const express = require('express');
const router = express.Router();
// export Task and TaskManager as they do heavy lifting for logic
const Task = require('../classes/task');
const TaskManager = require('../classes/taskmanager');

let tasknum = 1;
const taskManager = new TaskManager();

//main GET / route
router.get('/', (req, res) => {
    const tasks = taskManager.tasks;
    res.render('tasks', {
        tasks
    });
});

// POST /add-task route
router.post('/add-task', (req, res) => {
    const {
        title,
        desc,
        priority = 'Medium' //default value
    } = req.body;

    if (!title || !desc) {
        return res.status(400).send(`Title and description are required.`);
    }
    // Validate priority or default to 'Medium'
    const validPriorities = ['Low', 'Medium', 'High'];
    const taskPriority = validPriorities.includes(priority) ? priority : 'Medium';
    
    // increments the tasknum by 1
    const id = tasknum++;

    // stores and adds new task to array, logs and redirects to home
    const newTask = new Task(id, title, desc, false, taskPriority);
    taskManager.addTask(newTask);
    console.log(`Added new task with ID: ${id} and priority ${taskPriority}`);
    res.redirect('/tasks');
});

// POST /toggle-task/:id
// responsible for changing tasks from completed and uncompleted
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

 // POST /delete-task/:id, removes task from array, not actually deleted
 // the java garbage collector usually handles unreferenced objects natively
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
 
 // GET /search
 // used to search title or desc for string match
router.get('/search', (req, res) => {
    const query = req.query.q; // Get the search query from query parameter

    // Handle empty search query
    if (!query || query.trim() === '') {
        return res.render('tasks', { tasks: taskManager.tasks, searchQuery: query });
    }

    // Perform the search
    const searchResults = taskManager.searchTasks(query);

    // Render the tasks view with search results
    res.render('tasks', { 
        tasks: searchResults, 
        searchQuery: query 
    });
});

// GET /filter-tasks
// filts the array based on all, completed or completed status
 router.get('/filter-tasks', (req, res) => {
    const status = req.query.status; // Get the status from the query parameter

    // Use the filterTasks method to get the filtered tasks
    const filteredTasks = taskManager.filterTasks(status);

    // Render the tasks.ejs file with the filtered tasks
    res.render('tasks', { tasks: filteredTasks });
});

// GET /sort
// sorts the array based on criteria (in this case by prio) by ASC or DESC order
router.get('/sort', (req, res) => {
    const { criteria, order } = req.query;
    
    // Sort tasks
    const sortedTasks = taskManager.sortTasks(criteria, order);

    res.render('tasks', { 
        tasks: sortedTasks,
        sortCriteria: criteria,
        sortOrder: order
    });
});

// auxillary route to return correct task ID
// NEEDS TO BE DECLARED LAST as a lot of function use this
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
