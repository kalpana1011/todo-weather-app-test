import { http, HttpResponse } from "msw";

export const WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast";

export const TASKS_API_URL = "http://localhost:3001/tasks";

export const mockTasks = [
  { id: "1", title: "Förbered presentation", completed: true },
  { id: "2", title: "Planera nästa lektion", completed: false },
];

export const mockWeatherResponse = {
  latitude: 59.3289,
  longitude: 18.072357,
  timezone: "Europe/Stockholm",
  current_units: {
    time: "iso8601",
    interval: "seconds",
    temperature_2m: "°C",
    weather_code: "wmo code",
  },
  current: {
    time: "2026-08-21T07:15",
    interval: 900,
    temperature_2m: 14.1,
    weather_code: 2,
  },
};

export const handlers = [
  http.get(WEATHER_API_URL, () => {
    return HttpResponse.json(mockWeatherResponse);
  }),
  http.get(TASKS_API_URL, () => {
    return HttpResponse.json(mockTasks);
  }),
  http.post(TASKS_API_URL, async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json(
      {
        id: "mock-new-task",
        title: body.title,
        completed: false,
      },
      { status: 201 },
    );
  }),
  http.patch(`${TASKS_API_URL}/:id`, async ({ request, params }) => {
    const changes = await request.json();
    const existing =
      mockTasks.find((task) => task.id === params.id) ?? mockTasks[0];

    return HttpResponse.json({ ...existing, ...changes });
  }),
  http.delete(`${TASKS_API_URL}/:id`, () => {
    return new HttpResponse(null, { status: 204 });
  }),
];
