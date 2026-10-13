import * as esbuild from "esbuild"
import { spawnSync } from "child_process"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, "..")
const runnerSource = path.join(__dirname, "sync-public-seo-run.mjs")
const runnerBundle = path.join(__dirname, ".sync-public-seo-run.cjs")

await esbuild.build({
  entryPoints: [runnerSource],
  bundle: true,
  platform: "node",
  format: "cjs",
  outfile: runnerBundle,
  alias: {
    "@": ROOT,
  },
  logLevel: "silent",
})

const result = spawnSync(process.execPath, [runnerBundle], {
  cwd: ROOT,
  stdio: "inherit",
})

if (result.status !== 0) {
  process.exit(result.status ?? 1)
}
