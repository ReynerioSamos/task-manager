// Filename: controllers/tasksController.js
import TaskManager from "../models/tasksModel.js";
import { Task } from "../models/tasksModel.js";
const taskManager = new TaskManager();

export const getHome = async (req, res) => {
    try {
        const tasks = await taskManager.displayAllTasks();
        res.render('tasks', { tasks });
    } catch (err) {
        console.error('Error fetching tasks', err);
        res.status(500).render('500');
    }
};

export const addTask = async (req, res) => {
    try {
        const { title, desc, priority = 'Medium' } = req.body;
        await taskManager.addTask(title, desc, priority);
        res.redirect('/tasks');
    } catch (err) {
        console.error('Error adding tasks:', err);
        res.status(500).render('500');
    }
};

export const toggleTask = async (req, res) => {
    try {
        const taskID = parseInt(req.params.id);
        const task = await taskManager.toggleTask(taskID);

        if (!task) {
            return res.status(404).send('Task not found :(');
        }
        
        res.redirect('/tasks');
    } catch (err) {
        console.error('Error toggling task: ', err);
        res.status(500).render('500');
    }
 };

 export const deleteTask = async (req, res) => {
    try {
        const taskID = parseInt(req.params.id);
        await taskManager.deleteTask(taskID);
        res.redirect('/tasks');
    } catch (err) {
        console.error('Error deleting task: ', err);
        res.status(500).render('500');
    }
 };

 export const searchTask = async (req, res) => {
    try {
        const searchQuery = req.query.q;
        const tasks = searchQuery && searchQuery.trim() !== ''
            ? await taskManager.searchTasks(searchQuery)
            : await taskManager.displayAllTasks();

        res.render('tasks', { tasks, searchQuery: searchQuery });
    } catch (err) {
        console.error('Error searching tasks: ', err);
        res.status(500).render('500');
    }
};

export const filterTask = async (req, res) => {
    try {
        const status = req.query.status;
        const tasks = await taskManager.filterTasks(status);
        res.render('tasks', { tasks });
    } catch (err) {
        console.error('Error filtering tasks: ', err);
        res.status(500).render('500');
    }
};

export const sortTask = async (req, res) => {
    try {
        const { criteria, order } = req.query;
        const tasks = await taskManager.sortTasks(criteria, order);
        res.render('tasks', {
            tasks,
            sortCriteria: criteria,
            sortOrder: order
        });
    } catch (err) {
        console.error('Error sorting tasks: ', err);
        res.status(500).render('500');
    }
};

export const getTaskID = async (req, res) => {
    try {
        const taskID = parseInt(req.params.id);
        const task = await taskManager.getTask(taskID);

        if (!task) {
            return res.status(404).send('Task not found');
        }

        res.render('task', { task });
    } catch (err) {
        console.error('Error fetching task: ', err);
        res.status(500).render('500');
    }
 };