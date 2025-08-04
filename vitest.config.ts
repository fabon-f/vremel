import { defineConfig } from "vitest/config";

export default defineConfig({
	// TODO: remove this after playwright starts using Firefox 141 or later
	esbuild: {
		target: "es2024",
	},
	test: {
		setupFiles: ["vitest.setup.ts"],
		browser: {
			provider: "playwright",
			instances: [{ browser: "firefox" }],
		},
	},
});
