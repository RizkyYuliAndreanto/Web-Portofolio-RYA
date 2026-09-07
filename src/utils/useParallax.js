/**
 * useParallax.js — Firewatch-style parallax engine (v2.3 — FIXED)
 *
 * BUG FIXES:
 *  1. REDUCED & HAS_MOUSE dievaluasi di dalam onMounted, bukan di level modul.
 *     Evaluasi di level modul bisa salah jika module di-import sebelum window siap,
 *     atau jika browser memiliki setting yang berbeda dari subagent.
 *  2. forceMotion=true memaksa parallax aktif meski OS matikan animasi.
 *     Ini sengaja untuk portofolio visual — parallax adalah fitur inti desain.
 */
import { onMounted, onUnmounted } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let _quickSetters = [];
let _mouseListenerAttached = false;

function _onPointerMove(e) {
  const nx = (e.clientX / window.innerWidth  - 0.5) * 2;
  const ny = (e.clientY / window.innerHeight - 0.5) * 2;
  for (const s of _quickSetters) {
    s.setX(-nx * s.depth);
    s.setY(-ny * s.depth * 0.4);
  }
}

export function useParallax(sectionRef, {
  pin        = false,
  pinEnd     = '+=120%',
  scrub      = 1.2,
  travelMul  = 50,
  zoomMul    = 0.15,
  mouseMul   = 40,
  forceMotion = true, // bypass prefers-reduced-motion — portofolio visual
} = {}) {
  let ctx = null;
  const _localSetters = [];

  onMounted(() => {
    const section = sectionRef.value;
    if (!section) return;

    // Evaluasi di dalam onMounted — bukan di level modul
    // Ini memastikan window sudah siap dan setting OS terbaca dengan benar
    const REDUCED  = forceMotion ? false
      : (typeof window !== 'undefined'
          ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
          : false);
    const HAS_MOUSE = typeof window !== 'undefined'
      ? window.matchMedia('(hover: hover) and (pointer: fine)').matches
      : false;

    // PENTING: dibuat SINKRON di onMounted — tanpa defer double-rAF.
    // Hero di-PIN dengan pinSpacing (+110vh tinggi dokumen via pin-spacer).
    // Kalau pin baru terpasang beberapa frame kemudian, semua ScrollTrigger
    // yang mengukur posisi sebelum itu dapat start ~110vh terlalu kecil →
    // entrance animation (once:true) menyala sebelum section masuk viewport,
    // jadi animasinya selesai duluan dan "tidak pernah terlihat".
    // Hero mount pertama → pin-nya wajib terpasang sebelum section lain ukur.

    // MOBILE: pin hero adalah sumber glitch terbesar di ponsel asli —
    // URL bar show/hide mengubah tinggi viewport → pin-spacer reposition →
    // background lompat ("kelap-kelip"), plus pinning+scrub menambah jank.
    // DevTools emulation tidak mereplikasi URL bar dinamis, jadi tampak normal.
    const IS_TOUCH = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    // Touch devices: matikan pin + scroll parallax layer, cukup static stage.
    // (Overlay/grain sudah disembunyikan via CSS <720px)
    const SKIP_SCROLL_PARALLAX = IS_TOUCH;
    ctx = gsap.context(() => {
        const layerEls = [...section.querySelectorAll('.px-layer')];
        const stage    = section.querySelector('.px-stage');

        if (!layerEls.length) return;

        // ─── 1. STAGE — selalu visible, tanpa opacity:0 di awal ────────────
        // BUG FIX: dihapus gsap.fromTo opacity:0→1 yang menyembunyikan layer
        // Cukup set opacity 1 langsung, tidak perlu fade-in.
        if (stage) {
          gsap.set(stage, { opacity: 1 });
        }

        // ─── 2. SCROLL PARALLAX (Firewatch core) ───────────────────────────
        // MOBILE: dilewati — scroll native + URL bar dinamis membuat layer
        // bergerak tak sinkron dengan konten → glitch. Static stage tetap tampil.
        if (!REDUCED && !SKIP_SCROLL_PARALLAX) {
          const stConfig = pin
            ? {
                trigger: section,
                start: 'top top',
                end: pinEnd,
                pin: true,
                pinSpacing: true,
                anticipatePin: 1,
                scrub,
                invalidateOnRefresh: true,
              }
            : {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub,
                invalidateOnRefresh: true,
              };

          const tl = gsap.timeline({ scrollTrigger: stConfig });

          layerEls.forEach(el => {
            const speed = parseFloat(el.dataset.speed || '0');
            const scale = parseFloat(el.dataset.scale || '1');

            if (!speed) return; // static: vignette, grain — skip

            // Layer bergerak dari bawah ke atas dengan kecepatan berbeda
            // Foreground (speed tinggi) bergerak lebih jauh = efek depth
            const fromY   =  speed * travelMul;       // mulai dari bawah
            const toY     = -speed * travelMul;        // sampai ke atas
            const toScale = scale + speed * zoomMul;   // zoom saat scroll

            tl.fromTo(el,
              { yPercent: fromY, scale: scale },
              { yPercent: toY,   scale: toScale, ease: 'none' },
              0
            );
          });
        }

        // ─── 3. MOUSE QUICKTO PARALLAX ─────────────────────────────────────
        if (HAS_MOUSE && !REDUCED) {
          layerEls.forEach(el => {
            const speed = parseFloat(el.dataset.speed || '0');
            if (!speed) return;

            const setter = {
              setX: gsap.quickTo(el, 'x', { duration: 1.0, ease: 'power2.out' }),
              setY: gsap.quickTo(el, 'y', { duration: 1.0, ease: 'power2.out' }),
              depth: speed * mouseMul,
            };
            _localSetters.push(setter);
            _quickSetters.push(setter);
          });

          if (!_mouseListenerAttached) {
            window.addEventListener('pointermove', _onPointerMove, { passive: true });
            _mouseListenerAttached = true;
          }
        }

        }, section);
  });

  onUnmounted(() => {
    for (const s of _localSetters) {
      const idx = _quickSetters.indexOf(s);
      if (idx !== -1) _quickSetters.splice(idx, 1);
    }
    if (_quickSetters.length === 0 && _mouseListenerAttached) {
      window.removeEventListener('pointermove', _onPointerMove);
      _mouseListenerAttached = false;
    }
    if (ctx) ctx.revert();
  });
}
