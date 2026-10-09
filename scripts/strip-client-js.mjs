/**
 * Post-process static export:
 * 1. Remove Next client/runtime JS (React hydration, chunks). Safe because every
 *    page is a Server Component with plain <a> links — content is complete HTML.
 * 2. Keep our own effects layer (`/fx/*.js`, vanilla, no deps) and inject it as a
 *    deferred module script. Effects are progressive enhancement only.
 */
import { readdir, readFile, writeFile, rm, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "out");

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else files.push(full);
  }
  return files;
}

const FX_SCRIPT = '<script type="module" src="/fx/main.js"></script>';
const fxDir = path.join(outDir, "fx") + path.sep;

function stripHtml(html) {
  const stripped = html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<script\b[^>]*\/>/gi, "")
    .replace(/<link\b[^>]*rel=["']preload["'][^>]*as=["']script["'][^>]*>/gi, "")
    .replace(/<link\b[^>]*as=["']script["'][^>]*rel=["']preload["'][^>]*>/gi, "");
  return stripped.replace("</body>", `${FX_SCRIPT}</body>`);
}

const htmlFiles = (await walk(outDir)).filter((f) => f.endsWith(".html"));
let removedScripts = 0;
for (const file of htmlFiles) {
  const before = await readFile(file, "utf8");
  const after = stripHtml(before);
  if (after !== before) {
    removedScripts += 1;
    await writeFile(file, after);
  }
}

let jsBytes = 0;
let jsFiles = 0;
const allJs = (await walk(outDir)).filter(
  (f) => f.endsWith(".js") && !f.startsWith(fxDir),
);
for (const file of allJs) {
  jsBytes += (await stat(file)).size;
  jsFiles += 1;
  await rm(file);
}

console.log(
  `strip-client-js: kept /fx effects; cleaned ${removedScripts}/${htmlFiles.length} HTML files; removed ${jsFiles} JS files (${jsBytes} bytes)`,
);
