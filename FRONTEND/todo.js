const API = "http://localhost:3001";

const userId = localStorage.getItem("loggedUser");
const username = localStorage.getItem("loggedUsername");

if (!userId) {
    alert("Please login first.");
    window.location.href = "index.html";
}

document.getElementById("welcomeText").textContent = username;

let currentFilter = "all";
let editId = null;

window.onload = loadTasks;

function Time(dueDate) {
    const now = new Date();
    const due = new Date(dueDate);

    const diffMs = due - now;
    const diffMin = Math.floor(diffMs / 1000 / 60);
    const diffHrs = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHrs / 24);

    if (diffMs < 0) {
        const overdueMin = Math.abs(diffMin);
        const overdueHrs = Math.abs(diffHrs);
        const overdueDays = Math.abs(diffDays);

        if (overdueMin < 60) return `Overdue by ${overdueMin} min`;
        if (overdueHrs < 24) return `Overdue by ${overdueHrs} hr(s)`;
        return `Overdue by ${overdueDays} day(s)`;
    }

    if (diffMin < 60) return `Due in ${diffMin} min`;
    if (diffHrs < 24) return `Due in ${diffHrs} hr(s)`;
    return `Due in ${diffDays} day(s)`;
}

// LOAD TASKS
async function loadTasks() {
    const res = await fetch(`${API}/tasks?userId=${userId}`);
    const tasks = await res.json();

    displayTasks(tasks);
}

// FILTER BUTTONS
function filterTasks(type) {
    currentFilter = type;
    document.querySelectorAll(".filters button").forEach(b => b.classList.remove("active"));
    event.target.classList.add("active");

    loadTasks();
}

// DISPLAY TASKS
function displayTasks(tasks) {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    let filtered = tasks;
    if (currentFilter === "completed") filtered = tasks.filter(t => t.completed);
    if (currentFilter === "pending") filtered = tasks.filter(t => !t.completed);

    filtered.forEach(task => {
        const li = document.createElement("li");
        li.className = "task-item";

        if (task.completed) li.classList.add("done");

        li.innerHTML = `
            <strong>${task.title}</strong><br>
            ${task.description || ""}<br>
            <em>${task.dueDate ? Time(task.dueDate) : ""}</em><br>

            <button class="complete-btn" onclick="toggleComplete('${task.id}', ${task.completed})">
                ${task.completed ? "Undo" : "Complete"}
            </button>

            <button class="edit-btn" onclick="openEdit('${task.id}')">Edit</button>
            <button class="delete-btn" onclick="deleteTask('${task.id}')">Delete</button>
        `;

        list.appendChild(li);
    });
}

// ADD TASK
async function addTask() {
    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const dueDate = document.getElementById("dueDate").value;

    if (!title) {
        alert("Title is required");
        return;
    }

    await fetch(`${API}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title, description, dueDate, completed: false, userId: userId
        })
    });

    loadTasks();
}

// DELETE TASK
async function deleteTask(id) {
    if (!confirm("Delete this task?")) return;
    await fetch(`${API}/tasks/${id}`, { method: "DELETE" });
    loadTasks();
}

// COMPLETE / UNDO TASK
async function toggleComplete(id, curr) {
    await fetch(`${API}/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !curr })
    });

    loadTasks();
}

// EDIT MODAL
function openEdit(id) {
    editId = id;

    fetch(`${API}/tasks/${id}`)
        .then(res => res.json())
        .then(task => {
            document.getElementById("editTitle").value = task.title;
            document.getElementById("editDescription").value = task.description;
            document.getElementById("editDue").value = task.dueDate;
            document.getElementById("editModal").classList.remove("hidden");
        });
}

function closeModal() {
    document.getElementById("editModal").classList.add("hidden");
}

async function saveEdit() {
    const title = document.getElementById("editTitle").value;
    const description = document.getElementById("editDescription").value;
    const dueDate = document.getElementById("editDue").value;

    await fetch(`${API}/tasks/${editId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, dueDate })
    });

    closeModal();
    loadTasks();
}

// LOGOUT
function logout() {
    localStorage.clear();
    window.location.href = "index.html";
}

// expose functions globally
window.deleteTask = deleteTask;
window.toggleComplete = toggleComplete;
window.openEdit = openEdit;
window.saveEdit = saveEdit;
window.closeModal = closeModal;
window.addTask = addTask;
window.filterTasks = filterTasks;
window.logout = logout;
