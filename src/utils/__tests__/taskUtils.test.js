import { describe, expect, it } from "vitest";
import {
  countActiveTasks,
  countCompletedTasks,
  filterTasks,
  validateTitle,
} from "../taskUtils.js";

const sampleTasks = [
  { id: "1", title: "First task", completed: true },
  { id: "2", title: "Second task", completed: false },
  { id: "3", title: "Third task", completed: false },
];

describe("validateTitle", () => {
  it("returns an error when the title is empty", () => {
    expect(validateTitle("")).toBe("Skriv en uppgift innan du fortsätter.");
  });

  it("returns an error when the title is only whitespace", () => {
    expect(validateTitle("   ")).toBe("Skriv en uppgift innan du fortsätter.");
  });

  it("returns an error when the title is too short", () => {
    expect(validateTitle("a")).toBe(
      "Uppgiften måste innehålla minst två tecken.",
    );
  });

  it("returns an empty string for a valid title", () => {
    expect(validateTitle("Buy milk")).toBe("");
  });
});

describe("filterTasks", () => {
  it('returns all tasks when the filter is "all"', () => {
    expect(filterTasks(sampleTasks, "all")).toEqual(sampleTasks);
  });

  it('returns only active tasks when the filter is "active"', () => {
    expect(filterTasks(sampleTasks, "active")).toEqual([
      { id: "2", title: "Second task", completed: false },
      { id: "3", title: "Third task", completed: false },
    ]);
  });

  it('returns only completed tasks when the filter is "completed"', () => {
    expect(filterTasks(sampleTasks, "completed")).toEqual([
      { id: "1", title: "First task", completed: true },
    ]);
  });
});

describe("countActiveTasks", () => {
  it("counts only incomplete tasks in a mixed list", () => {
    expect(countActiveTasks(sampleTasks)).toBe(2);
  });
});

describe("countCompletedTasks", () => {
  it("counts only completed tasks in a mixed list", () => {
    expect(countCompletedTasks(sampleTasks)).toBe(1);
  });

  it("returns zero for an empty list", () => {
    expect(countCompletedTasks([])).toBe(0);
  });
});
