import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { getTasks, createTask, updateTask, deleteTask } from "./api";
import "./App.css";

export default function App() {
  const [tasks, setTasks]           = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [error, setError]           = useState("");
  const [filter, setFilter]         = useState("All");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
      setError("");
    } catch (err) {
      setError("Could not load tasks. Is the backend running?");
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingTask) {
        await updateTask(editingTask._id, formData);
        setEditingTask(null);
      } else {
        await createTask(formData);
      }
      fetchTasks();
    } catch (err) {
      setError("Failed to save task.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (err) {
      setError("Failed to delete task.");
    }
  };

  // Filter tasks by status
  const statusOptions = ["All", "Todo", "In Progress", "Done"];
  const filtered = filter === "All" ? tasks : tasks.filter(t => t.status === filter);

  // Summary counts
  const counts = {
    total:      tasks.length,
    todo:       tasks.filter(t => t.status === "Todo").length,
    inProgress: tasks.filter(t => t.status === "In Progress").length,
    done:       tasks.filter(t => t.status === "Done").length,
  };

  return (
    <div className="app">
      <header>
        <h1>✅ Task Manager</h1>
        <p>A MERN Stack Practice Project</p>
      </header>

      {/* Summary bar */}
      <div className="summary-bar">
        <div className="summary-item">
          <span className="count">{counts.total}</span>
          <span className="label">Total</span>
        </div>
        <div className="summary-item todo">
          <span className="count">{counts.todo}</span>
          <span className="label">Todo</span>
        </div>
        <div className="summary-item progress">
          <span className="count">{counts.inProgress}</span>
          <span className="label">In Progress</span>
        </div>
        <div className="summary-item done">
          <span className="count">{counts.done}</span>
          <span className="label">Done</span>
        </div>
      </div>

      <main>
        {error && <div className="error-banner">{error}</div>}

        <TaskForm
          onSubmit={handleSubmit}
          editingTask={editingTask}
          onCancel={() => setEditingTask(null)}
        />

        {/* Filter buttons */}
        <div className="filter-bar">
          {statusOptions.map(s => (
            <button
              key={s}
              className={`filter-btn ${filter === s ? "active" : ""}`}
              onClick={() => setFilter(s)}
            >
              {s}
            </button>
          ))}
        </div>

        <TaskList
          tasks={filtered}
          onEdit={setEditingTask}
          onDelete={handleDelete}
        />
      </main>
    </div>
  );
}
