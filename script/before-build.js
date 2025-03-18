import { rm } from "node:fs/promises";
import path from "node:path";

const distPath = path.join(import.meta.dirname, "../dist");
await rm(distPath, { recursive: true, force: true });
