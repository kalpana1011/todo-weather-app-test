import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import TodoForm from "../TodoForm.jsx";

function renderTodoForm(props = {}) {
  const defaultProps = {
    onAddTask: vi.fn().mockResolvedValue(true),
    isSaving: false,
    buttonVariant: "A",
  };

  return {
    onAddTask: defaultProps.onAddTask,
    user: userEvent.setup(),
    ...render(<TodoForm {...defaultProps} {...props} />),
  };
}

describe("TodoForm", () => {
  it("shows a validation alert when the form is submitted empty", async () => {
    const { user } = renderTodoForm();

    await user.click(screen.getByRole("button", { name: "Lägg till" }));

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Skriv en uppgift innan du fortsätter.",
    );
  });

  it("calls onAddTask with a trimmed title for valid input", async () => {
    const onAddTask = vi.fn().mockResolvedValue(true);
    const { user } = renderTodoForm({ onAddTask });

    await user.type(screen.getByLabelText("Ny uppgift"), "  Buy milk  ");
    await user.click(screen.getByRole("button", { name: "Lägg till" }));

    expect(onAddTask).toHaveBeenCalledWith("Buy milk");
  });

  it("clears the input after a task is created successfully", async () => {
    const { user } = renderTodoForm();

    await user.type(screen.getByLabelText("Ny uppgift"), "Buy milk");
    await user.click(screen.getByRole("button", { name: "Lägg till" }));

    expect(screen.getByLabelText("Ny uppgift")).toHaveValue("");
  });

  it("shows a saving label and disables submit while isSaving is true", () => {
    renderTodoForm({ isSaving: true });

    expect(screen.getByRole("button", { name: "Sparar…" })).toBeDisabled();
  });
});
