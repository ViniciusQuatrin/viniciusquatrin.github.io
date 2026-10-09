// Neon point/line globe on raw WebGL (no deps). Lazy-loaded by main.js.
import { spherePoints, sphereLines } from "./geo.js";

const VS = `
attribute vec3 aPos;
uniform mat3 uRot;
uniform vec2 uScale;
uniform vec2 uCenter;
uniform float uPointSize;
varying float vDepth;
varying float vY;
void main() {
  vec3 p = uRot * aPos;
  vDepth = (p.z + 1.0) * 0.5;
  vY = aPos.y;
  gl_Position = vec4(p.xy * uScale + uCenter, 0.0, 1.0);
  gl_PointSize = uPointSize * (0.55 + 0.75 * vDepth);
}`;

const FS = `
precision mediump float;
uniform float uAlpha;
uniform float uIsPoint;
varying float vDepth;
varying float vY;
void main() {
  vec3 cyan = vec3(0.13, 0.83, 0.93);
  vec3 magenta = vec3(0.91, 0.47, 0.98);
  vec3 col = mix(cyan, magenta, (1.0 - vY) * 0.5);
  float a = uAlpha * (0.15 + 0.85 * vDepth);
  if (uIsPoint > 0.5) {
    vec2 d = gl_PointCoord - 0.5;
    float r = dot(d, d);
    if (r > 0.25) discard;
    a *= 1.0 - r * 3.2;
  }
  gl_FragColor = vec4(col * a, a);
}`;

function compile(gl, type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error("shader");
  return s;
}

export function mountGlobe(host, { desktop, reduce }) {
  const canvas = document.createElement("canvas");
  const gl =
    canvas.getContext("webgl", {
      alpha: true,
      antialias: desktop,
      premultipliedAlpha: true,
      powerPreference: "low-power",
    }) || null;
  if (!gl) return; // static image stays

  const prog = gl.createProgram();
  gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VS));
  gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FS));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
  gl.useProgram(prog);

  const N = desktop ? 900 : 360;
  const pts = spherePoints(N);
  const lines = sphereLines(pts, desktop ? 3 : 4, 2);

  const vbo = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  gl.bufferData(gl.ARRAY_BUFFER, pts, gl.STATIC_DRAW);
  const ibo = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, lines, gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(prog, "aPos");
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, 0, 0);

  const u = (n) => gl.getUniformLocation(prog, n);
  const uRot = u("uRot"), uScale = u("uScale"), uCenter = u("uCenter");
  const uPointSize = u("uPointSize"), uAlpha = u("uAlpha"), uIsPoint = u("uIsPoint");

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE); // additive neon
  gl.clearColor(0, 0, 0, 0);

  const dprCap = desktop ? 1.5 : 1;
  let w = 0, h = 0, dpr = 1;
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, dprCap);
    w = host.clientWidth;
    h = host.clientHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
    request();
  }

  // State
  const BASE_RY = 0.6; // fixed resting angle — no idle spin
  let tx = 0, ty = 0, mx = 0, my = 0; // mouse tilt (target/current)
  let running = true;
  let raf = 0;
  let last = 0;
  const frameMs = desktop ? 1000 / 45 : 1000 / 30;

  function scrollProgress() {
    const max = document.documentElement.scrollHeight - innerHeight;
    return max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
  }

  function draw(now) {
    raf = 0;
    if (!running || reduce.matches) return;
    if (now - last < frameMs) {
      request();
      return;
    }
    last = now;

    const p = scrollProgress();
    // Mouse tilt eases toward its target; snap when close so the loop ends.
    let easing = false;
    if (desktop) {
      mx += (tx - mx) * 0.15;
      my += (ty - my) * 0.15;
      if (Math.abs(tx - mx) < 0.01 && Math.abs(ty - my) < 0.01) {
        mx = tx;
        my = ty;
      } else {
        easing = true;
      }
    }
    const ry = BASE_RY + p * Math.PI * 1.1 + mx * 0.25;
    const rx = 0.35 + my * 0.18 - p * 0.25;
    const cy = Math.cos(ry), sy = Math.sin(ry), cx = Math.cos(rx), sx = Math.sin(rx);
    // R = Rx * Ry (column-major for GLSL)
    gl.uniformMatrix3fv(uRot, false, [
      cy, sx * sy, -cx * sy,
      0, cx, sx,
      sy, -sx * cy, cx * cy,
    ]);

    const zoom = 1 - 0.38 * p; // zoom out while scrolling
    const base = desktop ? 0.42 : 0.62; // radius as fraction of min(w,h)
    const r = Math.min(w, h) * base * zoom;
    gl.uniform2f(uScale, (r / w) * 2, (r / h) * 2);
    gl.uniform2f(uCenter, desktop ? 0.42 : 0, desktop ? 0.12 + p * 0.1 : 0.42 - p * 0.3);

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform1f(uIsPoint, 0);
    gl.uniform1f(uAlpha, 0.55);
    gl.drawElements(gl.LINES, lines.length, gl.UNSIGNED_SHORT, 0);
    gl.uniform1f(uIsPoint, 1);
    gl.uniform1f(uAlpha, 1.0);
    gl.uniform1f(uPointSize, (desktop ? 3.6 : 3) * dpr);
    gl.drawArrays(gl.POINTS, 0, N);

    // Event-driven only: keep going while the tilt is still easing, then stop
    // requesting frames (idle = zero rAF). Scroll/pointer restart it.
    if (easing) request();
  }

  function request() {
    if (!raf && running) raf = requestAnimationFrame(draw);
  }

  function pause() {
    running = false;
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  }
  function resume() {
    if (running) return;
    running = true;
    last = 0;
    request();
  }

  addEventListener("scroll", () => request(), { passive: true });
  addEventListener("resize", resize, { passive: true });
  document.addEventListener("visibilitychange", () =>
    document.hidden ? pause() : resume(),
  );
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([e]) => (e.isIntersecting ? resume() : pause())).observe(host);
  }
  if (desktop) {
    addEventListener(
      "pointermove",
      (e) => {
        tx = (e.clientX / innerWidth - 0.5) * 2;
        ty = (e.clientY / innerHeight - 0.5) * 2;
        request();
      },
      { passive: true },
    );
  }
  reduce.addEventListener?.("change", () => {
    if (reduce.matches) {
      pause();
      host.classList.remove("is-live");
    }
  });
  canvas.addEventListener("webglcontextlost", (e) => {
    e.preventDefault();
    pause();
    host.classList.remove("is-live");
  });

  host.appendChild(canvas);
  resize();
  last = 0;
  // First frame drawn synchronously-ish, then swap static image for canvas.
  requestAnimationFrame((t) => {
    draw(t + frameMs);
    host.classList.add("is-live");
  });
}
