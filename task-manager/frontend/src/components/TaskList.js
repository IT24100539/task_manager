import React from "react";

const priorityColor = { Low: "green", Medium: "amber", High: "red" };
const statusColor   = { Todo: "gray", "In Progress": "blue", Done: "teal" };

export default function TaskList({ tasks, onEdit, onDelete }) {
  if (tasks.length === 0) {
    return (
      <div className="empty">
        <p>🎉 No tasks yet! Add one above.</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task._id} className={`task-card priority-${priorityColor[task.priority]}`}>
          <div className="task-header">
            <h3 className={task.status === "Done" ? "done-title" : ""}>{task.title}</h3>
            <div className="task-badges">
              <span className={`badge priority-badge ${priorityColor[task.priority]}`}>
                {task.priority}
              </span>
              <span className={`badge status-badge ${statusColor[task.status]}`}>
                {task.status}
              </span>
            </div>
          </div>

          {task.description && (
            <p className="task-desc">{task.description}</p>
          )}

          {/* ★ Shows the extra Due Date field */}
          {task.dueDate && (
            <p className="task-due">📅 Due: {task.dueDate}</p>
          )}

          <div className="task-actions">
            <button onClick={() => onEdit(task)} className="edit-btn">Edit</button>
            <button onClick={() => onDelete(task._id)} className="delete-btn">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
