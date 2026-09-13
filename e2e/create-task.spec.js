import { expect, test } from "@playwright/test";

test("creates a valid task and updates summary counts", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Todo-lista" })).toBeVisible();
  await expect(page.getByText("Laddar uppgifter…")).toBeHidden();

  const summary = page.getByLabel("Sammanfattning");
  const totalBefore = await summary.getByText(/^Totalt:/).textContent();
  const totalMatch = totalBefore?.match(/Totalt:\s*(\d+)/);
  const countBefore = Number(totalMatch?.[1] ?? 0);

  const taskTitle = `E2E task ${Date.now()}`;
  await page.getByLabel("Ny uppgift").fill(taskTitle);
  await page.getByRole("button", { name: "Lägg till" }).click();

  await expect(page.getByText(taskTitle)).toBeVisible();
  await expect(page.getByLabel("Ny uppgift")).toHaveValue("");

  const totalAfter = await summary.getByText(/^Totalt:/).textContent();
  const afterMatch = totalAfter?.match(/Totalt:\s*(\d+)/);
  const countAfter = Number(afterMatch?.[1] ?? 0);

  expect(countAfter).toBe(countBefore + 1);
});
