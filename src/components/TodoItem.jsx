function TodoItem({ task, onToggleTask, onDeleteTask }) {
  return (
    <li className={task.completed ? "todo-item completed" : "todo-item"}>
      <label className="task-label">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleTask(task)}
        />
        <span>{task.title}</span>
      </label>

      <button
        type="button"
        className="delete-button"
        aria-label={`Ta bort ${task.title}`}
        onClick={() => onDeleteTask(task.id)}
      >
        Ta bort
      </button>
    </li>
  );
}

export default TodoItem;
