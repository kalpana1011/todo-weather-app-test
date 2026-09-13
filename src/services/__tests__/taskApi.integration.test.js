import { http, HttpResponse } from "msw";
import { describe, expect, it } from "vitest";
import { mockTasks, TASKS_API_URL } from "../../../msw/handlers.js";
import { server } from "../../../msw/server.js";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../taskApi.js";

describe("taskApi (MSW integration)", () => {
  it("getTasks returns the mocked task list", async () => {
    const result = await getTasks();

    expect(result).toEqual(mockTasks);
  });

  it("getTasks throws when the mocked API returns an error", async () => {
    server.use(
      http.get(TASKS_API_URL, () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );

    await expect(getTasks()).rejects.toThrow(
      "Det gick inte att hämta uppgifterna.",
    );
  });

  it("createTask posts a title and returns the created task", async () => {
    const result = await createTask("Ny uppgift från test");

    expect(result).toEqual({
      id: "mock-new-task",
      title: "Ny uppgift från test",
      completed: false,
    });
  });

  it("createTask throws when the mocked API returns an error", async () => {
    server.use(
      http.post(TASKS_API_URL, () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );

    await expect(createTask("Fail")).rejects.toThrow(
      "Det gick inte att skapa uppgiften.",
    );
  });

  it("updateTask patches changes and returns the updated task", async () => {
    const result = await updateTask("2", { completed: true });

    expect(result).toEqual({
      id: "2",
      title: "Planera nästa lektion",
      completed: true,
    });
  });

  it("updateTask throws when the mocked API returns an error", async () => {
    server.use(
      http.patch(`${TASKS_API_URL}/:id`, () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );

    await expect(updateTask("2", { completed: true })).rejects.toThrow(
      "Det gick inte att uppdatera uppgiften.",
    );
  });

  it("deleteTask returns null when the mocked API responds with 204", async () => {
    const result = await deleteTask("1");

    expect(result).toBeNull();
  });

  it("deleteTask throws when the mocked API returns an error", async () => {
    server.use(
      http.delete(`${TASKS_API_URL}/:id`, () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );

    await expect(deleteTask("1")).rejects.toThrow(
      "Det gick inte att ta bort uppgiften.",
    );
  });
});
