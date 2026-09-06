import { useState } from "react";
import { validateTitle } from "../utils/taskUtils.js";

function TodoForm({ onAddTask, isSaving, buttonVariant }) {
  const [title, setTitle] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errorMessage = validateTitle(title);
    setValidationError(errorMessage);

    if (errorMessage) {
      return;
    }

    const taskWasCreated = await onAddTask(title.trim());

    if (taskWasCreated) {
      setTitle("");
    }
  };

  const handleChange = (event) => {
    setTitle(event.target.value);

    if (validationError) {
      setValidationError("");
    }
  };

  const buttonText = buttonVariant === "B" ? "Skapa uppgift" : "Lägg till";

  return (
    <form className="todo-form" onSubmit={handleSubmit} noValidate>
      <label htmlFor="task-title">Ny uppgift</label>

      <div className="form-row">
        <input
          id="task-title"
          name="taskTitle"
          type="text"
          value={title}
          onChange={handleChange}
          placeholder="Vad behöver du göra?"
          aria-describedby={validationError ? "title-error" : undefined}
          aria-invalid={Boolean(validationError)}
        />

        <button type="submit" disabled={isSaving}>
          {isSaving ? "Sparar…" : buttonText}
        </button>
      </div>

      {validationError && (
        <p id="title-error" className="validation-error" role="alert">
          {validationError}
        </p>
      )}
    </form>
  );
}

export default TodoForm;
