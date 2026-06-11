import { defineConfig } from "vitest/config";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { svelteTesting } from '@testing-library/svelte/vite';

// Include CI reports
const reporter = process.env.CI
	? ["lcovonly", "cobertura"]
	: ["text-summary", "html"];

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
	const isTest = mode === 'test' || process.env.NODE_ENV === 'test';
	return {
		plugins: [svelte({
			compilerOptions: {
				// Lock down hash names for unit test snapshots
				cssHash: isTest
					? ({name}) => `svelte-${name}`
					: undefined
			}
		}), svelteTesting()],
		test: {
			coverage: {
				provider: "v8",
				reporter,
				include: ["src/**/*.*"],
			},
			environment: "jsdom",
			setupFiles: ["src/vitest.setup.ts"],
		},
	};
});
