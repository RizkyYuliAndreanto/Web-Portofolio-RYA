/* Demo engine (vanilla, no CDN so it runs offline).
   The production GSAP version lives in ../../vue/ and PANDUAN-CONTAINER.md */
(function () {
	var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	/* staggered reveal */
	var items = [].slice.call(document.querySelectorAll(".reveal"));
	items.forEach(function (el, i) {
		el.style.setProperty("--i", (i % 14).toString());
	});

	if (reduced || !("IntersectionObserver" in window)) {
		items.forEach(function (el) { el.classList.add("is-in"); });
	} else {
		var io = new IntersectionObserver(function (entries) {
			entries.forEach(function (e) {
				if (e.isIntersecting) {
					e.target.classList.add("is-in");
					io.unobserve(e.target);
				}
			});
		}, { rootMargin: "0px 0px -12% 0px", threshold: 0.12 });
		items.forEach(function (el) { io.observe(el); });
	}

	/* pointer tilt on the container */
	var panel = document.querySelector(".foundry__panel");
	if (!panel || reduced) return;

	var tx = 0, ty = 0, cx = 0, cy = 0, raf = null;

	function loop() {
		cx += (tx - cx) * 0.08;
		cy += (ty - cy) * 0.08;
		panel.style.transform =
			"rotateX(" + (-cy * 3.2).toFixed(3) + "deg) rotateY(" +
			(cx * 4.2).toFixed(3) + "deg) translateZ(0)";
		if (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) {
			raf = requestAnimationFrame(loop);
		} else {
			raf = null;
		}
	}

	window.addEventListener("pointermove", function (e) {
		var r = panel.getBoundingClientRect();
		tx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
		ty = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
		tx = Math.max(-1, Math.min(1, tx));
		ty = Math.max(-1, Math.min(1, ty));
		if (!raf) raf = requestAnimationFrame(loop);
	}, { passive: true });

	window.addEventListener("pointerleave", function () {
		tx = 0; ty = 0;
		if (!raf) raf = requestAnimationFrame(loop);
	});

	/* click = lock a chip as active */
	document.addEventListener("click", function (e) {
		var chip = e.target.closest && e.target.closest(".chip");
		if (chip) chip.classList.toggle("is-active");
	});
})();
