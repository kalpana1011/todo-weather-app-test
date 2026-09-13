import { expect, test } from "@playwright/test";

const ACTIVE_TITLE = "E2E Active Task";
const DONE_TITLE = "E2E Done Task";

test("filters active and completed tasks", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText("Laddar uppgifter…")).toBeHidden();
  await expect(page.getByText(ACTIVE_TITLE)).toBeVisible();
  await expect(page.getByText(DONE_TITLE)).toBeVisible();

  const filterBar = page.getByLabel("Filtrera uppgifter");

  await filterBar.getByRole("button", { name: "Aktiva" }).click();
  await expect(page.getByText(ACTIVE_TITLE)).toBeVisible();
  await expect(page.getByText(DONE_TITLE)).toBeHidden();

  await filterBar.getByRole("button", { name: "Slutförda" }).click();
  await expect(page.getByText(DONE_TITLE)).toBeVisible();
  await expect(page.getByText(ACTIVE_TITLE)).toBeHidden();

  await filterBar.getByRole("button", { name: "Alla" }).click();
  await expect(page.getByText(ACTIVE_TITLE)).toBeVisible();
  await expect(page.getByText(DONE_TITLE)).toBeVisible();
});
