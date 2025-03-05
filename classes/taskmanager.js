//filename: classes/taskmanager.js
const Task = require('./task');
const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'task.json');
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
    // delete task given id from array, takes int
    deleteTask(taskIDToDelete) {
        this.tasks = this.tasks.filter(task => task.id !== taskIDToDelete)
    }
    // display task iven id from array, takes int
    getTask(taskID) {
        return this.tasks.find(task => task.id === taskID);
    }
    // display all current tasks in the array
    displayAllTasks() {
        this.tasks.forEach(task => task.displayAllTasks());
    }
    // filters tasks based on completed status, takes string
    displayFilteredTasks(status) {
        const filteredTasks = this.tasks.filter(task => task.completed === status);

        if (filteredTasks.length === 0){
            console.log(`No tasks found with completed status: ${status}`);
            return;
        }

        console.log(`Tasks with completed status: ${status}`);
        filteredTasks.forEach(task => task.displayTask());
    }
}

module.exports = TaskManager;