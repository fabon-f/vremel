import { rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootPath = path.join(fileURLToPath(import.meta.url), "../..");
await rm(path.join(rootPath, "dist"), { recursive: true, force: true });
