import { useState } from "react";
import "./App.css";

function App() {
  return (
    <div>
      <Heading />
      <Container />
    </div>
  );
}

function Heading() {
  return <h1 className="main-heading">TASKFLOW
  </h1>;
}

function Container() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  function handleAddTask(task) {
    setTasks((tasks) => [...tasks, task]);
  }

  function handleDeleteTask(id) {
    window.confirm("Are you sure you want to delete this task");
    setTasks((tasks) => tasks.filter((task) => task.id !== id));
  }

  function handleToggleTask(id) {
    setTasks((task) =>
      task.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  let sortedItems = tasks;

  if (filter === "pending")
    sortedItems = tasks.filter((task) => !task.completed);

  if (filter === "completed")
    sortedItems = tasks.filter((task) => task.completed);

  return (
    <div className="container">
      <div className="filter-buttons">
        <button
          className={filter === "all" ? "filter active" : "filter"}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={filter === "pending" ? "filter active" : "filter"}
          onClick={() => setFilter("pending")}
        >
          Pending
        </button>
        <button
          className={filter === "completed" ? "filter active" : "filter"}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>

      <Input onAddTask={handleAddTask} />

      <ul className="task-list">
        {sortedItems.length === 0 ? (
          <p className="no-task">No tasks yet ✨</p>
        ) : (
          sortedItems.map((task) => (
            <Task
              task={task}
              key={task.id}
              onDeleteTask={handleDeleteTask}
              onToggleTask={handleToggleTask}
            />
          ))
        )}
      </ul>
    </div>
  );
}

function Input({ onAddTask }) {
  const [input, setInput] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!input.trim()) return alert("Please enter a task");

    const newTask = {
      id: Date.now(),
      description: input,
      urgency: "urgent",
      completed: false,
    };

    onAddTask(newTask);
    setInput("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="input"
        placeholder="Type in your task..."
      />
      <button className="add">Add</button>
    </form>
  );
}

function Task({ task, onDeleteTask, onToggleTask }) {
  return (
    <li className={`task ${task.completed ? "done" : ""}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggleTask(task.id)}
      />
      <p className="desc">{task.description}</p>
      <button className="delete" onClick={() => onDeleteTask(task.id)}>
        Delete
      </button>
    </li>
  );
}

export default App;
