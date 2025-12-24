import { useState, useEffect } from "react";
import "./App.css";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");

  const addTodo = () => {
    if (inputValue.trim() !== "") {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInputValue("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  useEffect(() => {
    // Prevent scrolling when todo list is mounted
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      // Restore scrolling when component unmounts
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="todo-list-container"
      //   style={{
      //     backgroundColor: "translucent",
      //     "--xr-background-material": "translucent",
      //   }}
      //   enable-xr
    >
      <div
        className="todo-list-box"
        // style={{
        //   backgroundColor: "transparent",
        //   "--xr-background-material": "translucent",
        // }}
        // enable-xr
      >
        <h1 className="todo-list-title">Todo List</h1>

        <div className="todo-input-container">
          <input
            type="text"
            className="todo-input"
            placeholder="Add a new todo..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className="todo-add-btn" onClick={addTodo}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
            </svg>
          </button>
        </div>

        <div className="todo-list-items">
          {todos.length === 0 ? (
            <p className="todo-empty-message">No todos yet. Add one above!</p>
          ) : (
            todos.map((todo) => (
              <div
                key={todo.id}
                className={`todo-item ${todo.completed ? "completed" : ""}`}
              >
                <div className="todo-item-content">
                  <input
                    type="checkbox"
                    className="todo-checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                  />
                  <span className="todo-text">{todo.text}</span>
                </div>
                <button
                  className="todo-delete-btn"
                  onClick={() => deleteTodo(todo.id)}
                  aria-label="Delete todo"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {todos.length > 0 && (
          <div className="todo-stats">
            <span>
              {todos.filter((t) => !t.completed).length} active,{" "}
              {todos.filter((t) => t.completed).length} completed
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default TodoList;
