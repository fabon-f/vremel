import { copyFile } from "node:fs/promises";

await copyFile("src/temporal.d.ts", "dist/esm/temporal.d.ts");
