// Task list arrays
let pendingTasks = [];
let completedTasks = [];

// Add new task
function addTask() {
    const taskInput = document.getElementById('taskInput').value;
    if (taskInput === '') {
        alert('Please enter a task');
        return;
    }

    const task = {
        id: Date.now(),
        text: taskInput,
        timeAdded: new Date().toLocaleString()
    };

    pendingTasks.push(task);
    document.getElementById('taskInput').value = ''; // Clear input field
    renderTasks(); // Render task lists
}

// Render tasks
function renderTasks() {
    // Clear the existing lists
    document.getElementById('pendingTasks').innerHTML = '';
    document.getElementById('completedTasks').innerHTML = '';

    // Render pending tasks
    pendingTasks.forEach(task => {
        const taskItem = createTaskItem(task, 'pending');
        document.getElementById('pendingTasks').appendChild(taskItem);
    });

    // Render completed tasks
    completedTasks.forEach(task => {
        const taskItem = createTaskItem(task, 'completed');
        document.getElementById('completedTasks').appendChild(taskItem);
    });
}

// Create task item HTML
function createTaskItem(task, type) {
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');
    if (type === 'completed') taskItem.classList.add('completed');
    
    const taskText = document.createElement('span');
    taskText.textContent = `${task.text} (Added: ${task.timeAdded})`;
    
    const taskButtons = document.createElement('div');
    taskButtons.classList.add('task-buttons');

    // Create Edit button
    const editButton = document.createElement('button');
    editButton.classList.add('edit');
    editButton.textContent = 'Edit';
    editButton.onclick = () => editTask(task.id, type);
    taskButtons.appendChild(editButton);

    // Create Delete button
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => deleteTask(task.id, type);
    taskButtons.appendChild(deleteButton);

    // Create Complete button (if task is pending)
    if (type === 'pending') {
        const completeButton = document.createElement('button');
        completeButton.classList.add('complete');
        completeButton.textContent = 'Complete';
        completeButton.onclick = () => markAsComplete(task.id);
        taskButtons.appendChild(completeButton);
    }

    taskItem.appendChild(taskText);
    taskItem.appendChild(taskButtons);
    return taskItem;
}

// Mark task as complete
function markAsComplete(taskId) {
    const task = pendingTasks.find(t => t.id === taskId);
    pendingTasks = pendingTasks.filter(t => t.id !== taskId);
    completedTasks.push({ ...task, timeCompleted: new Date().toLocaleString() });
    renderTasks();
}

// Edit task
function editTask(taskId, type) {
    const taskText = prompt('Edit task:');
    if (taskText === null || taskText === '') return;

    if (type === 'pending') {
        const task = pendingTasks.find(t => t.id === taskId);
        task.text = taskText;
    } else {
        const task = completedTasks.find(t => t.id === taskId);
        task.text = taskText;
    }
    renderTasks();
}

// Delete task
function deleteTask(taskId, type) {
    if (type === 'pending') {
        pendingTasks = pendingTasks.filter(t => t.id !== taskId);
    } else {
        completedTasks = completedTasks.filter(t => t.id !== taskId);
    }
    renderTasks();
}
