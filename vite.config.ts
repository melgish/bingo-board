import { defineConfig } from 'vitest/config'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  test: {
    coverage: {
      provider: "v8",
      reporter: ['text-summary', 'lcovonly', 'cobertura']
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
