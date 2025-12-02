# Daily Lab Task Manager

A simple to-do application to manage lab tasks efficiently. Users can sign up, log in, and manage tasks with ease.

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies-Used](#technologies-used)
- [License](#license)

---

## Features

- User Authentication (Sign up / Login)
- Add, Edit, Complete, and Delete tasks
- View all tasks in a task list
- Responsive and simple frontend UI
- Backend API powered by JSON Server

---

## Project Structure

Daily Lab Task Manager/
│
├─ frontend/ --> HTML, CSS, JavaScript (client-side code)
├─ backend/ --> db.json and JSON Server configuration
└─ README.md --> Project documentation


---

## Installation

### 1. Start the Backend (JSON Server)

Open the  terminal:

```bash
cd backend
npm install -g json-server
json-server --watch db.json --port 3001

Json server will run at:
http://localhost:3001

open the frontend
cd frontend
open index.html

Usage

Open the frontend in the browser.

Sign up if  don’t have an account, then log in.

Add new tasks by filling in the task form.

Complete, edit, or delete tasks when needed.

All task data is saved through JSON Server.

Technologies Used

Frontend: HTML, CSS, JavaScript

Backend: JSON Server (Fake REST API)

Version Control: Git & GitHub

License

This project is open-source under the MIT License.