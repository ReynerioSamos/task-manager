// Filename: routes/taskRoutes.js
const express = require('express');
const router = express.Router();
// export Task and TaskManager as they do heavy lifting for logic
const Task = require('../classes/task');
const TaskManager = require('../classes/taskmanager');

let tasknum = 1;
const taskManager = new TaskManager();

//main GET / route
import { getHome } from '../controllers/tasks';
router.get('/', getHome);

// POST /add-task route
import { addTask } from '../controllers/tasks';
router.post('/add-task', addTask );

// POST /toggle-task/:id
// responsible for changing tasks from completed and uncompleted
import { toggleTask } from '../controllers/tasks';
router.post('/toggle-task/:id', toggleTask);

 // POST /delete-task/:id, removes task from array, not actually deleted
 // the java garbage collector usually handles unreferenced objects natively
import { deleteTask } from '../controllers/tasks';
router.post('/delete-task/:id', deleteTask);
 
 // GET /search
 // used to search title or desc for string match
import { searchTask } from '../controllers/tasks';
router.get('/search', searchTask);

// GET /filter-tasks
// filts the array based on all, completed or completed status
import { filterTask } from '../controllers/tasks';
router.get('/filter-tasks', filterTask);

// GET /sort
// sorts the array based on criteria (in this case by prio) by ASC or DESC order
import { sortTask } from '../controllers/tasks';
router.get('/sort', sortTask);

// auxillary route to return correct task ID
// NEEDS TO BE DECLARED LAST as a lot of function use this
import { getTaskID } from '../controllers/tasks';
router.get('/:id', getTaskID);

module.exports = router;
