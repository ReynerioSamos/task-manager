//filename: classes/taskmanager.js
const Task = require('./task');
//const fs = require('fs');
const path = require('path');

//const DATA_FILE = path.join(__dirname, 'task.json');
// class datastructure to manage tasks using arrays
class TaskManager {
    // empty array
    constructor() {
        this.tasks = [];
        //this.nextID = 1;
        //this.loadTasks();
    }

    // below is code to implement saving tasks to a file
/*
    loadTasks() {
        try {
            const data = fs.readFileSync(DATA_FILE, 'utf-8');
            const parsedData = JSON.parse(data);

            this.tasks = parsedData.task.map(taskData => new Task(taskData.id, taskData.title, 
                                            taskData.desc, taskData.completed));
            this.nextID = parsedData.nextID;
        } catch (err) {
            console.warn('Could not load tasks from file. Starting with an empty task list', err);
            this.tasks = [];
            this.nextID = 1;
            this.saveTasks();
        }
    }

    saveTasks() {
        const data = JSON.stringify({ tasks: this.tasks, nextID: this.nextID}, null, 2);
        fs.writeFileSync(DATA_FILE, data);
    }
    */
    // add a new task to the array, takes task obj
    addTask(task) {
        this.tasks.push(task);
    }

    // display task given id from array, takes int
    getTask(taskID) {
        const task = this.tasks.find(task => task.id === taskID);
        console.log(`Looking for task with ID ${taskID} . Found:`, task);
        return task;
    }

    // delete task given id from array, takes int
    deleteTask(taskIDToDelete) {
        this.tasks = this.tasks.filter(task => task.id !== taskIDToDelete);
        console.log(`Task with ID: ${taskIDToDelete} deleted. Remaining tasks`, this.tasks);
    }

    // display all current tasks in the array
    displayAllTasks() {
        this.tasks.forEach(task => task.displayTask());
    }

    filterTasks(status) {
        if (status === 'completed') {
            return this.tasks.filter(task => task.completed === true);
        } else if (status === 'uncompleted') {
            return this.tasks.filter(task => task.completed === false);
        } else {
            return this.tasks; // Return all tasks if status is 'all' or invalid
        }
    }
}

module.exports = TaskManager;