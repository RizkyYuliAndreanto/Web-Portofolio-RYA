# RYA Parallax Asset Pack

Asset parallax custom untuk web portofolio **RYA.** — dibuat menyesuaikan tone warna
situs kamu (navy gelap + cobalt blue + off-white), gaya **ilustrasi 2D vector cel-shaded
2.5D** (volume tebal, bukan garis tipis), tema **modern technology / programming**.
Tidak ada glow neon berlebihan, tidak terlalu gelap, tidak berkesan horor.

## Isi paket

```
parallax-assets-rya/
├── assets/                     # resolusi penuh 1920×1080, PNG transparan
│   ├── 01-hero/                # 5 layer
│   ├── 02-tech-stack/          # 5 layer
│   ├── 03-services/            # 5 layer
│   ├── 04-projects/            # 5 layer
│   ├── 05-experience/          # 5 layer
│   ├── 06-contact/             # 5 layer
│   └── shared/                 # 12 overlay universal (partikel, grid, cahaya, grain, fade)
├── assets-mobile/              # versi 960×540 (hemat bandwidth di HP)
├── demo/                       # contoh perakitan siap dibuka
│   ├── index.html
│   ├── css/parallax.css
│   └── js/parallax.js
├── manifest.json               # daftar layer + parallaxSpeed & scale rekomendasi
└── README.md
```

Total: **30 layer per-section + 12 overlay = 42 asset** (× 2 resolusi).
Setiap section punya **5 kedalaman berbeda**, dan di demo tiap section dirakit
menjadi **8–10 lapis** karena ditambah overlay partikel/cahaya/vignette.

## Struktur kedalaman (per section)

| Layer | Peran | Isi | `data-speed` | `scale` |
|---|---|---|---|---|
| `l1-backdrop` | langit/latar (opaque, ada versi `.jpg`) | gradient navy, garis halus, kabut | `0.03` | `1.02` |
| `l2-far` | latar jauh | skyline / rak server / infrastruktur | `0.10` | `1.03` |
| `l3-mid` | tengah | platform, mesin, props melayang | `0.20` | `1.05` |
| `l4-near` | dekat kamera | objek besar (keyboard, gear, laptop, globe) | `0.34` | `1.08` |
| `l5-foreground` | paling depan (blur DOF) | serpihan, kabel, partikel di tepi frame | `0.55` | `1.12` |

Layer 2–5 sudah **transparan (alpha)** dengan despill + feather, jadi tidak ada
garis hijau di pinggir. Bagian tengah frame dibiarkan kosong supaya **teks/heading
kamu tetap terbaca** di atasnya.

Grading kedalaman sudah diterapkan: layer jauh lebih pudar & lebih navy,
layer dekat lebih kontras — inilah yang membuat hasil rakitan terasa seperti
parallax sungguhan, bukan sekadar background.

## Overlay universal (`assets/shared/`)

`overlay-dust-fine` · `overlay-dust-far` · `overlay-bokeh-soft` · `overlay-hex-confetti` ·
`overlay-hex-mesh` · `overlay-grid-perspective` · `overlay-light-rays` · `overlay-glow-blue` ·
`overlay-vignette-navy` · `overlay-fade-top` · `overlay-fade-bottom` · `overlay-grain`

Pakai `mix-blend-mode: screen` untuk partikel/cahaya, dan `normal` untuk vignette/fade.
`overlay-fade-top/bottom` berguna untuk menyambung antar section agar transisinya mulus.

## Cara pakai (HTML + CSS)

```html
<section class="px-section" id="hero">
  <div class="px-stage">
    <div class="px-layer" data-speed="0.03" data-scale="1.02"
         style="background-image:url('assets/01-hero/hero-l1-backdrop.jpg')"></div>
    <div class="px-layer" data-speed="0.10" data-scale="1.03"
         style="background-image:url('assets/01-hero/hero-l2-far.png')"></div>
    <div class="px-layer" data-speed="0.20" data-scale="1.05"
         style="background-image:url('assets/01-hero/hero-l3-mid.png')"></div>
    <div class="px-layer" data-speed="0.34" data-scale="1.08"
         style="background-image:url('assets/01-hero/hero-l4-near.png')"></div>
    <div class="px-layer" data-speed="0.55" data-scale="1.12"
         style="background-image:url('assets/01-hero/hero-l5-foreground.png')"></div>
    <div class="px-layer is-overlay" data-speed="0.50"
         style="background-image:url('assets/shared/overlay-dust-fine.png')"></div>
    <div class="px-layer is-grade" data-speed="0"
         style="background-image:url('assets/shared/overlay-vignette-navy.png')"></div>
  </div>
  <div class="px-content"> ... konten & heading kamu ... </div>
</section>

<link rel="stylesheet" href="demo/css/parallax.css">
<script src="demo/js/parallax.js"></script>
```

Engine-nya vanilla JS (tanpa library): scroll parallax + mouse parallax halus,
`requestAnimationFrame`, otomatis nonaktif pada `prefers-reduced-motion: reduce`.

### Kalau pakai React / Next.js

```jsx
import manifest from "@/parallax-assets-rya/manifest.json";

const hero = manifest.sections.find(s => s.id === "01-hero");

<div className="px-stage">
  {hero.layers.map(l => (
    <div key={l.file} className="px-layer"
         data-speed={l.parallaxSpeed} data-scale={l.scale}
         style={{ backgroundImage: `url(/${l.file})` }} />
  ))}
</div>
```

### GSAP ScrollTrigger (opsional, lebih halus)

```js
gsap.utils.toArray(".px-section").forEach(sec => {
  gsap.to(sec.querySelectorAll(".px-layer"), {
    yPercent: i => -(parseFloat(sec.querySelectorAll(".px-layer")[i].dataset.speed) * 100),
    ease: "none",
    scrollTrigger: { trigger: sec, start: "top bottom", end: "bottom top", scrub: true }
  });
});
```

## Tips performa

- Pakai `assets-mobile/` di bawah 768px (lewat `<picture>` atau media query CSS).
- Konversi ke WebP/AVIF untuk produksi: `cwebp -q 82 input.png -o output.webp`.
- Preload hanya layer section pertama; sisanya lazy-load saat mendekati viewport.
- Jangan animasikan `top/left` — hanya `transform: translate3d()` seperti di engine ini.

## Palet warna

`#101827` · `#16213E` · `#1E2A44` · `#2F6BFF` · `#5E9FE8` · `#E9EEF6`

## Panduan lengkap

Baca `PANDUAN-PERAKITAN.md` untuk panduan perakitan + animasi (CSS, vanilla JS, GSAP ScrollTrigger, Lenis, React/Next, performa, QA).
