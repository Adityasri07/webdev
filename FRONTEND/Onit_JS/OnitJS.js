// Get elements from the DOM
const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-button');
const todoList = document.getElementById('todo-list');

// Add a new item to the list
addButton.addEventListener('click', function() {
    const taskText = todoInput.value;

    // Check if the input is not empty
    if (taskText !== "") {
        // Create a new list item
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // Append the new item to the list
        todoList.appendChild(listItem);

        // Clear the input field
        todoInput.value = "";

        // Optional: Add a 'remove' button for each task
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.style.marginLeft = "10px";
        removeButton.addEventListener('click', function() {
            todoList.removeChild(listItem);
        });
        listItem.appendChild(removeButton);
    }
});
