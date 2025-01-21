const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.className = `todo-item ${todo.completed ? "completed" : ""}`;

    li.innerHTML = `
                    <span>${todo.text}</span>
                    <div>
                        <button class="mark">${
                          todo.completed ? "Unmark" : "Mark"
                        }</button>
                        <button class="edit">Edit</button>
                        <button class="delete">Delete</button>
                    </div>
                `;

    li.querySelector(".mark").addEventListener("click", () => {
      todo.completed = !todo.completed;
      saveTodos();
      renderTodos();
    });

    li.querySelector(".edit").addEventListener("click", () => {
      const newText = prompt("Edit task:", todo.text);
      if (newText !== null) {
        todo.text = newText;
        saveTodos();
        renderTodos();
      }
    });

    li.querySelector(".delete").addEventListener("click", () => {
      todos.splice(index, 1);
      saveTodos();
      renderTodos();
    });

    todoList.appendChild(li);
  });
}

addBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (text) {
    todos.push({ text, completed: false });
    saveTodos();
    renderTodos();
    input.value = "";
  }
});

renderTodos();
