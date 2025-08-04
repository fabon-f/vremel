import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		setupFiles: ["vitest.setup.ts"],
		browser: {
			provider: "playwright",
			instances: [{ browser: "firefox" }],
		},
	},
});
