# PANDUAN PERAKITAN & ANIMASI PARALLAX — RYA. Portfolio

Panduan lengkap merakit 30 layer + 12 overlay dari paket ini menjadi website parallax
yang **halus, terasa dalam, dan tetap cepat**. Ditulis berurutan: dari struktur DOM,
CSS dasar, engine vanilla JS, upgrade ke GSAP ScrollTrigger + Lenis, sampai QA & performa.

> Ringkasan singkat: **jangan animasikan apa pun selain `transform` dan `opacity`**,
> beri setiap layer kecepatan berbeda (`0.03 → 0.55`), dan selalu skala layer
> lebih besar dari viewport agar tidak muncul celah kosong saat digeser.

---

## Daftar Isi

1. [Konsep dasar parallax](#1-konsep-dasar-parallax)
2. [Peta layer & nilai kecepatan](#2-peta-layer--nilai-kecepatan)
3. [Struktur folder di project kamu](#3-struktur-folder-di-project-kamu)
4. [Struktur HTML yang benar](#4-struktur-html-yang-benar)
5. [CSS fondasi (wajib)](#5-css-fondasi-wajib)
6. [Level 1 — Parallax murni CSS (tanpa JS)](#6-level-1--parallax-murni-css-tanpa-js)
7. [Level 2 — Engine vanilla JS (sudah ada di paket)](#7-level-2--engine-vanilla-js-sudah-ada-di-paket)
8. [Level 3 — GSAP ScrollTrigger (rekomendasi produksi)](#8-level-3--gsap-scrolltrigger-rekomendasi-produksi)
9. [Smooth scroll dengan Lenis](#9-smooth-scroll-dengan-lenis)
10. [Animasi mikro: idle float, gear berputar, partikel](#10-animasi-mikro-idle-float-gear-berputar-partikel)
11. [Mouse parallax & tilt 3D](#11-mouse-parallax--tilt-3d)
12. [Animasi masuk konten (text reveal)](#12-animasi-masuk-konten-text-reveal)
13. [Transisi antar section](#13-transisi-antar-section)
14. [Integrasi React / Next.js](#14-integrasi-react--nextjs)
15. [Responsif & mobile](#15-responsif--mobile)
16. [Aksesibilitas](#16-aksesibilitas)
17. [Optimasi performa](#17-optimasi-performa)
18. [Checklist QA sebelum deploy](#18-checklist-qa-sebelum-deploy)
19. [Troubleshooting](#19-troubleshooting)
20. [Angka rekomendasi final (cheat sheet)](#20-angka-rekomendasi-final-cheat-sheet)

---

## 1. Konsep dasar parallax

Parallax = objek jauh bergerak **lebih lambat** daripada objek dekat, karena sudut
pandang mata berubah lebih kecil untuk objek jauh.

Tiga aturan yang tidak boleh dilanggar:

| Aturan | Alasan |
|---|---|
| Semua layer 1 section berada dalam **satu container `position: relative; overflow: hidden`** | supaya gerakan layer tidak bocor ke section lain |
| Setiap layer `position: absolute` dan **lebih besar dari container** (misal 116%) | saat layer digeser, tidak muncul area kosong di tepi |
| Hanya `transform: translate3d()` / `scale()` / `opacity` yang dianimasikan | properti lain memicu *layout & paint* → patah-patah |

Rumus intinya:

```
translateY = -(progress_scroll) × tinggi_viewport × speed_layer
```

`progress_scroll` = 0 ketika section berada persis di tengah viewport, negatif saat
section masih di bawah, positif saat sudah lewat ke atas.

---

## 2. Peta layer & nilai kecepatan

Setiap section punya 5 layer. Ini nilai yang sudah dikalibrasi untuk asset di paket ini
(sudah ikut tertulis di `manifest.json`):

| File | Peran | `speed` | `scale` | z-index | Catatan |
|---|---|---|---|---|---|
| `*-l1-backdrop.jpg/.png` | langit / latar terjauh (opaque) | **0.03** | 1.02 | 1 | pakai `.jpg` untuk performa |
| `*-l2-far.png` | siluet jauh (skyline, rak server) | **0.10** | 1.03 | 2 | sudah dibuat pudar & lebih navy |
| `*-l3-mid.png` | objek tengah (platform, mesin) | **0.20** | 1.05 | 3 | fokus visual utama |
| `*-l4-near.png` | objek besar dekat kamera | **0.34** | 1.08 | 4 | mengapit konten di kiri/kanan |
| `*-l5-foreground.png` | serpihan/kabel/partikel (blur DOF) | **0.55** | 1.12 | 5 | membuat efek “masuk ke dalam scene” |

Overlay tambahan (`assets/shared/`) — tempelkan di antara layer sesuai selera:

| Overlay | z-index ideal | blend | speed | Fungsi |
|---|---|---|---|---|
| `overlay-light-rays.png` | 1–2 | `screen` | 0.05 | sinar lembut dari atas |
| `overlay-glow-blue.png` | 1–2 | `screen` | 0.04 | pusat cahaya cobalt |
| `overlay-hex-mesh.png` | 2 | `screen` | 0.07 | pola teknologi halus |
| `overlay-grid-perspective.png` | 2–3 | `screen` | 0.16 | lantai perspektif |
| `overlay-dust-far.png` | 2–3 | `screen` | 0.12 | debu jauh |
| `overlay-bokeh-soft.png` | 4 | `screen` | 0.26 | bulatan blur |
| `overlay-hex-confetti.png` | 5 | `screen` | 0.46 | serpihan hex melayang |
| `overlay-dust-fine.png` | 6 | `screen` | 0.50 | debu dekat kamera |
| `overlay-vignette-navy.png` | 8 | `normal` | 0 | gelapkan tepi, fokus ke tengah |
| `overlay-grain.png` | 9 | `overlay`/`soft-light` | 0 | tekstur film halus |
| `overlay-fade-top/bottom.png` | 7 | `normal` | 0 | menyambung antar section |

**Jangan gunakan lebih dari ~10 layer bergerak per section.** Lebih dari itu, gain
visualnya kecil tapi biaya compositing naik.

---

## 3. Struktur folder di project kamu

```
public/
└── parallax/
    ├── 01-hero/ ... 06-contact/
    ├── shared/
    └── mobile/            ← isi dari assets-mobile/
src/
├── styles/parallax.css
└── scripts/parallax.js    (atau gsap-parallax.js)
```

Kalau pakai HTML statis, cukup salin folder `assets/`, `assets-mobile/`, dan `demo/`
apa adanya, lalu sesuaikan path.

---

## 4. Struktur HTML yang benar

Pola baku untuk **setiap** section:

```html
<section class="px-section" id="hero" data-parallax>
  <!-- 1. panggung layer (di belakang) -->
  <div class="px-stage" aria-hidden="true">
    <div class="px-layer" data-speed="0.03" data-scale="1.02"
         style="background-image:url('/parallax/01-hero/hero-l1-backdrop.jpg')"></div>

    <div class="px-layer is-overlay" data-speed="0.05"
         style="background-image:url('/parallax/shared/overlay-light-rays.png')"></div>

    <div class="px-layer" data-speed="0.10" data-scale="1.03"
         style="background-image:url('/parallax/01-hero/hero-l2-far.png')"></div>

    <div class="px-layer" data-speed="0.20" data-scale="1.05"
         style="background-image:url('/parallax/01-hero/hero-l3-mid.png')"></div>

    <div class="px-layer" data-speed="0.34" data-scale="1.08"
         style="background-image:url('/parallax/01-hero/hero-l4-near.png')"></div>

    <div class="px-layer is-overlay" data-speed="0.46"
         style="background-image:url('/parallax/shared/overlay-hex-confetti.png')"></div>

    <div class="px-layer" data-speed="0.55" data-scale="1.12"
         style="background-image:url('/parallax/01-hero/hero-l5-foreground.png')"></div>

    <div class="px-layer is-grade" data-speed="0"
         style="background-image:url('/parallax/shared/overlay-vignette-navy.png')"></div>
  </div>

  <!-- 2. konten asli (di depan, tetap bisa diklik & dibaca screen reader) -->
  <div class="px-content">
    <span class="eyebrow">The best for all your software needs</span>
    <h1>AI<br>Engineer</h1>
    <a class="btn" href="#contact">Hubungi Saya</a>
  </div>
</section>
```

Aturan penting:

- Urutan DOM = urutan tumpukan. Layer paling atas di HTML = paling belakang.
- `.px-stage` diberi `aria-hidden="true"` karena murni dekorasi.
- Konten **jangan** dimasukkan ke dalam `.px-stage`, agar tidak ikut bergerak/blur.
- `pointer-events: none` pada layer supaya tidak menghalangi klik tombol.

---

## 5. CSS fondasi (wajib)

```css
:root{
  --navy-900:#101827; --navy-800:#16213E; --slate-700:#1E2A44;
  --blue-500:#2F6BFF; --blue-300:#5E9FE8; --off-white:#E9EEF6;
}

.px-section{
  position:relative;
  min-height:100svh;          /* svh = aman dari address bar mobile */
  overflow:hidden;            /* kunci: layer tidak bocor */
  isolation:isolate;          /* blend-mode tidak merembet antar section */
  background:var(--navy-900); /* fallback saat gambar belum load */
}

.px-stage{ position:absolute; inset:0; z-index:0; }

.px-layer{
  position:absolute;
  top:-8%; left:-8%; width:116%; height:116%;   /* ruang gerak */
  background-position:center;
  background-size:cover;
  background-repeat:no-repeat;
  pointer-events:none;
  transform:translate3d(0,0,0);   /* paksa GPU layer */
  will-change:transform;
  backface-visibility:hidden;
}

.px-layer.is-overlay{ mix-blend-mode:screen; opacity:.7; }
.px-layer.is-grade{ mix-blend-mode:normal; }
.px-layer.is-grain{ mix-blend-mode:soft-light; opacity:.5; }

.px-content{
  position:relative; z-index:10;
  min-height:100svh;
  display:flex; flex-direction:column; justify-content:center;
  padding:0 clamp(24px,7vw,140px);
  text-shadow:0 6px 26px rgba(8,12,22,.75);   /* jaga keterbacaan di atas ilustrasi */
}
```

### Kenapa `116%` dan bukan `100%`?

Layer dengan `speed = 0.55` bisa bergeser sampai ± `0.55 × 100vh / 2` ≈ 27vh.
Agar tidak pernah muncul celah, ukuran layer minimal:

```
ukuran_layer ≥ 100% + (speed_maks × 100%)
```

Dengan `speed` maks 0.55 → `116%` sudah aman untuk desktop; di mobile naikkan ke `124%`.

### Trik keterbacaan teks

Asset ini sengaja dibuat kosong di tengah, tapi kalau teks masih kurang kontras,
tambahkan scrim (bukan menggelapkan seluruh gambar):

```css
.px-content::before{
  content:""; position:absolute; inset:0; z-index:-1;
  background:linear-gradient(100deg,
    rgba(16,24,39,.86) 0%, rgba(16,24,39,.55) 42%, rgba(16,24,39,0) 72%);
}
```

---

## 6. Level 1 — Parallax murni CSS (tanpa JS)

Cocok kalau ingin nol JavaScript. Gunakan `perspective` + `translateZ`:

```css
.px-scroller{
  height:100svh; overflow-y:auto; overflow-x:hidden;
  perspective:10px;               /* makin kecil, makin dramatis */
  perspective-origin:center center;
}
.px-section{ transform-style:preserve-3d; }

/* translateZ negatif = lebih jauh = bergerak lebih lambat.
   scale dipakai untuk mengoreksi ukuran akibat perspektif. */
.l1{ transform:translateZ(-9px) scale(1.9);  }
.l2{ transform:translateZ(-6px) scale(1.6);  }
.l3{ transform:translateZ(-3px) scale(1.3);  }
.l4{ transform:translateZ(-1px) scale(1.1);  }
.l5{ transform:translateZ( 1px) scale(0.9);  }
```

Rumus koreksi skala: `scale = 1 + (|translateZ| / perspective)`.

**Plus:** sangat halus (dijalankan compositor), tidak ada jank sama sekali.
**Minus:** sulit dikombinasikan dengan `position: fixed`, `overflow` custom, dan
smooth-scroll library. Untuk website portofolio dengan banyak animasi lain,
lebih baik pakai Level 3.

### Bonus CSS modern: `animation-timeline: view()`

Didukung Chrome/Edge terbaru — parallax tanpa JS, tanpa perspective hack:

```css
@supports (animation-timeline: view()){
  .px-layer{
    animation:px-move linear both;
    animation-timeline:view();
    animation-range:cover 0% cover 100%;
  }
  @keyframes px-move{
    from{ transform:translate3d(0, calc(var(--speed) * 50vh), 0) scale(var(--scale,1)); }
    to  { transform:translate3d(0, calc(var(--speed) * -50vh), 0) scale(var(--scale,1)); }
  }
}
```

```html
<div class="px-layer" style="--speed:.34; --scale:1.08; background-image:url(...)"></div>
```

Tetap sediakan fallback JS untuk Safari/Firefox lama.

---

## 7. Level 2 — Engine vanilla JS (sudah ada di paket)

File `demo/js/parallax.js` sudah siap pakai. Inti logikanya:

```js
function render(){
  const vh = innerHeight;
  for (const el of layers){
    const sec  = el.closest(".px-section");
    const rect = sec.getBoundingClientRect();
    if (rect.bottom < -vh*0.4 || rect.top > vh*1.4) continue;   // culling

    const progress = (rect.top + rect.height/2 - vh/2) / vh;    // 0 di tengah
    const speed = +el.dataset.speed || 0;
    const scale = +el.dataset.scale || 1;

    const ty = -progress * vh * speed;
    el.style.transform = `translate3d(0,${ty.toFixed(2)}px,0) scale(${scale})`;
  }
}
addEventListener("scroll", () => requestAnimationFrame(render), { passive:true });
```

Prinsip yang wajib dipertahankan kalau kamu memodifikasinya:

1. **Baca DOM sekali, tulis sekali** — jangan `getBoundingClientRect()` di dalam loop tulis.
2. **`requestAnimationFrame` + flag `ticking`** — jangan hitung di setiap event scroll.
3. **Culling** — lewati section yang jauh dari viewport.
4. **`{ passive: true }`** pada listener scroll agar scroll tidak diblokir.

---

## 8. Level 3 — GSAP ScrollTrigger (rekomendasi produksi)

### Instalasi

```bash
npm i gsap
```

```html
<!-- atau via CDN -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js"></script>
```

### Setup dasar per section

```js
gsap.registerPlugin(ScrollTrigger);

const prefersReduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReduced) {
  gsap.utils.toArray(".px-section").forEach((section) => {
    const layers = gsap.utils.toArray(".px-layer", section);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top bottom",     // mulai saat atas section menyentuh bawah viewport
        end: "bottom top",       // selesai saat bawah section keluar atas viewport
        scrub: 1,                // 1 = smoothing 1 detik (lebih "mahal" & halus)
        invalidateOnRefresh: true,
      },
    });

    layers.forEach((layer) => {
      const speed = parseFloat(layer.dataset.speed) || 0;
      const scale = parseFloat(layer.dataset.scale) || 1;
      if (!speed) return;

      tl.fromTo(
        layer,
        { yPercent: speed * 26, scale },      // masuk dari bawah
        { yPercent: -speed * 26, scale, ease: "none" },
        0                                     // semua layer mulai di posisi 0 timeline
      );
    });
  });
}
```

Penjelasan angka:

- `yPercent` dipakai (bukan `y` px) supaya otomatis responsif terhadap tinggi layer.
- `speed × 26` → layer terdepan (0.55) bergerak ±14% dari tinggi layer. Naikkan ke
  `× 34` kalau ingin lebih dramatis, turunkan ke `× 18` kalau terasa berlebihan.
- `ease: "none"` **wajib** untuk animasi ber-`scrub`; easing lain membuat gerakan
  tidak sinkron dengan scroll.
- `scrub: true` = mengikuti scroll 1:1 (paling responsif).
  `scrub: 1` = ada inersia lembut (paling premium). Pilih salah satu, konsisten.

### Zoom-in kamera pada hero (efek “megah”)

```js
const hero = document.querySelector("#hero");
gsap.timeline({
  scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 1 },
})
  .to("#hero .px-layer[data-speed='0.55']", { scale: 1.35, yPercent: -18, ease: "none" }, 0)
  .to("#hero .px-layer[data-speed='0.34']", { scale: 1.18, yPercent: -10, ease: "none" }, 0)
  .to("#hero .px-layer[data-speed='0.20']", { scale: 1.10, yPercent: -5,  ease: "none" }, 0)
  .to("#hero .px-content", { yPercent: -12, opacity: 0, ease: "none" }, 0);
```

### Pinning (section menempel sementara animasi berjalan)

Gunakan **maksimal 1–2 section** saja (hero atau projects). Terlalu banyak pin
membuat navigasi membingungkan.

```js
ScrollTrigger.create({
  trigger: "#projects",
  start: "top top",
  end: "+=180%",       // durasi pin = 1.8 layar
  pin: true,
  pinSpacing: true,
  scrub: true,
  anticipatePin: 1,     // cegah "lompatan" 1 frame saat pin aktif
});
```

### Responsif dengan `matchMedia`

```js
ScrollTrigger.matchMedia({
  "(min-width: 1024px)": () => buildParallax(1.0),   // intensitas penuh
  "(min-width: 640px) and (max-width: 1023px)": () => buildParallax(0.6),
  "(max-width: 639px)": () => buildParallax(0.35),   // mobile: halus saja
});
```

### Refresh setelah gambar selesai load

Wajib, karena tinggi section bisa berubah:

```js
window.addEventListener("load", () => ScrollTrigger.refresh());
```

---

## 9. Smooth scroll dengan Lenis

Parallax terasa jauh lebih mahal kalau scroll-nya *eased*.

```bash
npm i lenis
```

```js
import Lenis from "lenis";

const lenis = new Lenis({
  duration: 1.1,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  smoothTouch: false,          // JANGAN aktifkan di mobile (terasa "berat"/lag)
});

// sinkronkan dengan GSAP
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

Kalau pakai Lenis, **hapus** `scroll-behavior: smooth` dari CSS dan gunakan
`lenis.scrollTo("#tech")` untuk anchor nav.

---

## 10. Animasi mikro: idle float, gear berputar, partikel

Parallax saja masih terasa “mati” saat user berhenti scroll. Tambahkan gerakan idle
yang **loop dan lambat** — ini yang membuat scene terasa hidup.

### a. Float lembut (CSS, paling murah)

```css
@keyframes floatY{
  0%,100%{ translate:0 0; }
  50%    { translate:0 -14px; }
}
.px-layer[data-idle="float"]{ animation:floatY 9s ease-in-out infinite; }
.px-layer[data-idle="float-slow"]{ animation:floatY 14s ease-in-out infinite; }
```

> Catatan: gunakan properti `translate:` (bukan `transform:`) untuk animasi idle,
> agar **tidak menimpa** `transform` yang dipakai parallax JS/GSAP. Ini trik penting
> supaya dua animasi bisa hidup bersamaan pada elemen yang sama.

### b. Idle float via GSAP (lebih terkontrol, bisa random)

```js
gsap.utils.toArray(".px-layer[data-idle]").forEach((el, i) => {
  gsap.to(el, {
    translateY: gsap.utils.random(-18, -8),
    duration: gsap.utils.random(6, 11),
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
    delay: i * 0.35,          // stagger supaya tidak seragam
  });
});
```

### c. Partikel bergerak terus (overlay dust/hex)

Overlay partikel di paket ini *tileable secara visual*, jadi bisa digeser perlahan:

```js
gsap.to(".px-layer.is-overlay[data-drift]", {
  backgroundPositionY: "-1080px",
  duration: 60,
  ease: "none",
  repeat: -1,
});
```

### d. Rotasi gear (khusus section Services & Experience)

Karena gear ada di dalam layer, gunakan **layer duplikat** hanya untuk elemen yang
diputar, atau tambahkan SVG gear terpisah di atas layer:

```css
@keyframes spin{ to{ rotate:360deg; } }
.gear-a{ animation:spin 46s linear infinite; }
.gear-b{ animation:spin 32s linear infinite reverse; }
```

### e. Shimmer cahaya

```js
gsap.to(".px-layer[data-glow]", {
  opacity: 0.45, duration: 4.5, ease: "sine.inOut", yoyo: true, repeat: -1,
});
```

**Aturan takaran:** maksimal 3–4 animasi idle per section, durasi ≥ 6 detik,
amplitudo ≤ 20px. Lebih dari itu jadi ramai dan mengganggu pembacaan teks.

---

## 11. Mouse parallax & tilt 3D

Efek ini yang membuat scene terasa **3D sungguhan**, bukan gambar datar.

```js
const stageEls = gsap.utils.toArray(".px-layer");
const setters = stageEls.map((el) => ({
  el,
  x: gsap.quickTo(el, "x", { duration: 0.8, ease: "power3.out" }),
  y: gsap.quickTo(el, "y", { duration: 0.8, ease: "power3.out" }),
  depth: (parseFloat(el.dataset.speed) || 0) * 46,   // makin dekat, makin besar geser
}));

addEventListener("pointermove", (e) => {
  const nx = (e.clientX / innerWidth - 0.5) * 2;    // -1..1
  const ny = (e.clientY / innerHeight - 0.5) * 2;
  setters.forEach((s) => { s.x(-nx * s.depth); s.y(-ny * s.depth * 0.45); });
}, { passive: true });
```

`gsap.quickTo` jauh lebih efisien daripada memanggil `gsap.to()` di setiap `pointermove`.

### Tilt seluruh panggung (opsional, sangat dramatis)

```css
.px-section{ perspective:1200px; }
.px-stage{ transform-style:preserve-3d; will-change:transform; }
```

```js
addEventListener("pointermove", (e) => {
  const nx = e.clientX / innerWidth - 0.5;
  const ny = e.clientY / innerHeight - 0.5;
  gsap.to(".px-stage", {
    rotateY: nx * 4, rotateX: -ny * 3,     // jangan lebih dari 5deg
    duration: 0.9, ease: "power3.out", overwrite: "auto",
  });
}, { passive: true });
```

Di perangkat sentuh, **matikan** mouse parallax:

```js
if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
```

---

## 12. Animasi masuk konten (text reveal)

```js
gsap.utils.toArray(".px-content").forEach((content) => {
  const tl = gsap.timeline({
    scrollTrigger: { trigger: content, start: "top 78%", once: true },
  });

  tl.from(content.querySelector(".eyebrow"), {
      y: 18, opacity: 0, duration: .6, ease: "power2.out",
    })
    .from(content.querySelectorAll("h1, h2"), {
      y: 46, opacity: 0, duration: .9, ease: "power3.out",
    }, "-=.35")
    .from(content.querySelectorAll("p.lead"), {
      y: 22, opacity: 0, duration: .7, ease: "power2.out",
    }, "-=.5")
    .from(content.querySelectorAll(".chip, .btn"), {
      y: 16, opacity: 0, duration: .5, stagger: .07, ease: "power2.out",
    }, "-=.4");
});
```

Untuk reveal per-huruf/per-baris, gunakan `SplitText` (GSAP premium) atau alternatif
gratis `splitting.js`. Jangan lupa `will-change: transform, opacity` pada elemen teks
yang dianimasikan, lalu hapus setelah animasi selesai (`onComplete: () => el.style.willChange = "auto"`).

---

## 13. Transisi antar section

Agar 6 section terasa satu perjalanan, bukan 6 gambar terpisah:

**a. Fade navy di sambungan** — pakai overlay `fade-bottom` / `fade-top`:

```html
<div class="px-layer is-grade" data-speed="0"
     style="background-image:url('/parallax/shared/overlay-fade-bottom.png')"></div>
```

**b. Cross-fade backdrop saat pergantian section:**

```js
gsap.utils.toArray(".px-section").forEach((sec) => {
  gsap.fromTo(sec.querySelector(".px-stage"),
    { opacity: .35 },
    { opacity: 1, ease: "none",
      scrollTrigger: { trigger: sec, start: "top 85%", end: "top 35%", scrub: true } });
});
```

**c. Progress bar scroll:**

```js
gsap.to(".scroll-progress", {
  scaleX: 1, transformOrigin: "left center", ease: "none",
  scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: true },
});
```

---

## 14. Integrasi React / Next.js

```jsx
// components/ParallaxSection.jsx
"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import manifest from "@/data/manifest.json";

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxSection({ id, children }) {
  const root = useRef(null);
  const section = manifest.sections.find((s) => s.id === id);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const layers = gsap.utils.toArray(".px-layer", root.current);
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 1 },
      });
      layers.forEach((l) => {
        const sp = parseFloat(l.dataset.speed) || 0;
        if (!sp) return;
        tl.fromTo(l, { yPercent: sp * 26 }, { yPercent: -sp * 26, ease: "none" }, 0);
      });
    }, root);

    return () => ctx.revert();   // WAJIB: bersihkan saat unmount / hot reload
  }, []);

  return (
    <section ref={root} id={id} className="px-section">
      <div className="px-stage" aria-hidden="true">
        {section.layers.map((l) => (
          <div key={l.file} className="px-layer"
               data-speed={l.parallaxSpeed} data-scale={l.scale}
               style={{ backgroundImage: `url(/parallax/${l.file.replace("assets/", "")})`,
                        transform: `scale(${l.scale})` }} />
        ))}
      </div>
      <div className="px-content">{children}</div>
    </section>
  );
}
```

Catatan Next.js:

- `gsap.context()` + `ctx.revert()` mencegah animasi ganda saat React Strict Mode / HMR.
- Untuk layer `l1` boleh pakai `next/image` dengan `priority` + `fill`; layer 2–5
  lebih praktis sebagai `background-image` (tidak perlu layout image).
- Jangan render parallax di server-only component; butuh `"use client"`.

---

## 15. Responsif & mobile

```css
@media (max-width:1024px){
  .px-layer{ top:-10%; left:-10%; width:120%; height:120%; }
}
@media (max-width:720px){
  .px-layer{ top:-12%; left:-12%; width:124%; height:124%; }
  /* pakai versi mobile yang lebih kecil */
  .px-layer[data-mobile]{ background-image:var(--bg-mobile) !important; }
  /* kurangi jumlah layer di HP */
  .px-layer.is-overlay:not(.keep-mobile){ display:none; }
}
```

Swap resolusi lewat CSS custom property:

```html
<div class="px-layer" data-mobile
     style="--bg-mobile:url('/parallax/mobile/01-hero/hero-l3-mid.png');
            background-image:url('/parallax/01-hero/hero-l3-mid.png')"></div>
```

Pedoman mobile:

| Aspek | Desktop | Mobile |
|---|---|---|
| Layer aktif per section | 8–10 | 4–5 |
| Intensitas parallax | 100% | 30–40% |
| Smooth scroll (Lenis) | aktif | `smoothTouch: false` |
| Mouse parallax / tilt | aktif | nonaktif |
| Resolusi asset | 1920px | 960px |

---

## 16. Aksesibilitas

```css
@media (prefers-reduced-motion: reduce){
  .px-layer{ animation:none !important; transform:none !important; }
  html{ scroll-behavior:auto; }
}
```

```js
if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
  gsap.globalTimeline.clear();
  ScrollTrigger.getAll().forEach((t) => t.kill());
}
```

Checklist:

- `.px-stage` selalu `aria-hidden="true"`.
- Kontras teks minimal **4.5:1** terhadap area gambar di belakangnya (cek dengan scrim).
- Semua konten tetap terbaca & bisa dinavigasi keyboard tanpa animasi.
- Jangan taruh informasi penting **hanya** di dalam ilustrasi.

---

## 17. Optimasi performa

### a. Konversi format (paling besar dampaknya)

```bash
# WebP (kualitas bagus, ukuran ~30% PNG)
for f in $(find assets -name "*.png"); do cwebp -q 82 -alpha_q 90 "$f" -o "${f%.png}.webp"; done

# AVIF (paling kecil, encode lebih lambat)
for f in $(find assets -name "*.png"); do avifenc --min 24 --max 34 "$f" "${f%.png}.avif"; done
```

```css
.px-layer{ background-image:url("layer.png"); }
@supports (background-image: url("x.webp")){
  .px-layer{ background-image:url("layer.webp"); }
}
```

### b. Loading strategy

```html
<!-- hanya section pertama yang di-preload -->
<link rel="preload" as="image" href="/parallax/01-hero/hero-l1-backdrop.jpg">
<link rel="preload" as="image" href="/parallax/01-hero/hero-l4-near.png">
```

Lazy-load sisanya via IntersectionObserver:

```js
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.querySelectorAll("[data-bg]").forEach((l) => {
      l.style.backgroundImage = `url(${l.dataset.bg})`;
      l.removeAttribute("data-bg");
    });
    io.unobserve(e.target);
  });
}, { rootMargin: "200% 0px" });      // muat 2 layar sebelum terlihat

document.querySelectorAll(".px-section").forEach((s) => io.observe(s));
```

### c. Hygiene compositing

| Lakukan | Hindari |
|---|---|
| `transform`, `opacity` | `top`, `left`, `margin`, `width` |
| `will-change: transform` pada layer bergerak | `will-change` di puluhan elemen sekaligus |
| `translate3d()` / `translateZ(0)` | animasi `background-position` per frame (kecuali drift lambat) |
| `filter: blur()` **dibake ke asset** (sudah dilakukan di paket ini) | `filter: blur()` live saat scroll — sangat berat |
| `backdrop-filter` maksimal 1–2 elemen kecil | `backdrop-filter` pada elemen full-screen |

### d. Target metrik

- 60 fps saat scroll (cek Chrome DevTools → Performance → Frames).
- Layer Count di DevTools → Rendering → *Layer borders*: pastikan tiap `.px-layer`
  jadi composited layer sendiri, tapi total < ~60 layer di seluruh halaman.
- LCP < 2.5s — dibantu `.jpg` backdrop + preload.

---

## 18. Checklist QA sebelum deploy

- [ ] Tidak ada celah kosong di tepi saat scroll cepat naik-turun (perbesar `width/height` layer bila ada).
- [ ] Teks tetap terbaca di semua section (kontras ≥ 4.5:1).
- [ ] Tidak ada layer yang menutupi tombol/link (`pointer-events: none` terpasang).
- [ ] Scroll 60 fps di laptop mid-range dan HP mid-range.
- [ ] `prefers-reduced-motion` benar-benar mematikan gerakan.
- [ ] Cek di Safari (blend-mode & `will-change` paling sensitif di sini).
- [ ] Resize window → tidak ada layer yang “melompat” (`ScrollTrigger.refresh()` terpasang).
- [ ] Total berat halaman per section < ~1.5 MB setelah konversi WebP/AVIF.
- [ ] Tidak ada `console error` untuk asset 404.
- [ ] Navigasi anchor (`#tech`, `#contact`) mendarat tepat di section.

---

## 19. Troubleshooting

| Gejala | Penyebab umum | Solusi |
|---|---|---|
| Muncul garis/celah kosong di tepi | layer terlalu kecil | naikkan ke `124%` + offset `-12%` |
| Scroll patah-patah (jank) | animasi properti non-composited, atau `filter` live | hanya animasikan `transform`/`opacity` |
| Layer “lompat” saat pin aktif | tinggi berubah setelah gambar load | `anticipatePin: 1` + `ScrollTrigger.refresh()` on load |
| Blend-mode overlay membuat section lain aneh | tidak ada `isolation` | tambahkan `isolation: isolate` di `.px-section` |
| Animasi idle hilang saat parallax jalan | `transform` saling menimpa | pakai properti `translate:` untuk idle, atau bungkus layer dalam wrapper |
| Mobile terasa berat | terlalu banyak layer + smoothTouch | matikan overlay di mobile, `smoothTouch: false` |
| Animasi dobel setelah hot reload (React) | context tidak dibersihkan | `gsap.context()` + `ctx.revert()` |
| Teks blur/tipis di Chrome | elemen teks ikut dalam layer ber-`scale`/3D | keluarkan konten dari `.px-stage` |
| Overlay partikel terlihat kotak/berulang | overlay diberi `background-repeat` salah arah | drift hanya di `backgroundPositionY`, biarkan `no-repeat` untuk vignette |

---

## 20. Angka rekomendasi final (cheat sheet)

```txt
SPEED        L1 0.03 | L2 0.10 | L3 0.20 | L4 0.34 | L5 0.55
SCALE        L1 1.02 | L2 1.03 | L3 1.05 | L4 1.08 | L5 1.12
LAYER SIZE   116% desktop / 120% tablet / 124% mobile (offset = -(size-100)/2)
GSAP         yPercent = ± speed × 26   | ease: "none" | scrub: 1
MOUSE        geser = speed × 46 px (X), × 0.45 (Y) | quickTo duration 0.8
TILT         rotateY ±4deg, rotateX ±3deg, perspective 1200px
IDLE FLOAT   amplitudo 8–20px | durasi 6–14s | ease sine.inOut | yoyo
PIN          maksimal 2 section | end "+=180%" | anticipatePin 1
LENIS        duration 1.1 | smoothWheel true | smoothTouch false
MOBILE       intensitas 30–40% | 4–5 layer | asset 960px
OVERLAY      partikel/cahaya = blend screen, opacity .5–.75
             vignette = blend normal | grain = soft-light, opacity .4–.5
```

---

## Urutan kerja yang disarankan

1. Salin `assets/` → `public/parallax/`, pasang `parallax.css`.
2. Rakit **satu section (hero) saja** dengan 5 layer, tanpa JS. Pastikan komposisi & keterbacaan teks sudah bagus.
3. Aktifkan parallax (vanilla dulu, atau langsung GSAP). Kalibrasi `speed` sampai terasa pas.
4. Tambahkan overlay partikel/vignette → cek tidak mengganggu teks.
5. Tambahkan idle float + mouse parallax.
6. Duplikasi pola ke 5 section lain (ganti path asset saja).
7. Pasang Lenis, text reveal, transisi antar section.
8. Optimasi (WebP, preload, lazy-load) → jalankan checklist QA → deploy.

Selamat merakit — kalau ada section baru yang butuh asset tambahan, tinggal ikuti
pola penamaan `l1-backdrop → l5-foreground` agar tetap kompatibel dengan `manifest.json`.


---

# BAB 21 — CATATAN KHUSUS PAKET v2 ("SKY FOUNDRY")

Bab-bab 1–20 di atas tetap berlaku (semua teknik CSS, GSAP, ScrollTrigger, Lenis,
performa, aksesibilitas). Bab ini hanya menjelaskan **apa yang berubah di v2** dan
cara memasangnya ke project Vue 3 milikmu.

## 21.1 Tiga koreksi yang diterapkan

1. **Lebih gelap sedikit.** Palet diturunkan satu langkah dan pipeline menambahkan
   penggelapan global 10% (`GLOBAL_DARKEN = 0.90`) plus penyamaan tone ke satu titik
   navy (`#131C30`, bobot 7%). Efeknya: semua layer di 8 section punya "suhu warna"
   identik, tapi tetap jauh dari kesan horor.
2. **Tidak ramai bintik.** Overlay partikel (`dust-fine`, `dust-far`, `hex-confetti`)
   dihapus. Sisa 9 overlay semuanya bertekstur besar. Aturan pakai: **maksimal 2
   overlay per section**.
3. **Properti lebih kecil dan tidak bentrok teks.** Setiap layer digambar dengan
   "safe zone": area tengah 55% frame dan (untuk layer cutout) seluruh separuh atas
   frame dibiarkan kosong. Layer `far` juga diperkecil 82% secara vertikal dengan
   titik jangkar di garis horizon, jadi skyline duduk lebih rendah.

> Kalau properti masih terasa besar di layar lebar, cukup naikkan `--px-inset`:
> ubah `.px-layer` menjadi `top:-14%; left:-14%; width:128%; height:128%`. Layer akan
> ter-crop ke luar sehingga properti tepi bergerak lebih jauh dari teks.

## 21.2 Kunci kesinambungan antar section

* **Garis horizon dipatok 56%** di semua 8 backdrop. Jangan pernah menggeser
  `background-position` layer L1 secara vertikal, karena itulah yang menjaga
  sambungan dunia.
* **Seam stitching.** Tepi atas dan bawah setiap backdrop (band 14%) sudah dijahit ke
  warna batas bersama. Artinya bagian bawah `04-projects` = bagian atas
  `05-tech-stack`. Supaya jahitan ini terlihat mulus:
  * jangan pasang `margin` antar `<section>`;
  * jangan pasang `border-radius` pada `.px-section`;
  * kalau ingin transisi ekstra halus, tumpuk `overlay-fade-top.png` di section
    berikutnya dengan `opacity: .35`.
* **Section interior** (`05-tech-stack`, `06-experience`) punya jendela / celah kaca
  tepat di 56% yang menampilkan langit kota yang sama, jadi mata pembaca tidak
  merasa "pindah dunia" saat masuk ruangan.

## 21.3 Pemetaan folder → komponen Vue

| Folder aset | Komponen | Jumlah layer |
|---|---|---|
| `assets/01-hero/` | `HeroSection.vue` | 5 |
| `assets/02-profile/` | `ProfileSection.vue` | 5 |
| `assets/03-services/` | `ServicesSection.vue` | 5 |
| `assets/04-projects/` | `ProjectsSection.vue` | 5 |
| `assets/05-tech-stack/` | `TechStackSection.vue` | 5 |
| `assets/06-experience/` | `ExperienceTimeline.vue` | 5 |
| `assets/07-contact/` | `ContactSection.vue` | 5 |
| `assets/08-footer/` | `FooterSection.vue` | 3 |

Komponen lain:

* **`Navbar.vue`** — `position: fixed; z-index: 40`. Beri background
  `linear-gradient(to bottom, rgba(14,21,34,.86), transparent)` supaya tetap terbaca
  di atas layer terang.
* **`CursorGlow.vue`** — sekarang layer sudah punya glow bawaan, jadi turunkan
  intensitasnya (`opacity: .35`, blur 120px) agar tidak menumpuk dengan
  `overlay-glow-blue.png`. Pakai `mix-blend-mode: screen` dan `pointer-events: none`.
* **`ProjectHighlight.vue` / `ProjectModal.vue`** — saat modal terbuka, hentikan
  parallax: set flag global dan lewati update transform, atau tambahkan class
  `is-frozen` pada `body` yang mematikan `will-change`. Ini mencegah jank saat modal
  memakai backdrop-filter.

## 21.4 Komponen parallax reusable (Vue 3 `<script setup>`)

```vue
<!-- components/ParallaxStage.vue -->
<template>
  <div class="px-stage">
    <div
      v-for="l in layers"
      :key="l.file"
      class="px-layer"
      :class="l.blend"
      :data-speed="l.speed"
      :data-scale="l.scale"
      :style="{ backgroundImage: `url(/parallax/${l.file})` }"
    />
  </div>
</template>

<script setup>
defineProps({ layers: { type: Array, required: true } })
</script>
```

```vue
<!-- components/TechStackSection.vue -->
<template>
  <section class="px-section" id="tech">
    <ParallaxStage :layers="layers" />
    <div class="px-content"><!-- isi tech stack --></div>
  </section>
</template>

<script setup>
import ParallaxStage from './ParallaxStage.vue'
const layers = [
  { file: 'assets/05-tech-stack/tech-l1-backdrop.jpg',   speed: 0.03, scale: 1.02 },
  { file: 'assets/05-tech-stack/tech-l2-far.png',        speed: 0.10, scale: 1.03 },
  { file: 'assets/05-tech-stack/tech-l3-mid.png',        speed: 0.20, scale: 1.05 },
  { file: 'assets/shared/overlay-hex-mesh.png',          speed: 0.07, scale: 1.06, blend: 'is-overlay' },
  { file: 'assets/05-tech-stack/tech-l4-near.png',       speed: 0.34, scale: 1.08 },
  { file: 'assets/05-tech-stack/tech-l5-foreground.png', speed: 0.55, scale: 1.12 },
  { file: 'assets/shared/overlay-vignette-navy.png',     speed: 0,    scale: 1.00, blend: 'is-grade' },
]
</script>
```

## 21.5 Engine sekali pakai di `App.vue`

```vue
<script setup>
import { onMounted, onUnmounted } from 'vue'
let raf = null

onMounted(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
  const layers = [...document.querySelectorAll('.px-layer')].map((el) => ({
    el,
    section: el.closest('.px-section'),
    speed: parseFloat(el.dataset.speed || '0'),
    scale: parseFloat(el.dataset.scale || '1'),
  }))
  let mx = 0, my = 0, tmx = 0, tmy = 0
  const onMove = (e) => {
    tmx = (e.clientX / innerWidth - 0.5) * 2
    tmy = (e.clientY / innerHeight - 0.5) * 2
  }
  if (!reduce) addEventListener('pointermove', onMove, { passive: true })

  const tick = () => {
    mx += (tmx - mx) * 0.08
    my += (tmy - my) * 0.08
    for (const L of layers) {
      const r = L.section.getBoundingClientRect()
      if (r.bottom < -innerHeight * 0.3 || r.top > innerHeight * 1.3) continue
      const p = (r.top + r.height / 2 - innerHeight / 2) / innerHeight
      const ty = reduce ? 0 : -p * L.speed * 260
      const ox = reduce ? 0 : mx * L.speed * 46
      const oy = reduce ? 0 : my * L.speed * 20
      L.el.style.transform =
        `translate3d(${ox}px, ${ty + oy}px, 0) scale(${L.scale})`
    }
    raf = requestAnimationFrame(tick)
  }
  raf = requestAnimationFrame(tick)
  onUnmounted(() => { cancelAnimationFrame(raf); removeEventListener('pointermove', onMove) })
})
</script>
```

Versi GSAP: `yPercent = ±speed × 26` pada `ScrollTrigger` dengan `scrub: true`,
dan `gsap.quickTo` durasi `0.8` untuk gerak mouse (`speed × 46` px di X,
`× 0.45` di Y). Detail lengkap ada di Bab 9–12.

## 21.6 Checklist sebelum deploy

- [ ] `assets/` dan `assets-mobile/` ada di `public/parallax/`.
- [ ] Layer L1 memakai `.jpg` (lebih ringan), L2–L5 memakai `.png`.
- [ ] Tidak lebih dari 2 overlay per section.
- [ ] `<section>` berurutan tanpa margin agar seam menyatu.
- [ ] Di bawah 900 px, ganti sumber ke `assets-mobile/` dan matikan layer L5.
- [ ] `prefers-reduced-motion` menonaktifkan transform.
- [ ] Teks utama tetap di `.px-content` (max-width 820 px) supaya selalu berada di
      safe zone tengah yang sengaja dikosongkan di semua layer.
