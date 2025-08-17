import React, { useState, useEffect } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("all");

  // ⬇️ load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(saved);
  }, []);

  // ⬆️ save to localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Add or Update
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) return;

    if (editId) {
      setTodos(
        todos.map((todo) =>
          todo.id === editId ? { ...todo, text: task } : todo
        )
      );
      setEditId(null);
    } else {
      setTodos([...todos, { id: Date.now(), text: task, completed: false }]);
    }
    setTask("");
  };

  // Toggle Complete
  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete
  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Edit
  const handleEdit = (id) => {
    const editTodo = todos.find((todo) => todo.id === id);
    setTask(editTodo.text);
    setEditId(id);
  };

  // Filter
  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  return (
    <div className="card p-4 shadow">
      {/* Form */}
      <Form onSubmit={handleSubmit} className="mb-3">
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Add a new task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <Button type="submit" variant="primary">
            {editId ? "Update" : "Add"}
          </Button>
        </InputGroup>
      </Form>

      {/* Filters */}
      <div className="mb-3">
        <Button
          variant={filter === "all" ? "dark" : "outline-dark"}
          className="me-2"
          onClick={() => setFilter("all")}
        >
          All
        </Button>
        <Button
          variant={filter === "completed" ? "success" : "outline-success"}
          className="me-2"
          onClick={() => setFilter("completed")}
        >
          Completed
        </Button>
        <Button
          variant={filter === "pending" ? "warning" : "outline-warning"}
          onClick={() => setFilter("pending")}
        >
          Pending
        </Button>
      </div>

      {/* Todo List */}
      <ul className="list-group">
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            className={`list-group-item d-flex justify-content-between align-items-center ${
              todo.completed ? "list-group-item-success" : ""
            }`}
          >
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
              onClick={() => toggleComplete(todo.id)}
            >
              {todo.text}
            </span>
            <div>
              <Button
                size="sm"
                variant="info"
                className="me-2"
                onClick={() => handleEdit(todo.id)}
              >
                Edit
              </Button>
              <Button
                size="sm"
                variant="danger"
                onClick={() => handleDelete(todo.id)}
              >
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
