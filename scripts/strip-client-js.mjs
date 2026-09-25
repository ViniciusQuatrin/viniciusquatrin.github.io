/**
 * Post-process static export for a text-only portfolio:
 * remove Next client/runtime JS (scripts + chunks + manifests). HTML/CSS/fonts stay.
 * Safe because the site uses Server Components + plain <a> only — no client interactivity.
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

function stripHtml(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<script\b[^>]*\/>/gi, "")
    .replace(/<link\b[^>]*rel=["']preload["'][^>]*as=["']script["'][^>]*>/gi, "")
    .replace(/<link\b[^>]*as=["']script["'][^>]*rel=["']preload["'][^>]*>/gi, "");
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
const allJs = (await walk(outDir)).filter((f) => f.endsWith(".js"));
for (const file of allJs) {
  jsBytes += (await stat(file)).size;
  jsFiles += 1;
  await rm(file);
}

console.log(
  `strip-client-js: cleaned ${removedScripts}/${htmlFiles.length} HTML files; removed ${jsFiles} JS files (${jsBytes} bytes)`,
);
