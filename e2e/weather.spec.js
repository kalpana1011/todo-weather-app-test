import { expect, test } from "@playwright/test";

test.setTimeout(60_000);

test("shows Stockholm weather and clothing advice from live API", async ({
  page,
}) => {
  await page.goto("/");

  const weatherRegion = page.getByRole("region", { name: "Väder i Stockholm" });
  await expect(weatherRegion).toBeVisible({ timeout: 60_000 });
  await expect(page.getByText("Hämtar vädret…")).toBeHidden();

  await expect(weatherRegion.getByRole("heading", { name: "Stockholm" })).toBeVisible();
  await expect(weatherRegion.getByText(/\d+°C/)).toBeVisible();

  await expect(
    weatherRegion.getByRole("heading", { name: "Klädtips" }),
  ).toBeVisible();
  const advice = weatherRegion.locator(".clothing-advice p");
  await expect(advice).not.toBeEmpty();
});
