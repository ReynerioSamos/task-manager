// Filename: routes/taskRoutes.js
import express from 'express';
import { Task, TaskManager } from '../models/tasksModel.js';
import {
    getHome,
    addTask,
    toggleTask,
    deleteTask,
    searchTask,
    filterTask,
    sortTask,
    getTaskID
} from '../controllers/tasksController.js'
const router = express.Router();
const taskManager = new TaskManager();

//main GET / route
router.get('/', getHome);

// POST /add-task route
router.post('/add-task', addTask );

// POST /toggle-task/:id
// responsible for changing tasks from completed and uncompleted
router.post('/toggle-task/:id', toggleTask);

 // POST /delete-task/:id, removes task from array, not actually deleted
 // the java garbage collector usually handles unreferenced objects natively
router.post('/delete-task/:id', deleteTask);
 
 // GET /search
 // used to search title or desc for string match
router.get('/search', searchTask);

// GET /filter-tasks
// filts the array based on all, completed or completed status
router.get('/filter-tasks', filterTask);

// GET /sort
// sorts the array based on criteria (in this case by prio) by ASC or DESC order
router.get('/sort', sortTask);

// auxillary route to return correct task ID
// NEEDS TO BE DECLARED LAST as a lot of function use this
router.get('/:id', getTaskID);

export default router;
