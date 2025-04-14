// Filename: routes/taskRoutes.js

import express from 'express';
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

router.get('/', getHome);
router.post('/add-task', validateNewTask, addTask );
router.post('/toggle-task/:id', validateTaskID, toggleTask);
router.post('/delete-task/:id', validateTaskID, deleteTask);
router.get('/search', validateQueryParams, searchTask);
router.get('/filter-tasks', validateQueryParams, filterTask);
router.get('/sort', validateQueryParams, sortTask);
router.get('/:id', validateTaskID, getTaskID);

export default router;
