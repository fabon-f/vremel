// @ts-nocheck
import { copyFile, readdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { consola } from "consola";

const srcPath = path.join(fileURLToPath(import.meta.url), "../../src");

await copyFile("src/temporal.d.ts", "dist/esm/temporal.d.ts");

async function listFns(dirname) {
	const files = await readdir(path.join(srcPath, dirname));
	return files
		.filter(
			(d) =>
				d.endsWith(".ts") &&
				!d.endsWith(".test.ts") &&
				!d.startsWith("_") &&
				d !== "index.ts",
		)
		.map((f) => f.replace(/\.ts$/, ""));
}

async function check(dirname, moduleName) {
	let fail = false;
	const fns = await listFns(dirname);
	const mod = await import(moduleName);
	for (const fn of fns) {
		if (typeof mod[fn] !== "function") {
			consola.error(`Missing function in ${dirname}/index.ts: ${fn}`);
			fail = true;
		}
	}
	if (fail) {
		throw new Error();
	}
}

try {
	await check("datetime", "vremel");
	await check("duration", "vremel/duration");
} catch {
	await rm(path.join(srcPath, "../dist"), { recursive: true, force: true });
	process.exit(1);
}
