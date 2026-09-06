import { describe, expect, it } from "vitest";
import { getClothingAdvice, getWeatherIcon } from "../weatherUtils.js";

describe("getWeatherIcon", () => {
  it("returns a sun icon for clear weather", () => {
    expect(getWeatherIcon(0)).toBe("☀️");
  });

  it("returns a partly cloudy icon for cloudy weather codes", () => {
    expect(getWeatherIcon(2)).toBe("⛅");
  });

  it("returns a fog icon for fog weather codes", () => {
    expect(getWeatherIcon(45)).toBe("🌫️");
    expect(getWeatherIcon(48)).toBe("🌫️");
  });

  it("returns a rain icon for rainy weather codes", () => {
    expect(getWeatherIcon(55)).toBe("🌧️");
  });

  it("returns a snow icon for snowy weather codes", () => {
    expect(getWeatherIcon(75)).toBe("🌨️");
  });

  it("returns a shower icon for shower weather codes", () => {
    expect(getWeatherIcon(81)).toBe("🌦️");
  });

  it("returns a thunder icon for unhandled weather codes", () => {
    expect(getWeatherIcon(95)).toBe("⛈️");
  });
});

describe("getClothingAdvice", () => {
  it("recommends warm winter clothing below 5°C", () => {
    expect(getClothingAdvice(2, 0)).toBe(
      "Ta på dig en varm jacka, mössa och handskar.",
    );
  });

  it("recommends a jacket below 15°C", () => {
    expect(getClothingAdvice(10, 0)).toBe(
      "Ta på dig en jacka eller varm tröja.",
    );
  });

  it("recommends a light jacket below 20°C", () => {
    expect(getClothingAdvice(18, 0)).toBe(
      "En tunn jacka eller tröja kan vara bra.",
    );
  });

  it("recommends light clothing at 20°C or above", () => {
    expect(getClothingAdvice(22, 0)).toBe("Ta på dig lätta kläder.");
  });

  it("adds umbrella advice for rainy weather codes", () => {
    expect(getClothingAdvice(22, 61)).toBe(
      "Ta på dig lätta kläder. Ta även med ett paraply.",
    );
  });

  it("does not add umbrella advice for non-rainy weather", () => {
    expect(getClothingAdvice(22, 0)).toBe("Ta på dig lätta kläder.");
  });
});
