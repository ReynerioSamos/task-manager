//filename: app.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

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

app.use(loggingMiddleware)

// these are the routes that will be redirected to the homepage
const routesToRedirect = [''];
// defaults to redirecting back to homepage
app.use(redirectingMiddleware(routesToRedirect, '/'));

app.use('/tasks',taskRoutes)

//listen and announce port for running server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});