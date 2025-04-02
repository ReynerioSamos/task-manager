//Filename: middleware/validators.js
// Middleware handling Validation for Tasks

//Handles Validating new Tasks
export const validateNewTask = (req, res, next) => {
    const { title, desc, priority} = req.body;
    const errors = [];

    //Title Validation
    // Cannot be empty and b/w 3-100 characters
    if (!title || title.trim().length === 0) {
        const errormsg = 'Title is required';
        errors.push(errormsg);
        console.log(errormsg);
    } else if (title.length < 3) {
        const errormsg = 'Title must be more than 3 characters';
        errors.push(errormsg);
        console.log(errormsg);
    } else if (title.length > 100) {
        const errormsg = 'Title must be less than 100 characters';
        errors.push(errormsg);
        console.log(errormsg);
    }

    //Description Validation
    // Optional, but less than 500 characters
    if (desc && desc.length > 500) {
        const errormsg = 'Description must be less than 500 characters';
        errors.push(errormsg);
        console.log(errormsg);
    }

    //Priority Validation
    // Checks if Priority is 'Low', 'Medium' or 'High'
    if (priority && !['Low', 'Medium', 'High'].includes(priority)) {
        const errormsg = 'Priority must be Low, Medium or High';
        errors.push(errormsg);
        console.log(errormsg);
    }

    //Send appropriate error code 
    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            errors
        });
    }

    next();
};

// Handles update Task validation
export const validateUpdateTask = (req, res, next) => {
    const { title, desc, priority, completed } = req.body;
    const taskID = req.params.id;
    const errors = [];

    //taskID Validation
    // must be an integer
    if (isNaN(parseInt(taskID))) {
        const errormsg = 'taskID must be an integer';
        errors.push(errormsg);
        console.log(errormsg);
    }

    //Validation in similar to validateNewTask(), could've prob partitioned better but here we are
    //Title Validation
    // Cannot be empty and b/w 3-100 characters
    if (title !== undefined) {
        if (title.trim().length === 0) {
            const errormsg = 'Title must no be empty';
            errors.push(errormsg);
            console.log(errormsg);
        } else if (title.length < 3) {
            const errormsg = 'Title must be more than 3 characters';
            errors.push(errormsg);
            console.log(errormsg);
        } else if (title.length > 100) {
            const errormsg = 'Title must be less than 100 characters';
            errors.push(errormsg);
            console.log(errormsg);
        }
    }

    //Description Validation
    // Optional, but less than 500 characters
    if (desc && desc.length > 500) {
        const errormsg = 'Description must be less than 500 characters';
        errors.push(errormsg);
        console.log(errormsg);
    }

    //Priority Validation
    // Checks if Priority is 'Low', 'Medium' or 'High'
    if (priority && !['Low', 'Medium', 'High'].includes(priority)) {
        const errormsg = 'Priority must be Low, Medium, or High';
        errors.push(errormsg);
        console.log(errormsg);
    }

    //Complete Status Validation
    // Checks if completed status is boolean and defined
    if (completed !== undefined && typeof completed !== 'boolean') {
        const errormsg = 'Completed status must be a boolean';
        errors.push(errormsg);
        console.log(errormsg);
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            errors
        });
    }

    next();
};

// Handles Task ID validation for getTasks and deleteTask requests
export const validateTaskID = (req, res, next) => {
    const taskID = req.params.id;

    if (isNaN(parseInt(taskID))) {
        return res.status(400).json({
            success: false,
            errors: ['Task ID must be an integer']
        });
    }
    
    next();
};

// Handlers validation for search, filter and sorting
export const validateQueryParams = (req, res, next) => {
    const {q, status, criteria, order } = req.query;
    const errors=[];

    //Validate search string if provided
    if (q !== undefined && typeof q !== 'string') {
        const errormsg = 'Search query must be a string';
        errors.push(errormsg);
        console.log(errormsg);
    }

    //Validate status if provided
    if (status && !['all', 'completed', 'uncompleted'].includes(status)) {
        const errormsg = 'Status query must be all, completed or uncompleted';
        errors.push(errormsg);
        console.log(errormsg);
    }

    //Validate sort criteria if provided
    if (criteria && !['priority', 'title'].includes(criteria)) {
        const errormsg = 'Sort critria must be by priority or title';
        errors.push(errormsg);
        console.log(errormsg);;
    }

    //Validate sort order if provided
    if (order && !['asc', 'desc'].includes(order)) {
        const errormsg = 'Sort order must be ascending or descending';
        errors.push(errormsg);
        console.log(errormsg);
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            errors
        });
    }
    
    next();
};

export default {
    validateNewTask,
    validateUpdateTask,
    validateTaskID,
    validateQueryParams
};