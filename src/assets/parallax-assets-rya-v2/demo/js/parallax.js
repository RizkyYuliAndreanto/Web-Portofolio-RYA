/* Vanilla parallax engine v2 - rAF scroll + smoothed pointer depth.
   Layers are declared in HTML with data attributes:
     data-speed   scroll multiplier (0 = static)
     data-scale   base scale
     data-depth-x pointer influence multiplier (default = speed)
*/
(function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const layers = [...document.querySelectorAll(".px-layer")].map((el) => {
    const s = parseFloat(el.dataset.speed || "0");
    return {
      el,
      section: el.closest(".px-section"),
      speed: s,
      scale: parseFloat(el.dataset.scale || "1"),
      depthX: parseFloat(el.dataset.depthX || String(s)),
      ty: 0,
    };
  });

  let mx = 0, my = 0, tmx = 0, tmy = 0;
  if (!reduce) {
    window.addEventListener("pointermove", (e) => {
      tmx = (e.clientX / window.innerWidth - 0.5) * 2;
      tmy = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });
  }

  function frame() {
    mx += (tmx - mx) * 0.08;
    my += (tmy - my) * 0.08;
    const vh = window.innerHeight;

    for (const L of layers) {
      const r = L.section.getBoundingClientRect();
      if (r.bottom < -vh * 0.3 || r.top > vh * 1.3) continue; // cull offscreen
      const progress = (r.top + r.height / 2 - vh / 2) / vh; // -1 .. 1 ish
      const ty = reduce ? 0 : -progress * L.speed * 260;
      const ox = reduce ? 0 : mx * L.depthX * 46;
      const oy = reduce ? 0 : my * L.depthX * 20;
      L.el.style.transform =
        "translate3d(" + ox.toFixed(2) + "px," + (ty + oy).toFixed(2) + "px,0) scale(" + L.scale + ")";
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
