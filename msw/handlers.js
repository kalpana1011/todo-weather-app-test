import { http, HttpResponse } from "msw";

export const WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast";

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
];
