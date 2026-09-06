import TodoItem from "./TodoItem.jsx";

function TodoList({
  tasks,
  hasAnyTasks,
  selectedFilter,
  onToggleTask,
  onDeleteTask,
}) {
  if (!hasAnyTasks) {
    return <p className="empty-message">Det finns inga uppgifter ännu.</p>;
  }

  if (tasks.length === 0) {
    const message =
      selectedFilter === "active"
        ? "Det finns inga aktiva uppgifter."
        : "Det finns inga slutförda uppgifter.";

    return <p className="empty-message">{message}</p>;
  }

  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          onToggleTask={onToggleTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </ul>
  );
}

export default TodoList;
