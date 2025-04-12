import { copyFile, glob, readFile, rm } from "node:fs/promises";
import path from "node:path";

import { exec } from "tinyexec";

const distPath = path.join(import.meta.dirname, "../dist");
await rm(distPath, { recursive: true, force: true });

// this script should be run within npm script
const res = await exec("tsc", ["-p", "tsconfig.build.json"]);
if (res.exitCode !== 0) {
	console.log(res.stdout);
	process.exit(res.exitCode ?? -1);
}

await copyFile("src/temporal.d.ts", "dist/temporal.d.ts");

// Remove empty declaration files
for await (const dtsFile of glob("dist/**/*.d.ts")) {
	const source = await readFile(dtsFile, "utf-8");
	const match = /^export {};\n\/\/# sourceMappingURL=(.+)$/.exec(source);
	if (match) {
		const sourcemapPath = path.resolve(path.dirname(dtsFile), match[1]);
		await rm(dtsFile);
		await rm(sourcemapPath);
	}
}
