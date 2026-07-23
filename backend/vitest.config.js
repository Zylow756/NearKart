import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    setupFiles: "./src/tests/setup/setup.js",
     testTimeout: 120000,
    hookTimeout: 300000,
  },
});