import { readdir, rm } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";

import { consola } from "consola";

const require = createRequire(import.meta.url);
const srcPath = path.join(import.meta.dirname, "../src");

async function listFns(dirname: string) {
	const files = await readdir(path.join(srcPath, dirname));
	return files
		.filter(
			(d) => d.endsWith(".ts") && !d.endsWith(".test.ts") && !d.startsWith("_") && d !== "index.ts",
		)
		.map((f) => f.replace(/\.ts$/, ""));
}

async function check(dirname: string, moduleName: string) {
	let fail = false;
	const fns = await listFns(dirname);
	const mod1 = await import(moduleName);
	const mod2 = require(moduleName);

	for (const mod of [mod1, mod2]) {
		for (const fnName of fns) {
			const fn = mod[fnName];
			if (typeof fn !== "function") {
				consola.error(`Missing function in ${dirname}/index.ts: ${fnName}`);
				fail = true;
				continue;
			}
			if (fn.name !== fnName) {
				consola.error(
					`Incorrect function name in ${dirname}/index.ts: expected ${fnName}, actual ${fn.name}`,
				);
			}
		}
	}
	if (fail) {
		throw new Error();
	}
}

try {
	await check("datetime", "vremel");
	await check("duration", "vremel/duration");
} catch (e) {
	consola.error(e);
	await rm(path.join(srcPath, "../dist"), { recursive: true, force: true });
	process.exit(1);
}
