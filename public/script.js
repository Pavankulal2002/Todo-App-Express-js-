const baseURL = "http://localhost:3000";
let databaseSelect;

document.addEventListener("DOMContentLoaded", () => {
    databaseSelect = document.getElementById("database");
    const todosContainer = document.getElementById("todos");

    databaseSelect.addEventListener("change", () => {
        fetchTodos(databaseSelect.value);
    });

    document.getElementById("create").addEventListener("click", () => {
        createTodo();
    });

    fetchTodos(databaseSelect.value);
});

async function fetchTodos(database) {
    try {
        const response = await fetch(`${baseURL}/${database}/todos/`);
        const todos = await response.json();
        displayTodos(todos);
    } catch (error) {
        console.error("Error fetching todos:", error);
    }
}

async function createTodo() {
    var id=0
    const name = prompt("Enter todo name:");
    const description = prompt("Enter todo description:");
    if (name && description) {
        const newTodo = { id,name, description};
        try {
            const response = await fetch(`${baseURL}/${databaseSelect.value}/todos/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTodo)
            });
            if (response.ok) {
                fetchTodos(databaseSelect.value); // Fetch updated todos after creating a new one
            } else {
                console.error("Failed to create todo");
            }
        } catch (error) {
            console.error("Error creating todo:", error);
        }
    }
}

async function updateTodoWithPatch(todoId, currentTitle, currentDescription,currentCompleted) {
    let newCompleted;
    if (currentCompleted === 'true') {
        newCompleted = 'false';
    } else {
        newCompleted = 'true';
    }
   
    
        const updatedFields = {};
        updatedFields.id=todoId
        updatedFields.name=currentTitle
        updatedFields.description=currentDescription
        updatedFields.completed=newCompleted
        try {
            const response = await fetch(`${baseURL}/${databaseSelect.value}/todos/${todoId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedFields)
            });
            if (response.ok) {
                fetchTodos(databaseSelect.value); // Fetch updated todos after updating
            } else {
                console.error("Failed to update todo");
            }
        } catch (error) {
            console.error("Error updating todo:", error);
        }
    
}

async function updateTodoWithPut(todoId, currentTitle, currentDescription) {
    
    const newTitle = prompt("Enter new title:", currentTitle);
    const newDescription = prompt("Enter new description:", currentDescription);
    if (newTitle !== null && newDescription !== null) {
        const updatedTodo = { id: todoId, name: newTitle, description: newDescription };
        try {
            const response = await fetch(`${baseURL}/${databaseSelect.value}/todos/${todoId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedTodo)
            });
            if (response.ok) {
                fetchTodos(databaseSelect.value); // Fetch updated todos after updating
            } else {
                console.error("Failed to update todo");
            }
        } catch (error) {
            console.error("Error updating todo:", error);
        }
    }
}

async function deleteTodo(todoId) {
    const confirmation = confirm("Are you sure you want to delete this todo?");
    if (confirmation) {
        try {
            const response = await fetch(`${baseURL}/${databaseSelect.value}/todos/${todoId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                fetchTodos(databaseSelect.value); // Fetch updated todos after deleting
            } else {
                console.error("Failed to delete todo");
            }
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    }
}


function displayTodos(todos) {
    const todosContainer = document.getElementById("todos");
    todosContainer.innerHTML = "";
    todos.forEach(todo => {
        const todoElement = document.createElement("div");
        todoElement.classList.add("todo");
        if (todo.completed) {
            todoElement.classList.add("completed");
        } else {
            todoElement.classList.add("not-completed");
        }
        const completedText = todo.completed ? "Completed" : "Not Completed";

        let idField;
        if (databaseSelect.value === "mongodb") {
            idField = todo._id;
        } else {
            idField = todo.id;
        }

        todoElement.innerHTML = `
            <strong>${todo.name}</strong>
            <p>${todo.description}</p>
            <button class="btn complete" onclick="updateTodoWithPatch('${idField}','${todo.name}','${todo.description}','${todo.completed}')">${completedText}</button>
            <button  class="btn update"onclick="updateTodoWithPut('${idField}','${todo.name}','${todo.description}')">Update</button>
            <button  class="btn delete" onclick="deleteTodo('${idField}')">Delete</button>
        `;
        todosContainer.appendChild(todoElement);
    });
}

