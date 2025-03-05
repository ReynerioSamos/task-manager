//filename: classes/task.js
const express = require('express');
// creating task object to store task data
class Task {
    // all tasks are initialized as uncompleted
    constructor(id, title, desc, completed = false) {
        this.id = id;
        this.title = title;
        this.desc = desc;
        this.completed = completed;
    }

    toggleCompleted() {
        //changes completed status
        this.completed = !this.completed;
    }

    // display task data
    displayTask() {
        console.log(`Task ID: ${this.id}`);
        console.log(`Title: ${this.title}`);
        console.log(`Description: ${this.desc}`);
        console.log(`Completed?: ${this.completed}`);
    }

    // update task data
    updateTask(newTitle, NewDesc) {
        this.title = newTitle;
        this.desc = NewDesc;
    }

}

module.exports = Task;