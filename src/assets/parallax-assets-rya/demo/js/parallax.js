/*  RYA Parallax Engine — vanilla JS, no dependency.
 *  Cara pakai: setiap layer diberi data-speed (0 = statis, 1 = paling cepat)
 *  dan opsional data-depth-x untuk gerak mengikuti mouse.
 */
(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var layers = [].slice.call(document.querySelectorAll(".px-layer"));
  var mouse = { x: 0, y: 0 }, target = { x: 0, y: 0 };
  var ticking = false;

  if (reduce) return;

  window.addEventListener("mousemove", function (e) {
    target.x = (e.clientX / window.innerWidth - 0.5) * 2;   // -1 .. 1
    target.y = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  function render() {
    ticking = false;
    mouse.x += (target.x - mouse.x) * 0.08;
    mouse.y += (target.y - mouse.y) * 0.08;
    var vh = window.innerHeight;

    for (var i = 0; i < layers.length; i++) {
      var el = layers[i];
      var sec = el.closest(".px-section");
      var rect = sec.getBoundingClientRect();
      if (rect.bottom < -vh * 0.4 || rect.top > vh * 1.4) continue;

      var progress = (rect.top + rect.height / 2 - vh / 2) / vh; // 0 saat section center
      var speed = parseFloat(el.dataset.speed || 0);
      var mx = parseFloat(el.dataset.depthX || speed * 26);
      var scale = parseFloat(el.dataset.scale || 1);

      var ty = -progress * vh * speed;             // scroll parallax
      var tx = -mouse.x * mx;                      // mouse parallax
      var my = -mouse.y * mx * 0.45;

      el.style.transform =
        "translate3d(" + tx.toFixed(2) + "px," + (ty + my).toFixed(2) + "px,0) scale(" + scale + ")";
    }
  }

  function request() {
    if (!ticking) { ticking = true; requestAnimationFrame(render); }
  }

  window.addEventListener("scroll", request, { passive: true });
  window.addEventListener("resize", request);
  (function loop() { request(); requestAnimationFrame(loop); })();
})();
