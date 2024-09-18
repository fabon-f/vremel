import { copyFile, readdir, rm, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { consola } from "consola";

const require = createRequire(import.meta.url);
const srcPath = path.join(fileURLToPath(import.meta.url), "../../src");

const declarationFiles = (
	await readdir("dist/esm", { recursive: true })
).filter((f) => f.endsWith(".d.ts") || f.endsWith(".d.ts.map"));
await Promise.all(
	declarationFiles.map((f) => copyFile(`dist/esm/${f}`, `dist/cjs/${f}`)),
);
await writeFile("dist/cjs/package.json", JSON.stringify({ type: "commonjs" }));
await copyFile("src/temporal.d.ts", "dist/esm/temporal.d.ts");
await copyFile("src/temporal.d.ts", "dist/cjs/temporal.d.ts");

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
