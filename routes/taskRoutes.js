// Filename: routes/taskRoutes.js

import express from 'express';
// Import the TaskManager model
import { TaskManager } from '../models/tasksModel.js';
// Import the Task Controllers
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

//Import the Validation middleware
import {
    validateNewTask,
    validateUpdateTask,
    validateTaskID,
    validateQueryParams
} from '../middleware/TaskValidators.js';

const router = express.Router();
const taskManager = new TaskManager();

//main GET / route
router.get('/', getHome);

// POST /add-task route
router.post('/add-task', validateNewTask, addTask );

// POST /toggle-task/:id
// responsible for changing tasks from completed and uncompleted
router.post('/toggle-task/:id', validateTaskID, toggleTask);

// POST /delete-task/:id, removes task from array, not actually deleted
// the java garbage collector usually handles unreferenced objects natively
router.post('/delete-task/:id', validateTaskID, deleteTask);
 
// GET /search
// used to search title or desc for string match
router.get('/search', validateQueryParams, searchTask);

// GET /filter-tasks
// filts the array based on all, completed or completed status
router.get('/filter-tasks', validateQueryParams, filterTask);

// GET /sort
// sorts the array based on criteria (in this case by prio) by ASC or DESC order
router.get('/sort', validateQueryParams, sortTask);

// auxillary route to return correct task ID
// NEEDS TO BE DECLARED LAST as a lot of function use this
router.get('/:id', validateTaskID, getTaskID);

export default router;
