// Filename: models/tasksModel.js
// import { query } from "../config/db.js";

export class Task {
    // all tasks are initialized as uncompleted with medium prio
    constructor(id, title, desc, completed = false, priority = 'Medium') {
        this.id = id;
        this.title = title;
        this.desc = desc;
        this.completed = completed;
        this.priority = priority;

        // Validate and set priority
        const validPriorities = ['Low', 'Medium', 'High'];
        this.priority = validPriorities.includes(priority) ? priority : 'Medium';
    }

    toggleCompleted() {
        this.completed = !this.completed;
    }

    setPriority(newPriority) {
        // Validate priority
        const validPriorities = ['Low', 'Medium', 'High'];
        if (validPriorities.includes(newPriority)) {
            this.priority = newPriority;
        } else {
            throw new Error('Invalid priority level');
        }
    }

    // display task data
    displayTask() {
        console.log(`Task ID: ${this.id}`);
        console.log(`Title: ${this.title}`);
        console.log(`Description: ${this.desc}`);
        console.log(`Completed?: ${this.completed}`);
        console.log(`Priority: ${this.priority}`);
    }

    // update task data
    updateTask(newTitle, newDesc, newPriority) {
        this.title = newTitle;
        this.desc = newDesc;
        this.setPriority(newPriority);
    }
}

export class TaskManager {
    constructor() {
        this.tasks = [];
        this.taskCounter = 1; // Added to manage task IDs
    }

    // add a new task to the array, takes task obj
    addTask(title, desc, priority = 'Medium') {
        const validPriorities = ['Low', 'Medium', 'High'];
        const taskPriority = validPriorities.includes(priority) ? priority : 'Medium';
        
        const newTask = new Task(
            this.taskCounter++, 
            title, 
            desc, 
            false, 
            taskPriority
        );
        
        this.tasks.push(newTask);
        return newTask;
    }

    // display task given id from array, takes int
    getTask(taskID) {
        const task = this.tasks.find(task => task.id === taskID);
        return task;
    }

    // delete task given id from array, takes int
    deleteTask(taskIDToDelete) {
        this.tasks = this.tasks.filter(task => task.id !== taskIDToDelete);
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
