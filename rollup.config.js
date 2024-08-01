/** @type {import("rollup").RollupOptions} */
export default {
	input: {
		index: "dist/esm/index.js",
		"duration/index": "dist/esm/duration/index.js",
	},
	output: {
		dir: "dist/cjs",
		format: "cjs",
		preserveModules: true,
		entryFileNames: "[name].cjs",
		chunkFileNames: "[name]-[hash].cjs",
	},
	external: ["@date-fns/utc"],
};
