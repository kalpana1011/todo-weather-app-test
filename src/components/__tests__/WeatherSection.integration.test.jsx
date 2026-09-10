import { render, screen } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { describe, expect, it } from "vitest";
import {
  mockWeatherResponse,
  WEATHER_API_URL,
} from "../../../msw/handlers.js";
import { server } from "../../../msw/server.js";
import { getClothingAdvice } from "../../utils/weatherUtils.js";
import WeatherSection from "../WeatherSection.jsx";

const { temperature_2m, weather_code } = mockWeatherResponse.current;
const expectedTemperature = `${Math.round(temperature_2m)}°C`;
const expectedAdvice = getClothingAdvice(temperature_2m, weather_code);

function renderWeatherSection() {
  render(<WeatherSection />);
}

describe("WeatherSection (MSW integration)", () => {
  it("shows a loading message while weather is fetched", () => {
    // Arrange
    renderWeatherSection();

    // Assert
    expect(screen.getByText("Hämtar vädret…")).toBeInTheDocument();
  });

  it("shows Stockholm, temperature, and clothing advice on success", async () => {
    // Arrange
    renderWeatherSection();

    // Assert
    expect(
      await screen.findByRole("heading", { name: "Stockholm" }),
    ).toBeInTheDocument();
    expect(screen.getByText(expectedTemperature)).toBeInTheDocument();
    expect(screen.getByText(expectedAdvice)).toBeInTheDocument();
  });

  it("shows an error message when the weather API fails", async () => {
    // Arrange
    server.use(
      http.get(WEATHER_API_URL, () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );
    renderWeatherSection();

    // Assert
    expect(
      await screen.findByText("Det gick inte att hämta vädret."),
    ).toBeInTheDocument();
  });
});
