let todos = JSON.parse(localStorage.getItem('todos')) || [];

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    todos.forEach((task) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${task.id})">
        <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
        <button onclick="deleteTask(${task.id})">Delete</button>
        <button onclick="editTask(${task.id})">Edit</button>
      `;
      taskList.appendChild(li);
    });
  }

  function addTask() {
    const input = document.getElementById('taskInput');
    const text = input.value.trim();
    if (text) {
      todos.push({ id: Date.now(), text, completed: false });
      input.value = '';
      saveToLocalStorage();
      renderTasks();
    }
  }

  function deleteTask(id) {
    todos = todos.filter(task => task.id !== id);
    saveToLocalStorage();
    renderTasks();
  }

  function toggleTask(id) {
    todos = todos.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveToLocalStorage();
    renderTasks();
  }

  function editTask(id) {
    const task = todos.find(task => task.id === id);
    const newText = prompt('Edit task:', task.text);
    if (newText !== null) {
      task.text = newText.trim();
      saveToLocalStorage();
      renderTasks();
    }
  }

  function saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  document.addEventListener('DOMContentLoaded', renderTasks);