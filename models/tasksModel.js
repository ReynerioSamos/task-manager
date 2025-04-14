// Filename: models/tasksModel.js
import { query } from "../config/db.js";

export class Task {
    // all tasks are initialized as uncompleted with medium prio
    constructor(id, title, desc, completed = false, priority = 'Medium', created_at, updated_at) {
        this.id = id;
        this.title = title;
        this.desc = desc;
        this.completed = completed;
        this.priority = priority;
        this.created_at = created_at;
        this.updated_at = updated_at;

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
    // Commented out as data is not stored in a DB, kep around incase
/*
    constructor() {
        this.tasks = [];
        this.taskCounter = 1; // Added to manage task IDs
    }
*/

    // Operations Converted to asycn to handle db functions without halting
    // add a new task to the array, takes task obj

    async addTask(title, desc, priority = 'Medium') {
        const validPriorities = ['Low', 'Medium', 'High'];
        const taskPriority = validPriorities.includes(priority) ? priority : 'Medium';
        
        const result = await query(
            `INSERT INTO tasks (title, description, priority)
             VALUES ($1, $2, $3)
             RETURNING *`,
             [title, desc, taskPriority]
        );
        
        return new Task(
            result.rows[0].id,
            result.rows[0].title,
            result.rows[0].description,
            result.rows[0].completed,
            result.rows[0].priority,
            result.rows[0].created_at,
            result.rows[0].updated_at
        );
    }

    // display task given id from array, takes int
    async getTask(taskID) {
        const result = await query(
            `SELECT * FROM tasks WHERE id = $1`,
            [taskID]
        );

        // If no result is found in db
        if (result.rows.length === 0) return null;

        const taskData = result.rows[0];
        return new Task(
            taskData.id,
            taskData.title,
            taskData.description,
            taskData.completed,
            taskData.priority,
            taskData.created_at,
            taskData.updated_at
        );
    }

    // delete task given id from array, takes int
    async deleteTask(taskID) {
        await query (
            `DELETE FROM tasks WHERE id = $1`,
            [taskID]
        );
    }

    // display all current tasks in the array
    async displayAllTasks() {
        const result = await query(`SELECT * FROM tasks`);
        return result.rows.map(row => new Task (
            row.id,
            row.title,
            row.description,
            row.completed,
            row.priority,
            row.created_at,
            row.updated_at
        ));
    }
    // included now that db handles toggling
    async toggleTask(taskID) {
        const result = await query(
            `UPDATE tasks
             SET completed = NOT completed,
                 updated_at = NOW()
             WHERE id = $1
             RETURNING *`,
             [taskID]
        );

        if (result.rows.length === 0) return null;

        const taskData = result.rows[0];
        return new Task(
            taskData.id,
            taskData.title,
            taskData.description,
            taskData.completed,
            taskData.priority,
            taskData.created_at,
            taskData.updated_at,
        );
    }

    async searchTasks(searchQuery) {
        // Convert query to lowercase for case-insensitive search
        const lowercaseSearchQuery = `%${searchQuery.toLowerCase().trim()}%`;
        
        const result = await query(
            `SELECT * FROM tasks
             WHERE LOWER(title) LIKE $1
             OR LOWER(description) LIKE $1`,
            [lowercaseSearchQuery]
        );

        return result.rows.map(row => new Task(
            row.id,
            row.title,
            row.description,
            row.completed,
            row.priority,
            row.created_at,
            row.updated_at,
        ));
    }
    
    //filters tasks based on their status, takes it a string and corresponds correct boolean val
    async filterTasks(status) {
        // Requires a split query, as filter is a conditional
        let queryText = 'SELECT * FROM tasks'; // initial query
        let params = []; //additional query text for conditionals

        if (status === 'completed') {
            queryText += ' WHERE completed = true';
        } else if (status === 'uncompleted') {
            queryText += ' WHERE completed = false';
        }

        const result = await query(queryText, params);
        return result.rows.map(row => new Task(
            row.id,
            row.title,
            row.description,
            row.completed,
            row.priority,
            row.created_at,
            row.updated_at,
        ));
    }

    async sortTasks(criteria = 'priority', order = 'desc') {
        let queryText = 'SELECT * FROM tasks';

        
        // Define priority order
        // Since prio is defined by an int of 1 2 or 3, we use those to order them in query call
        if (criteria == 'priority'){
            queryText += 
                ` ORDER BY
                    CASE priority
                        WHEN 'High' THEN 1
                        WHEN 'Medium' THEN 2
                        WHEN 'Low' THEN 3
                    END ${order === 'desc' ? 'ASC' : 'DESC'}`;
        } else if (criteria === 'title') { //if by title, it returns either asc or desc
            queryText += ` ORDER BY title ${order === 'desc' ? 'DESC' : 'ASC'}`;
        }
        
        const result = await query(queryText);
        return result.rows.map(row => new Task(
            row.id,
            row.title,
            row.description,
            row.completed,
            row.priority,
            row.created_at,
            row.updated_at,
        ));
    }
}

export default TaskManager;