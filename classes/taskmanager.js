// Filename: classes/taskmanager.js
// A lot of the array manipulation is done here alongside sorting and searching


const Task = require('./task');
const path = require('path');

// class datastructure to manage tasks using arrays
class TaskManager {
    // empty array
    constructor() {
        this.tasks = [];
    }

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

    searchTasks(query) {
        // Convert query to lowercase for case-insensitive search
        const lowercaseQuery = query.toLowerCase().trim();
        
        // Filter tasks where either title or description includes the query
        return this.tasks.filter(task => 
            task.title.toLowerCase().includes(lowercaseQuery) || 
            task.desc.toLowerCase().includes(lowercaseQuery)
        );
    }
    
    //filters tasks based on their status, takes it a string and corresponds correct boolean val
    filterTasks(status) {
        if (status === 'completed') {
            return this.tasks.filter(task => task.completed === true);
        } else if (status === 'uncompleted') {
            return this.tasks.filter(task => task.completed === false);
        } else {
            return this.tasks; // Return all tasks if status is 'all' or invalid
        }
    }

    sortTasks(criteria = 'priority', order = 'desc') {
        // Define priority order
        const priorityOrder = {
            'High': 3,
            'Medium': 2,
            'Low': 1
        };

        // sorts from highest to lowest or lowest to highest based on criteria (in this case prio)
        return this.tasks.sort((a, b) => {
            switch(criteria) {
                case 'priority':
                    const priorityComparison = priorityOrder[b.priority] - priorityOrder[a.priority];
                    return order === 'desc' ? priorityComparison : -priorityComparison;
                
                case 'title':
                    return order === 'desc' 
                        ? b.title.localeCompare(a.title) 
                        : a.title.localeCompare(b.title);
                
                default:
                    return 0;
            }
        });
    }
}

module.exports = TaskManager;