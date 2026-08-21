# PANDUAN CONTAINER TECH STACK — "SKY FOUNDRY UI"

Panduan perakitan + penganimasian aset wadah 3D untuk `TechStackSection.vue`,
menyatu dengan paket parallax v2 (`RYA-parallax-assets-v2.zip`).

---

## BAB 1 — ISI PAKET

```
techstack-container-rya/
├── assets/
│   ├── ui/                     ← 11 komponen wadah 3D (PNG transparan, 1x)
│   │   ├── panel-frame-wide.png    rangka utama (landscape)
│   │   ├── panel-frame-tall.png    rangka portrait (kolom / modal)
│   │   ├── header-plate.png        plat judul kategori
│   │   ├── slot-chip.png           slot tempat 1 tech (state normal)
│   │   ├── slot-chip-active.png    slot state hover/aktif (kobalt)
│   │   ├── icon-plinth.png         dudukan ikon kotak (72–96px)
│   │   ├── hex-socket.png          socket heksagon untuk core skill
│   │   ├── divider-rail.png        rail pemisah antar kategori
│   │   ├── corner-bracket.png      ornamen sudut rangka
│   │   ├── orbit-ring.png          ring orbit (dekor bawah/belakang)
│   │   └── pedestal.png            pedestal / alas mesin
│   └── fx/                     ← 4 efek prosedural (alpha bersih, no bintik)
│       ├── sheen-diagonal.png      kilau kaca untuk hover sweep
│       ├── beam-soft.png           berkas cahaya dari pedestal
│       ├── glow-cobalt.png         glow lembut di belakang panel
│       └── shadow-ellipse.png      shadow kontak elips
├── assets-2x/ui/               ← versi retina (2x) dari 11 komponen
├── demo/                       ← demo HTML/CSS/JS siap dibuka
├── vue/                        ← TechStackFoundry.vue + techStackData.js + foundry.css
├── manifest.json               ← ukuran & aspect ratio tiap part
└── PANDUAN-CONTAINER.md
```

Palet identik parallax v2: `#0E1522` `#131C30` `#1B2540` `#2A5FE0` `#4E86C8` `#DCE4F0`.
Semua part sudah punya **contact shadow** built-in, jadi langsung "nempel" di dunia parallax.

---

## BAB 2 — ATURAN PALING PENTING: 9-SLICE, JANGAN `background-size: 100% 100%`

Rangka dan plat harus bisa melar mengikuti jumlah tech stack. Kalau kamu pakai
`background-size: 100% 100%`, sudut rangka akan gepeng. Gunakan **`border-image`**.

Angka slice sudah diukur dari aset (termasuk padding shadow):

| Aset | `border-image-slice` | `border-width` (desktop) | Catatan |
|---|---|---|---|
| `panel-frame-wide.png` | `98 78 107 78` | `98px 78px 107px` | rangka utama, `inset:-34px -34px -40px` |
| `panel-frame-tall.png` | `76 75 82 75` | `76px 75px 82px` | untuk layout kolom |
| `header-plate.png` | `0 60 0 100 fill` | `0 26px 0 44px` | 3-slice horizontal |
| `slot-chip.png` | `0 60 0 170 fill` | `0 16px 0 43px` | band kiri = ceruk ikon |
| `slot-chip-active.png` | `0 60 0 130 fill` | `0 16px 0 33px` | |
| `divider-rail.png` | `0 40 0 40 fill` | `0 7px` | tinggi bebas (12px) |

### Kenapa 3-slice (`0 x 0 x fill`) untuk plat & chip?
Dengan slice atas/bawah `0`, penskalaan vertikal jadi **seragam** untuk semua region,
jadi ujung bulatnya tidak pernah jadi oval. Tinggi elemen bisa kamu ubah bebas
(56px, 48px, 64px) tanpa merusak bentuk.

### Rumus lebar cap kalau kamu ubah tinggi
```
cap_render = cap_source × (tinggi_elemen ÷ tinggi_sumber)
```
Contoh chip: tinggi sumber 219px, cap kiri sumber 170px. Kalau chip 48px →
`170 × (48/219) ≈ 37px` → `border-width: 0 14px 0 37px`.

Aset fixed-size (**jangan** di-stretch, pakai `background-size: contain`):
`icon-plinth`, `hex-socket`, `corner-bracket`, `orbit-ring`, `pedestal`.

---

## BAB 3 — STRUKTUR DOM WAJIB

```html
<div class="foundry">              <!-- perspective: 1700px -->
  <div class="foundry__panel">     <!-- transform-style: preserve-3d, yang di-tilt -->
    <div class="foundry__glass"></div>   <!-- z1: kaca gelap + inner shadow -->
    <div class="foundry__frame"></div>   <!-- z3: bezel 9-slice -->
    <i class="foundry__bracket ..."></i> <!-- z4: 4 sudut -->
    <div class="foundry__inner">         <!-- z2: KONTEN -->
      <div class="core">…hex-socket…</div>
      <div class="cat">
        <div class="cat__plate">judul + deskripsi</div>
        <div class="cat__rail"></div>
        <div class="grid">…chip…</div>
      </div>
    </div>
  </div>
  <div class="foundry__base">      <!-- ring + pedestal + badge -->
</div>
```

Urutan z-index itu penting: **kaca di bawah konten, bezel di atas konten**.
Itu yang membuat teks terasa berada *di dalam* mesin, bukan menempel di atas gambar.

Ikon chip diposisikan `position:absolute; left:-30px` supaya masuk ke band border
(tempat ceruk ikon pada aset). Jangan taruh ikon sebagai flow normal.

---

## BAB 4 — INTEGRASI DI VUE 3

```bash
npm i gsap
```

1. Copy `assets/` dan `assets-2x/` ke `public/foundry/`.
2. Copy `vue/TechStackFoundry.vue`, `vue/foundry.css`, `vue/techStackData.js` ke `src/components/`.
3. Di `foundry.css`, ganti prefix path jadi absolut publik:
   `url("../../assets/ui/...")` → `url("/foundry/assets/ui/...")`.
4. Pakai di section kamu:

```vue
<!-- TechStackSection.vue -->
<template>
  <section id="tech" class="px-section">
    <!-- layer parallax v2 (05-tech-stack) tetap di belakang -->
    <div class="px-stage">…px-layer l1..l5…</div>

    <div class="px-content">
      <p class="eyebrow">Tech Stack</p>
      <h2>A robust <em>arsenal</em> of modern tech.</h2>
      <TechStackFoundry :categories="techCategories" />
    </div>
  </section>
</template>

<script setup>
import TechStackFoundry from "./TechStackFoundry.vue"
import { techCategories } from "./techStackData.js"
</script>
```

`techStackData.js` sudah berisi 31 tool kamu dalam 5 kategori. Kalau punya file
SVG/PNG logo, isi field `icon: "/logos/vue.svg"` — kalau kosong otomatis pakai
label `short`.

---

## BAB 5 — ANIMASI GSAP (URUTAN YANG BENAR)

Semuanya ada di `TechStackFoundry.vue`. Ringkasannya:

```js
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)

const tl = gsap.timeline({
  defaults: { ease: "power3.out" },
  scrollTrigger: { trigger: root.value, start: "top 78%", once: true },
})

tl.from(panel.value,      { y: 70, scale: 0.94, rotateX: 9, autoAlpha: 0, duration: 1 })
  .from(".foundry__bracket", { scale: 0.4, autoAlpha: 0, duration: 0.5, stagger: 0.06 }, "-=0.55")
  .from(coreCells,        { y: 28, scale: 0.8, autoAlpha: 0, duration: 0.6, stagger: 0.07 }, "-=0.35")
  .from(plates,           { xPercent: -4, autoAlpha: 0, duration: 0.55, stagger: 0.10 }, "-=0.30")
  .from(rails,            { scaleX: 0.2, transformOrigin: "left center", autoAlpha: 0, duration: 0.5, stagger: 0.10 }, "-=0.45")
  .from(chips,            { y: 22, autoAlpha: 0, duration: 0.45, stagger: { each: 0.035 } }, "-=0.35")
```

**Prinsip urutan:** rangka dulu → sudut → core → plat kategori → rail → chip.
Mesin "terpasang" lalu isinya masuk. Jangan animasikan chip lebih dulu.

### Tilt 3D (ikut kursor, hemat CPU)
```js
const quickX = gsap.quickTo(panel.value, "rotateX", { duration: 0.8, ease: "power3.out" })
const quickY = gsap.quickTo(panel.value, "rotateY", { duration: 0.8, ease: "power3.out" })
// pointermove → quickY(nx * 4.2); quickX(-ny * 3.2)
```
Maks 4 derajat. Lebih dari itu bezel terlihat melengkung dan teks jadi blur.

### Hover chip + kilau kaca
```js
gsap.to(chip, { y: -4, duration: 0.3, ease: "power2.out" })
gsap.fromTo(sheen,
  { xPercent: -60, autoAlpha: 0 },
  { xPercent: 60, autoAlpha: 0.85, duration: 0.55, ease: "power2.out" })
```

### Sinkron dengan parallax (scrub)
```js
gsap.to(ring.value,            { yPercent: -18, ease: "none", scrollTrigger: { trigger: root.value, start: "top bottom", end: "bottom top", scrub: true } })
gsap.to(".foundry__pedestal",  { yPercent:   8, ease: "none", scrollTrigger: { …scrub: true } })
```
Ring bergerak **lebih cepat** dari panel, pedestal lebih lambat → wadahnya ikut
aturan kedalaman yang sama dengan layer parallax v2 (`data-speed` 0.03 → 0.55).
Kecepatan container ideal: **0.20–0.34** (setara layer `mid`/`near`).

### Kebersihan lifecycle (wajib di Vue)
```js
let ctx
onMounted(() => { ctx = gsap.context(() => { …semua animasi… }, root.value) })
onBeforeUnmount(() => { window.removeEventListener("pointermove", onPointerMove); ctx?.revert() })
```
Tanpa `ctx.revert()`, ScrollTrigger akan menumpuk setiap kali route berpindah dan
scroll jadi tersendat.

---

## BAB 6 — ALTERNATIF TANPA GSAP

`demo/js/foundry.js` adalah versi vanilla (IntersectionObserver + rAF + lerp 0.08).
Dipakai kalau kamu tidak mau menambah dependency. Kelas `.reveal` / `.is-in` dan
variabel `--i` untuk stagger sudah disiapkan di CSS.

---

## BAB 7 — RESPONSIF

| Breakpoint | Penyesuaian |
|---|---|
| ≤ 900px | `border-width` rangka → `74px 58px 80px`, `inset:-26px -26px -30px`, `.cat__desc` disembunyikan |
| ≤ 600px | rangka → `56px 44px 60px`, bracket sudut disembunyikan, chip 48px (`border-width: 0 14px 0 37px`), hex 88px |

Pakai `assets-2x/` lewat `image-set()` untuk layar retina:
```css
border-image-source: image-set(
  url("/foundry/assets/ui/slot-chip.png") 1x,
  url("/foundry/assets-2x/ui/slot-chip.png") 2x);
```

---

## BAB 8 — PERFORMA & AKSESIBILITAS

1. Animasikan hanya `transform` + `opacity`. Jangan animasikan `border-width` atau `background-position`.
2. `will-change: transform` hanya pada `.foundry__panel` dan `.chip`.
3. `mix-blend-mode: screen` cukup untuk `fx/` — jangan lebih dari 2 blend layer aktif per section.
4. Chip pakai `<button>` supaya bisa fokus keyboard; state aktif via class `.is-active`.
5. Hormati `prefers-reduced-motion` (sudah ditangani di CSS dan di komponen).
6. Gambar dekoratif memakai `<i>`/`background-image` (bukan `<img>`) supaya tidak dibaca screen reader.

---

## BAB 9 — CHECKLIST SEBELUM DEPLOY

- [ ] Path `url()` di `foundry.css` sudah menunjuk ke folder publik.
- [ ] `gsap.registerPlugin(ScrollTrigger)` dipanggil satu kali saja.
- [ ] `ScrollTrigger.refresh()` dipanggil setelah font/gambar selesai load.
- [ ] Tidak ada layer parallax yang menutupi `.foundry` (cek z-index section).
- [ ] Tes di 1440px, 900px, 390px.
- [ ] Tes `prefers-reduced-motion: reduce`.
