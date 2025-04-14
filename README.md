# Task Manager Web App
Simple Task Management Web App Built with Node.js, Express, PostgresSQL and EJS templates.

[Demo Video/Quiz 4](https://youtu.be/BuZwooVydnM)

## Description

Allows users to create, view, toggle, delete, search, filter, and sort tasks by title or description, or in descending and ascending order.

## Features
- Create, read, update, and delete tasks
- Mark tasks as complete/incomplete
- Search, filter, and sort tasks
- Responsive web interface
- PostgreSQL database backend
### Prerequisites
* Node.js (v16 or higher)
* PostgreSQL (v12 or higher)
* npm (Node Package Manager)
### Dependencies
- express
- ejs (templating engine)
- pg (postgres client)
- dotenv (for .env variables)
### Installation
1. Clone repository:
```bash
git clone https://github.com/ReynerioSamos/task-manager.git
cd task-manager
```
2. Install dependencies
```bash
npm install express ejs pg dotenv
```
3. Database setup
	1. Start PostgreSQL
	2. Create database and user:
```bash
sudo -u postgres psql
```
Then in PostgreSQL shell:
```sql
CREATE DATABASE tasks;
CREATE USER tasks WITH ENCRYPTED PASSWORD 'taskspass';
GRANT ALL PRIVILEGES ON DATABASE tasks TO tasks;
\q
```
Run migration to create initial db schema:
```bash
psql -U tasks -d tasks -a -f migrations/00001_initial_schema.sql
```
4. Environment Configuration
	1. Create a .env file in the program root with variables default (Or you can provide your own variables if different from default)
```env
# Database Connection
DB_HOST=localhost
DB_USER=tasks
DB_PASSWORD=taskspass
DB_NAME=tasks
DB_PORT=5432
```

### Running the application
```bash
npm run dev
```
OR
```bash
npm start
```

The app can be accessed via http://localhost:3000
### Usage
#### Adding a Task
1) Navigate to home page
2) Fill out "Add Task" form
3) Enter title and description
4) Optionally enter a priority (defaults to medium)
5) Click "Add Task"
#### Managing Tasks
- Toggle Completion
	- Click the "Complete" or "Uncomplete" button next to a task
- Delete Task
	- Click the "Delete" button next to a task
- Search Task
	- Use the search bar to find tasks by title or description
- Filter Tasks
	- Use the filter links to show all, completed or uncompleted tasks
- Sort Tasks
	- Click on sorting links to sort by priority or title
## Acknowledgments

Code snippets, AI-Assistance etc.
* [GeeksforGeeks](https://www.geeksforgeeks.org/)
* [DeepSeek AI chatbot](https://www.deepseek.com/)
* [Claude AI chatbot](https://claude.ai)
