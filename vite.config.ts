import { defineConfig } from 'vitest/config'
import { svelte } from '@sveltejs/vite-plugin-svelte'

let reporter = ["text-summary", "html"];
if (process.env.CI) {
  // Include CI reports
  reporter = ["lcovonly", "cobertura"];
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  test: {
    coverage: {
      provider: "v8",
      reporter: reporter,
      include: ["src/**/*.*"],
    },
    environment: "jsdom",
    setupFiles: [
      "src/vitest.setup.ts"
    ],
    alias: [
      { find: /^svelte$/, replacement: "svelte/internal" }
    ]
  }
})
