//Filename: middleware/validators.js
// Middleware handling Validation for Tasks

//Handles Validating new Tasks
export const validateNewTask = (req, res, next) => {
    const { title, desc, priority} = req.body;
    const errors = [];

    //Title Validation
    // Cannot be empty and b/w 3-100 characters
    if (!title || title.trim().length === 0) {
        errors.push('Title is required');
    } else if (title.length < 3) {
        errors.push('Title must be more than 3 characters');
    } else if (title.length > 100) {
        errors.push('Title must be less than 100 characters');
    }

    //Description Validation
    // Optional, but less than 500 characters
    if (desc && desc.length > 500) {
        errors.push('Description must be less than 500 characters');
    }

    //Priority Validation
    // Checks if Priority is 'Low', 'Medium' or 'High'
    if (priority && !['Low', 'Medium', 'High'].includes(priority)) {
        errors.push('Priority must be <Low>, <Medium> or <High>');
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
    errors.push('Task ID must be an integer');
    }

    //Validation in similar to validateNewTask(), could've prob partitioned better but here we are
    //Title Validation
    // Cannot be empty and b/w 3-100 characters
    if (title !== undefined) {
        if (title.trim().length === 0) {
            errors.push('Title is required');
        } else if (title.length < 3) {
            errors.push('Title must be more than 3 characters');
        } else if (title.length > 100) {
            errors.push('Title must be less than 100 characters');
        }
    }

    //Description Validation
    // Optional, but less than 500 characters
    if (desc && desc.length > 500) {
        errors.push('Description must be less than 500 characters');
    }

    //Priority Validation
    // Checks if Priority is 'Low', 'Medium' or 'High'
    if (priority && !['Low', 'Medium', 'High'].includes(priority)) {
        errors.push('Priority must be <Low>, <Medium> or <High>');
    }

    //Complete Status Validation
    // Checks if completed status is boolean and defined
    if (completed !== undefined && typeof completed !== 'boolean') {
        errors.push('Completed must be boolean value');
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
        errors.push('Search query must be a string');
    }

    //Validate status if provided
    if (status && !['all', 'completed', 'uncompleted'].includes(status)) {
        errors.push('Status must be all, completed, or uncompleted');
    }

    //Validate sort criteria if provided
    if (criteria && !['priority', 'title'].includes(criteria)) {
        errors.push('Sort criteria must be priority or title');
    }

    //Validate sort order if provided
    if (order && !['asc', 'desc'].includes(order)) {
        errors.push('Sort order must be asc or desc');
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