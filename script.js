// Get the input field, buttons, and list elements
const todoInput = document.getElementById('todo-input');
const dueDateInput = document.getElementById('due-date');
const taskPriorityInput = document.getElementById('task-priority');
const addTodoBtn = document.getElementById('add-todo-btn');
const filterAllBtn = document.getElementById('filter-all');
const filterCompletedBtn = document.getElementById('filter-completed');
const filterPendingBtn = document.getElementById('filter-pending');
const todoList = document.getElementById('todo-list');

let todos = JSON.parse(localStorage.getItem('todos')) || [];


function renderTodos(filter = 'all') {
    todoList.innerHTML = '';
    todos.forEach((todo) => {
        const todoItem = document.createElement('li');
        todoItem.classList.add('todo-item');
        todoItem.textContent = `${todo.task} - Due: ${todo.dueDate} - Priority: ${todo.priority}`;
        if (todo.completed) {
            todoItem.classList.add('completed');
        }
        const deleteBtn = document.createElement('span');
        deleteBtn.textContent = ' (Delete)';
        deleteBtn.style.color = 'red';
        deleteBtn.style.cursor = 'pointer';
        todoItem.appendChild(deleteBtn);
        deleteBtn.addEventListener('click', () => {
            todos = todos.filter((t) => t !== todo);
            localStorage.setItem('todos', JSON.stringify(todos));
            renderTodos(filter);
        });
        const editBtn = document.createElement('span');
        editBtn.textContent = ' (Edit)';
        editBtn.style.color = 'blue';
        editBtn.style.cursor = 'pointer';
        todoItem.appendChild(editBtn);
        editBtn.addEventListener('click', () => {
            // Implement edit functionality
        });
        const completeBtn = document.createElement('span');
        completeBtn.textContent = ' (Complete)';
        completeBtn.style.color = 'green';
        completeBtn.style.cursor = 'pointer';
        todoItem.appendChild(completeBtn);
        completeBtn.addEventListener('click', () => {
            todo.completed = !todo.completed;
            localStorage.setItem('todos', JSON.stringify(todos));
            renderTodos(filter);
        });
        if (filter === 'all' || (filter === 'completed' && todo.completed) || (filter === 'pending' && !todo.completed)) {
            todoList.appendChild(todoItem);
        }
    });
}

addTodoBtn.addEventListener('click', () => {
    const task = todoInput.value.trim();
    const dueDate = dueDateInput.value;
    const priority = taskPriorityInput.value;
    if (task !== '') {
        const todo = { task, dueDate, priority, completed: false };
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
        todoInput.value = '';
        dueDateInput.value = '';
        taskPriorityInput.value = 'low';
        renderTodos();
    }
});

// Add event listeners to the filter buttons
filterAllBtn.addEventListener('click', () => renderTodos('all'));
filterCompletedBtn.addEventListener('click', () => renderTodos('completed'));
filterPendingBtn.addEventListener('click', () => renderTodos('pending'));

// Render todos initially
renderTodos();