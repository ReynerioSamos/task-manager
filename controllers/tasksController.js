// Filename: controllers/tasksController.js
import { Task, TaskManager } from "../models/tasksModel.js";
const taskManager = new TaskManager();

export const getHome = (req, res) => {
    const tasks = taskManager.tasks;
    res.render('tasks', { tasks });
};

export const addTask = (req, res) => {
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

    // stores and adds new task to array, logs and redirects to home
    const newTask = taskManager.addTask(title,desc, priority);
    console.log(`Added new task with priority ${taskPriority}`);
    res.redirect('/tasks');
};

export const toggleTask = (req, res) => {
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
 };

 export const deleteTask = (req, res) => {
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
 };

 export const searchTask = (req, res) => {
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
};

export const filterTask = (req, res) => {
    const status = req.query.status; // Get the status from the query parameter

    // Use the filterTasks method to get the filtered tasks
    const filteredTasks = taskManager.filterTasks(status);

    // Render the tasks.ejs file with the filtered tasks
    res.render('tasks', { tasks: filteredTasks });
};

export const sortTask = (req, res) => {
    const { criteria, order } = req.query;
    
    // Sort tasks
    const sortedTasks = taskManager.sortTasks(criteria, order);

    res.render('tasks', { 
        tasks: sortedTasks,
        sortCriteria: criteria,
        sortOrder: order
    });
};

export const getTaskID = (req, res) => {
    const taskID = parseInt(req.params.id, 10);
    const task = taskManager.getTask(taskID);

    if (!task) {
        return res.status(400).send(`Task not found`);
    }
    res.render('task', {
        task
    });
 };