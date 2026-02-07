import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

process.chdir(projectRoot);

const nextBin = path.join(projectRoot, "node_modules", ".bin", "next");
const result = spawnSync(
  process.execPath,
  [nextBin, "dev", ...process.argv.slice(2)],
  { stdio: "inherit", cwd: projectRoot, env: { ...process.env, INIT_CWD: projectRoot } }
);
process.exit(result.status ?? 1);
