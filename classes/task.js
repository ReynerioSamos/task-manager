//filename: classes/task.js
const express = require('express');
// creating task object to store task data
class Task {
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
        //changes completed status
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
    updateTask(newTitle, NewDesc) {
        this.title = newTitle;
        this.desc = NewDesc;
        this.setPriority(newPriority);
    }

}

module.exports = Task;