/**
 * Generates public/fx/globe.svg — the static globe used when motion is
 * reduced, JS is off, the device is weak, or WebGL fails.
 * Run: node scripts/gen-globe-svg.mjs
 */
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spherePoints, sphereLines, neonColor } from "../public/fx/geo.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const N = 520;
const pts = spherePoints(N);
const lines = sphereLines(pts, 3, 2);
const S = 400; // viewBox half-size
const R = 340;
const tiltX = 0.35;
const rotY = 0.6;

function project(i) {
  let x = pts[i * 3], y = pts[i * 3 + 1], z = pts[i * 3 + 2];
  const cy = Math.cos(rotY), sy = Math.sin(rotY);
  [x, z] = [x * cy + z * sy, -x * sy + z * cy];
  const cx = Math.cos(tiltX), sx = Math.sin(tiltX);
  [y, z] = [y * cx - z * sx, y * sx + z * cx];
  return { x: S + x * R, y: S - y * R, z, oy: pts[i * 3 + 1] };
}

const hex = (c) =>
  "#" + c.map((v) => Math.round(v * 255).toString(16).padStart(2, "0")).join("");
const f = (v) => v.toFixed(1);

let out = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S * 2} ${S * 2}">`;
out += `<g stroke-width="0.8" fill="none">`;
for (let k = 0; k < lines.length; k += 2) {
  const a = project(lines[k]), b = project(lines[k + 1]);
  const depth = (a.z + b.z) / 2; // -1 back … 1 front
  const op = 0.12 + 0.35 * ((depth + 1) / 2);
  out += `<line x1="${f(a.x)}" y1="${f(a.y)}" x2="${f(b.x)}" y2="${f(b.y)}" stroke="${hex(neonColor(a.oy))}" stroke-opacity="${op.toFixed(2)}"/>`;
}
out += `</g><g>`;
for (let i = 0; i < N; i++) {
  const p = project(i);
  const op = 0.2 + 0.8 * ((p.z + 1) / 2);
  out += `<circle cx="${f(p.x)}" cy="${f(p.y)}" r="${(1.2 + p.z * 0.6).toFixed(2)}" fill="${hex(neonColor(p.oy))}" fill-opacity="${op.toFixed(2)}"/>`;
}
out += `</g></svg>\n`;
await writeFile(path.join(root, "public/fx/globe.svg"), out);
console.log(`globe.svg: ${N} points, ${lines.length / 2} lines, ${out.length} bytes`);
