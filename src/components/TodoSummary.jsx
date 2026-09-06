import {
  countActiveTasks,
  countCompletedTasks,
} from "../utils/taskUtils.js";

function TodoSummary({ tasks }) {
  return (
    <footer className="todo-summary" aria-label="Sammanfattning">
      <span>Totalt: {tasks.length}</span>
      <span>Aktiva: {countActiveTasks(tasks)}</span>
      <span>Slutförda: {countCompletedTasks(tasks)}</span>
    </footer>
  );
}

export default TodoSummary;
