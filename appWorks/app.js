const taskList = [];

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();

  if (taskText === '') {
    return;
  }

  const task = {
    id: Date.now(),
    text: taskText,
    completed: false,
  };

  taskList.push(task);
  taskInput.value = '';

  displayTasks();
}

function deleteTask(taskId) {
  const taskIndex = taskList.findIndex(task => task.id === taskId);

  if (taskIndex !== -1) {
    taskList.splice(taskIndex, 1);
    displayTasks();
  }
}

function toggleTaskStatus(taskId) {
  const task = taskList.find(task => task.id === taskId);

  if (task) {
    task.completed = !task.completed;
    displayTasks();
  }
}

function displayTasks() {
  const taskListElement = document.getElementById('taskList');
  taskListElement.innerHTML = '';

  taskList.forEach(task => {
    const taskElement = document.createElement('li');
    taskElement.classList.add('task');

    const taskTextElement = document.createElement('span');
    taskTextElement.textContent = task.text;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить';
    deleteButton.onclick = () => deleteTask(task.id);

    const statusCheckbox = document.createElement('input');
    statusCheckbox.type = 'checkbox';
    statusCheckbox.checked = task.completed;
    statusCheckbox.onchange = () => toggleTaskStatus(task.id);

    taskElement.appendChild(statusCheckbox);
    taskElement.appendChild(taskTextElement);
    taskElement.appendChild(deleteButton);

    if (task.completed) {
      taskElement.classList.add('completed');
    }

    taskListElement.appendChild(taskElement);
  });
}

displayTasks();
