
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TodoApp from "./components/TodoApp";

function App() {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">📝 Todo List App</h2>
      <TodoApp />
    </div>
  );
}

export default App;
