import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import TodoItem from "../TodoItem.jsx";

const task = {
  id: "1",
  title: "Plan lesson",
  completed: false,
};

describe("TodoItem", () => {
  it("calls onToggleTask when the checkbox is clicked", async () => {
    const onToggleTask = vi.fn();
    const user = userEvent.setup();

    render(
      <TodoItem
        task={task}
        onToggleTask={onToggleTask}
        onDeleteTask={vi.fn()}
      />,
    );

    await user.click(screen.getByRole("checkbox"));

    expect(onToggleTask).toHaveBeenCalledWith(task);
  });

  it("calls onDeleteTask with the task id when delete is clicked", async () => {
    const onDeleteTask = vi.fn();
    const user = userEvent.setup();

    render(
      <TodoItem
        task={task}
        onToggleTask={vi.fn()}
        onDeleteTask={onDeleteTask}
      />,
    );

    await user.click(
      screen.getByRole("button", { name: "Ta bort Plan lesson" }),
    );

    expect(onDeleteTask).toHaveBeenCalledWith("1");
  });
});
