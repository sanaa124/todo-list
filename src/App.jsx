
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  // Load saved todos from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("todos"));
    if (saved) setTodos(saved);
  }, []);

  // Save todos to localStorage whenever updated
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTask = () => {
    if (task.trim() === "") return;
    const newTask = { id: Date.now(), text: task, completed: false };
    setTodos([...todos, newTask]);
    setTask("");
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTask = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const filteredTodos = todos.filter((t) => {
    if (filter === "completed") return t.completed;
    if (filter === "pending") return !t.completed;
    return true;
  });

  return (
    <div className="container py-5">
      <div className="card shadow-lg">
        <div className="card-body">
          <h1 className="text-center mb-4">📝 Todo List</h1>

          {/* Input + Add Button */}
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter a task..."
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <button className="btn btn-primary" onClick={addTask}>
              Add
            </button>
          </div>

          {/* Filter Buttons */}
          <div className="d-flex justify-content-center mb-3">
            <button
              className={`btn btn-sm mx-1 ${
                filter === "all" ? "btn-dark" : "btn-outline-dark"
              }`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={`btn btn-sm mx-1 ${
                filter === "completed" ? "btn-success" : "btn-outline-success"
              }`}
              onClick={() => setFilter("completed")}
            >
              Completed
            </button>
            <button
              className={`btn btn-sm mx-1 ${
                filter === "pending" ? "btn-warning" : "btn-outline-warning"
              }`}
              onClick={() => setFilter("pending")}
            >
              Pending
            </button>
          </div>

          {/* Todo List */}
          <ul className="list-group">
            {filteredTodos.length === 0 ? (
              <li className="list-group-item text-center text-muted">
                No tasks found
              </li>
            ) : (
              filteredTodos.map((t) => (
                <li
                  key={t.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span
                    style={{
                      textDecoration: t.completed ? "line-through" : "none",
                    }}
                  >
                    {t.text}
                  </span>
                  <div>
                    <button
                      className="btn btn-sm btn-success me-2"
                      onClick={() => toggleComplete(t.id)}
                    >
                      {t.completed ? "Undo" : "Done"}
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteTask(t.id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center mt-4 text-muted">
        <small>
          Made with ❤️ by <a href="https://www.linkedin.com/in/sanaa-saleh-74705a371/" target="_blank" rel="noreferrer">Sanaa Saleh</a>
        </small>
      </footer>
    </div>
  );
}

export default App;
