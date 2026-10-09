// Shared globe geometry (used by the runtime WebGL globe and by
// scripts/gen-globe-svg.mjs for the static fallback image).

/** Fibonacci sphere: n evenly spread unit vectors. */
export function spherePoints(n) {
  const pts = new Float32Array(n * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const t = golden * i;
    pts[i * 3] = Math.cos(t) * r;
    pts[i * 3 + 1] = y;
    pts[i * 3 + 2] = Math.sin(t) * r;
  }
  return pts;
}

/**
 * Sparse "network" lines: each point links to its nearest neighbour(s),
 * only for a deterministic subset so the mesh stays light.
 */
export function sphereLines(pts, every = 3, maxLinks = 2) {
  const n = pts.length / 3;
  const pairs = [];
  const seen = new Set();
  for (let i = 0; i < n; i += every) {
    const best = [];
    for (let j = 0; j < n; j++) {
      if (j === i) continue;
      const dx = pts[i * 3] - pts[j * 3];
      const dy = pts[i * 3 + 1] - pts[j * 3 + 1];
      const dz = pts[i * 3 + 2] - pts[j * 3 + 2];
      const d = dx * dx + dy * dy + dz * dz;
      best.push([d, j]);
      if (best.length > maxLinks * 4) {
        best.sort((a, b) => a[0] - b[0]);
        best.length = maxLinks;
      }
    }
    best.sort((a, b) => a[0] - b[0]);
    for (let k = 0; k < Math.min(maxLinks, best.length); k++) {
      const j = best[k][1];
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (seen.has(key)) continue;
      seen.add(key);
      pairs.push(i, j);
    }
  }
  return new Uint16Array(pairs);
}

/** Cyan (top) → magenta (bottom). Returns [r,g,b] in 0..1. */
export function neonColor(y) {
  const t = (1 - y) / 2;
  const c = [0.13, 0.83, 0.93];
  const m = [0.91, 0.47, 0.98];
  return [c[0] + (m[0] - c[0]) * t, c[1] + (m[1] - c[1]) * t, c[2] + (m[2] - c[2]) * t];
}
