import React, { useState, useEffect } from "react";

const EMPTY = {
  title: "",
  description: "",
  priority: "Medium",
  status: "Todo",
  dueDate: "",
};

export default function TaskForm({ onSubmit, editingTask, onCancel }) {
  const [form, setForm] = useState(EMPTY);

  useEffect(() => {
    if (editingTask) setForm(editingTask);
    else setForm(EMPTY);
  }, [editingTask]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm(EMPTY);
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h2>{editingTask ? "✏️ Edit Task" : "➕ New Task"}</h2>

      <input
        name="title"
        placeholder="Task title *"
        value={form.title}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Description (optional)"
        value={form.description}
        onChange={handleChange}
        rows={3}
      />

      <div className="form-row">
        <div className="form-group">
          <label>Priority</label>
          <select name="priority" value={form.priority} onChange={handleChange}>
            <option value="Low">🟢 Low</option>
            <option value="Medium">🟡 Medium</option>
            <option value="High">🔴 High</option>
          </select>
        </div>

        <div className="form-group">
          <label>Status</label>
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="Todo">📋 Todo</option>
            <option value="In Progress">⚙️ In Progress</option>
            <option value="Done">✅ Done</option>
          </select>
        </div>

        {/* ★ EXTRA FIELD — Due Date */}
        <div className="form-group">
          <label>Due Date</label>
          <input
            name="dueDate"
            type="date"
            value={form.dueDate}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-buttons">
        <button type="submit">{editingTask ? "Update Task" : "Add Task"}</button>
        {editingTask && (
          <button type="button" onClick={onCancel} className="cancel-btn">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
