// Select elements
const addBtn = document.getElementById("add-btn");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

// Load tasks from local storage on page load
window.addEventListener("DOMContentLoaded", loadTasks);

// Add new task
addBtn.addEventListener("click", addTask);

// Allow pressing Enter key to add task
taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return; // prevent empty tasks

  const li = createTaskElement(taskText);
  taskList.appendChild(li);

  saveTasks();
  taskInput.value = "";
}

function createTaskElement(taskText) {
  const li = document.createElement("li");
  li.textContent = taskText;

  // Toggle complete on click
  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");

  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // prevent toggling completed
    li.remove();
    saveTasks();
  });

  li.appendChild(deleteBtn);
  return li;
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#task-list li").forEach(li => {
    tasks.push({
      text: li.childNodes[0].textContent,
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  storedTasks.forEach(task => {
    const li = createTaskElement(task.text);
    if (task.completed) li.classList.add("completed");
    taskList.appendChild(li);
  });
}
