//filename: app.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

import { connectToDatabase } from './config/db.js';

// calling the middleware to be used
import {
    // helps with logging routes
    loggingMiddleware,
    // redirects to another route
    redirectingMiddleware,
    errorHandlingMiddleware,
} from './middleware/middleware.js';

import taskRoutes from './routes/taskRoutes.js';

app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(process.cwd(), "public")));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));

//redirects '/' to '/tasks' since main functionality of app is there ans using tasks.ejs view
app.get('/', (req, res) => {res.redirect('/tasks');});
app.use(loggingMiddleware)
app.use('/tasks', taskRoutes);


// these are the routes that will be redirected to the homepage
const routesToRedirect = [''];
// defaults to redirecting back to homepage
app.use(redirectingMiddleware(routesToRedirect, '/'));

app.use(errorHandlingMiddleware('/error'));
//listen and announce port for running server

app.use ((req, res, next) => {
    res.status(404).render('404');
});

app.use ((req, res, next) => {
    console.error(errorHandlingMiddleware);
    res.status(500).render('500');
});

connectToDatabase();
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});