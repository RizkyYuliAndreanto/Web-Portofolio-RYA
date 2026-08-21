# RYA Parallax Assets v2 — "Sky Foundry"

Paket aset parallax **versi 2** untuk portofolio Vue 3 milik Rizky Yuli Andreanto.
Semua gambar dibuat ulang sebagai **satu dunia yang menyambung**, bukan 6 scene terpisah seperti v1.

## Yang berubah dari v1 (sesuai permintaan)

| Permintaan | Yang dilakukan |
|---|---|
| "warna sudah match tapi terlalu terang" | Palet diturunkan satu langkah (`#0E1522` / `#131C30` / `#1B2540`) + penggelapan global 10% dan penyamaan tone ke satu titik navy di seluruh 38 layer |
| "jangan terlalu ramai element seperti bintik-bintiknya" | Overlay `dust-fine`, `dust-far`, dan `hex-confetti` **dihapus total**. Sisa overlay hanya 9 dan semuanya bertekstur besar / halus |
| "jangan terlalu besar gambar element seperti komputer roda giginya, bentrok dengan teks" | Semua properti digambar ukuran sedang-kecil dan hanya menempel di tepi kiri / kanan / bawah. **Zona tengah 55% frame dikosongkan** di setiap layer, plus layer `far` diperkecil 82% secara vertikal |
| "parallax antar section tidak match" | Urutan mengikuti `App.vue`, garis horizon dipatok di **56%** di semua frame, dan tepi atas/bawah tiap backdrop dijahit ke warna batas bersama (seam stitching) |

## Urutan section (sama dengan App.vue)

```
01-hero        → HeroSection.vue
02-profile     → ProfileSection.vue
03-services    → ServicesSection.vue
04-projects    → ProjectsSection.vue
05-tech-stack  → TechStackSection.vue
06-experience  → ExperienceTimeline.vue
07-contact     → ContactSection.vue
08-footer      → FooterSection.vue
```

Alur kamera satu dunia: rooftop kota (Hero) → turun ke balkon studio (Profile) → workshop
(Services) → galeri (Projects) → server hall (Tech Stack) → koridor arsip (Experience) →
naik lagi ke rooftop relay (Contact) → panorama kota menjauh (Footer).

## Struktur folder

```
parallax-assets-rya-v2/
├── assets/
│   ├── 01-hero/        hero-l1-backdrop.png + .jpg, hero-l2-far.png,
│   │                   hero-l3-mid.png, hero-l4-near.png, hero-l5-foreground.png
│   ├── 02-profile/     profile-l1..l5
│   ├── 03-services/    services-l1..l5
│   ├── 04-projects/     projects-l1..l5
│   ├── 05-tech-stack/  tech-l1..l5
│   ├── 06-experience/  experience-l1..l5
│   ├── 07-contact/     contact-l1..l5
│   ├── 08-footer/      footer-l1-backdrop, footer-l2-far, footer-l3-near
│   └── shared/         9 overlay global
├── assets-mobile/      salinan 960×540 (struktur identik)
├── manifest.json       metadata semua layer (depth, speed, scale, opaque)
├── README.md
├── PANDUAN-PERAKITAN.md
└── demo/               index.html + css/parallax.css + js/parallax.js
```

Resolusi desktop **1920×1080**, mobile **960×540**. Layer 1 tersedia juga sebagai `.jpg`
(lebih ringan, karena memang tidak transparan).

## Tabel kedalaman

| Layer | Role | `data-speed` | `data-scale` | Transparan |
|---|---|---|---|---|
| L1 | backdrop | 0.03 | 1.02 | tidak (opaque) |
| L2 | far | 0.10 | 1.03 | ya |
| L3 | mid | 0.20 | 1.05 | ya |
| L4 | near | 0.34 | 1.08 | ya |
| L5 | foreground | 0.55 | 1.12 | ya |

Footer memakai 3 layer: backdrop (0.03) → far (0.10) → near (0.34).

## Overlay global (`assets/shared/`)

| File | Fungsi | Speed | Blend |
|---|---|---|---|
| `overlay-hex-mesh.png` | tekstur heksagon halus | 0.07 | screen |
| `overlay-grid-perspective.png` | grid lantai perspektif | 0.16 | screen |
| `overlay-light-rays.png` | berkas cahaya lembut | 0.05 | screen |
| `overlay-glow-blue.png` | glow kobalt sangat tipis | 0.04 | screen |
| `overlay-bokeh-soft.png` | 9 bulatan besar kabur (bukan bintik) | 0.26 | screen |
| `overlay-vignette-navy.png` | vignette | 0 | normal |
| `overlay-fade-top.png` | fade sambungan atas | 0 | normal |
| `overlay-fade-bottom.png` | fade sambungan bawah | 0 | normal |
| `overlay-grain.png` | grain film halus | 0 | soft-light |

> Pakai maksimal **2 overlay per section**. Itu batas yang membuat tampilan tetap bersih.

## Pakai cepat di Vue 3

```vue
<!-- components/HeroSection.vue -->
<template>
  <section class="px-section" ref="root">
    <div class="px-stage">
      <div class="px-layer" data-speed="0.03" data-scale="1.02"
           :style="bg('01-hero/hero-l1-backdrop.jpg')" />
      <div class="px-layer" data-speed="0.10" data-scale="1.03"
           :style="bg('01-hero/hero-l2-far.png')" />
      <div class="px-layer" data-speed="0.20" data-scale="1.05"
           :style="bg('01-hero/hero-l3-mid.png')" />
      <div class="px-layer" data-speed="0.34" data-scale="1.08"
           :style="bg('01-hero/hero-l4-near.png')" />
      <div class="px-layer" data-speed="0.55" data-scale="1.12"
           :style="bg('01-hero/hero-l5-foreground.png')" />
    </div>
    <div class="px-content"><!-- teks hero --></div>
  </section>
</template>

<script setup>
const bg = (p) => ({ backgroundImage: `url(/parallax/assets/${p})` })
</script>
```

Taruh folder `assets/` dan `assets-mobile/` ke `public/parallax/`, lalu jalankan engine
parallax sekali saja di `App.vue` (lihat `PANDUAN-PERAKITAN.md` bab GSAP & Vue).

## Demo

Buka `demo/index.html` langsung di browser — 8 section lengkap dengan urutan yang benar.

## Palet

`#0E1522` · `#131C30` · `#1B2540` · `#2A5FE0` · `#4E86C8` · `#DCE4F0`
