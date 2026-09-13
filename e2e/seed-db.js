import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const seedPath = path.join(rootDir, "e2e/fixtures/db.seed.json");
const runtimePath = path.join(rootDir, "db.e2e.json");

fs.copyFileSync(seedPath, runtimePath);
