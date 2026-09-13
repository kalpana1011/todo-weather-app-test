import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    include: ["src/**/*.{test,spec}.{js,jsx}"],
    environment: "jsdom",
    globals: true,
    setupFiles: "./vitest.setup.js",
    coverage: {
      provider: "v8",
      include: ["src/**/*.{js,jsx}"],
      exclude: [
        "msw/**",
        "src/**/__tests__/**",
        "src/main.jsx",
      ],
      reporter: ["text", "html"],
    },
  },
});
