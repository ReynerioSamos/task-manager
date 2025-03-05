//filename: app.js
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const {
    loggingMiddleware,
    redirectingMiddleware,
    errorHandlingMiddleware,
} = require('./middleware/middleware');

const taskRoutes = require('./routes/taskRoutes');

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
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});