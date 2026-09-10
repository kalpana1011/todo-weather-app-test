import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import TodoList from "../TodoList.jsx";

const sampleTasks = [
  { id: "1", title: "First task", completed: false },
  { id: "2", title: "Second task", completed: true },
];

const defaultProps = {
  onToggleTask: vi.fn(),
  onDeleteTask: vi.fn(),
};

describe("TodoList", () => {
  it("shows a message when there are no tasks at all", () => {
    render(
      <TodoList
        {...defaultProps}
        tasks={[]}
        hasAnyTasks={false}
        selectedFilter="all"
      />,
    );

    expect(
      screen.getByText("Det finns inga uppgifter ännu."),
    ).toBeInTheDocument();
  });

  it("shows a message when the active filter has no matching tasks", () => {
    render(
      <TodoList
        {...defaultProps}
        tasks={[]}
        hasAnyTasks={true}
        selectedFilter="active"
      />,
    );

    expect(
      screen.getByText("Det finns inga aktiva uppgifter."),
    ).toBeInTheDocument();
  });

  it("shows a message when the completed filter has no matching tasks", () => {
    render(
      <TodoList
        {...defaultProps}
        tasks={[]}
        hasAnyTasks={true}
        selectedFilter="completed"
      />,
    );

    expect(
      screen.getByText("Det finns inga slutförda uppgifter."),
    ).toBeInTheDocument();
  });

  it("renders task titles when tasks are provided", () => {
    render(
      <TodoList
        {...defaultProps}
        tasks={sampleTasks}
        hasAnyTasks={true}
        selectedFilter="all"
      />,
    );

    expect(screen.getByText("First task")).toBeInTheDocument();
    expect(screen.getByText("Second task")).toBeInTheDocument();
  });
});
