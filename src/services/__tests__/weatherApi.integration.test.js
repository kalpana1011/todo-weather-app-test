import { http, HttpResponse } from "msw";
import { describe, expect, it } from "vitest";
import {
  mockWeatherResponse,
  WEATHER_API_URL,
} from "../../../msw/handlers.js";
import { server } from "../../../msw/server.js";
import { getStockholmWeather } from "../weatherApi.js";

const { temperature_2m, weather_code } = mockWeatherResponse.current;

describe("getStockholmWeather (MSW integration)", () => {
  it("returns temperature and weatherCode as numbers from the mocked API", async () => {
    // Act
    const result = await getStockholmWeather();

    // Assert
    expect(typeof result.temperature).toBe("number");
    expect(typeof result.weatherCode).toBe("number");
    expect(result.temperature).toBe(temperature_2m);
    expect(result.weatherCode).toBe(weather_code);
  });

  it("throws when the mocked API returns an error response", async () => {
    // Arrange
    server.use(
      http.get(WEATHER_API_URL, () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );

    // Act & Assert
    await expect(getStockholmWeather()).rejects.toThrow(
      "Det gick inte att hämta vädret.",
    );
  });
});
