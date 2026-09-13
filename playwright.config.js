import { defineConfig } from "@playwright/test";

const reuseExistingServer = !process.env.CI;

export default defineConfig({
  testDir: "e2e",
  fullyParallel: false,
  workers: 1,
  retries: process.env.CI ? 2 : 0,
  timeout: 30_000,
  globalSetup: "./e2e/global-setup.js",
  use: {
    baseURL: "http://localhost:5173",
    trace: "on-first-retry",
  },
  webServer: [
    {
      command: "npm run server:e2e",
      url: "http://localhost:3001/tasks",
      reuseExistingServer,
      timeout: 120_000,
    },
    {
      command: "npm run dev",
      url: "http://localhost:5173",
      reuseExistingServer,
      timeout: 120_000,
    },
  ],
});
