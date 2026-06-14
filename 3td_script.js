let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  let input = document.getElementById("taskInput");

  if (input.value.trim() === "") return;

  tasks.push({
    id: Date.now(),   // ✅ unique id
    text: input.value,
    done: false,
    time: new Date().toLocaleString()
  });

  input.value = "";
  save();
  render();
}

function render() {
  let list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach(task => {

    if (
      (currentFilter === "pending" && task.done) ||
      (currentFilter === "completed" && !task.done)
    ) return;

    let li = document.createElement("li");

    if (task.done) li.classList.add("completed");

    li.innerHTML = `
      <div>
        <span onclick="toggle(${task.id})">${task.text}</span>
        <small>${task.time}</small>
      </div>
      <button onclick="deleteTask(${task.id})">❌</button>
    `;

    list.appendChild(li);
  });
}

function toggle(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, done: !task.done } : task
  );

  save();
  render();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  save();
  render();
}

function filterTasks(type) {
  currentFilter = type;
  render();
}

function clearAll() {
  tasks = [];
  save();
  render();
}

render();