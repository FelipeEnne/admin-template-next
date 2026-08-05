import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["__tests__/**/*.test.{ts,tsx}"],
    coverage: {
      include: ["src/**/*.{ts,tsx}"],
      // Patamar atual arredondado para baixo: serve para travar regressão,
      // não para forçar 100%. Suba junto com a cobertura.
      thresholds: {
        statements: 85,
        branches: 90,
        functions: 80,
        lines: 85,
      },
    },
  },
});
