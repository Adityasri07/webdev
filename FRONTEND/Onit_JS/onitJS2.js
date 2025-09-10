// Grab elements
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Load saved tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Render tasks
function renderTasks() {
  taskList.innerHTML = ""; // clear list
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="${task.completed ? "done" : ""}">${task.text}</span>
      <button class="delete">Delete</button>
    `;

    // Toggle complete on click
    li.querySelector("span").addEventListener("click", () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
    });

    // Delete button
    li.querySelector(".delete").addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
    });

    taskList.appendChild(li);
  });
}

// Save tasks to localStorage + re-render
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Add task
addBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text !== "") {
    tasks.push({ text, completed: false });
    taskInput.value = "";
    saveTasks();
  }
});

// Enter key shortcut
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addBtn.click();
});

// Initial render
renderTasks();
