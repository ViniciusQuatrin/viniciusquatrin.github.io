// Portfolio v2 effects. Loaded as a module after the server-rendered HTML;
// content never depends on it. Everything here is progressive enhancement.
(() => {
  const root = document.documentElement;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)");
  if (reduce.matches) return; // nothing moves: static globe + static neon (CSS)

  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const desktop = finePointer && matchMedia("(min-width: 1024px)").matches;
  root.dataset.fx = "on";

  /* ---------- Glitch (~150ms, on enter / hover, never loops) ---------- */
  function glitch(el) {
    if (reduce.matches || el.classList.contains("fx-glitch")) return;
    el.classList.add("fx-glitch");
    setTimeout(() => el.classList.remove("fx-glitch"), 170);
  }
  const headings = document.querySelectorAll("main h1, main h2");
  headings.forEach((h) => {
    h.addEventListener("pointerenter", () => glitch(h));
  });
  const h1 = document.querySelector("main h1");
  if (h1) requestAnimationFrame(() => glitch(h1));

  /* ---------- Section reveal (fade + short slide, once) ---------- */
  const sections = document.querySelectorAll(
    "main > section, main > article > section, main > div > .stack-sections > section, main .case-grid > .fx-card",
  );
  if ("IntersectionObserver" in window) {
    const vh = window.innerHeight;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target;
          io.unobserve(el);
          el.classList.add("fx-revealed");
          el.classList.remove("fx-pending");
          const h = el.querySelector("h2");
          if (h) setTimeout(() => glitch(h), 120);
          el.addEventListener(
            "transitionend",
            () => el.classList.remove("fx-revealed"),
            { once: true },
          );
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    sections.forEach((el) => {
      // Only below-the-fold blocks are hidden; hero + proofs never wait.
      if (el.getBoundingClientRect().top < vh * 0.92) return;
      el.classList.add("fx-pending");
      io.observe(el);
    });
  }

  /* ---------- Card tilt (desktop only, a few degrees) ---------- */
  if (desktop) {
    const MAX = 4;
    document.querySelectorAll(".fx-card").forEach((card) => {
      let raf = 0;
      card.addEventListener("pointermove", (ev) => {
        if (reduce.matches) return;
        const r = card.getBoundingClientRect();
        const px = (ev.clientX - r.left) / r.width - 0.5;
        const py = (ev.clientY - r.top) / r.height - 0.5;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          card.classList.add("is-tilting");
          card.style.setProperty("--ry", `${(px * MAX * 2).toFixed(2)}deg`);
          card.style.setProperty("--rx", `${(-py * MAX * 2).toFixed(2)}deg`);
        });
      });
      card.addEventListener("pointerleave", () => {
        cancelAnimationFrame(raf);
        card.classList.remove("is-tilting");
        card.style.removeProperty("--rx");
        card.style.removeProperty("--ry");
      });
    });
  }

  /* ---------- Globe (lazy, after load + idle; never blocks LCP) ---------- */
  const host = document.querySelector(".bg-globe");
  if (!host) return;
  const weak =
    (navigator.deviceMemory && navigator.deviceMemory < 4) ||
    (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) ||
    navigator.connection?.saveData;
  if (weak) return; // keep static image

  const start = () =>
    import("./globe.js")
      .then((m) => m.mountGlobe(host, { desktop, reduce }))
      .catch(() => {
        /* static image stays */
      });
  const idle = (fn) =>
    "requestIdleCallback" in window
      ? requestIdleCallback(fn, { timeout: 2500 })
      : setTimeout(fn, 600);
  if (document.readyState === "complete") idle(start);
  else addEventListener("load", () => idle(start), { once: true });
})();
