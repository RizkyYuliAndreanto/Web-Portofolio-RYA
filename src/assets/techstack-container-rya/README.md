# RYA Tech Stack Container — "Sky Foundry UI"

Aset wadah 3D untuk menampung seluruh tech stack kamu, dengan gaya, palet, dan
kedalaman yang sama seperti paket parallax v2. Bukan kartu datar — ini rangka
mesin bertingkat: bezel di atas konten, kaca gelap di bawah konten, pedestal dan
ring orbit sebagai alas.

## Buka demo

```
demo/index.html
```

Berisi 31 tool kamu dalam 5 kategori, lengkap dengan reveal bertahap, hover
kilau kaca, dan tilt 3D mengikuti kursor (versi vanilla, tanpa CDN).

## Isi

| Folder | Isi |
|---|---|
| `assets/ui/` | 11 komponen wadah 3D, PNG transparan (1x) |
| `assets-2x/ui/` | versi retina 2x |
| `assets/fx/` | 4 efek: sheen, beam, glow, shadow (alpha bersih, tanpa bintik) |
| `demo/` | halaman demo + `css/foundry.css` + `js/foundry.js` |
| `vue/` | `TechStackFoundry.vue` (GSAP + ScrollTrigger), `techStackData.js`, `foundry.css` |
| `manifest.json` | ukuran & aspect ratio tiap part |
| `PANDUAN-CONTAINER.md` | panduan perakitan + penganimasian lengkap (9 bab) |

## 11 komponen wadah

| Aset | Fungsi | Cara pakai |
|---|---|---|
| `panel-frame-wide` | rangka utama section | `border-image` 9-slice `98 78 107 78` |
| `panel-frame-tall` | rangka portrait / modal | `border-image` `76 75 82 75` |
| `header-plate` | plat judul kategori | 3-slice `0 60 0 100 fill` |
| `slot-chip` | slot 1 tech (normal) | 3-slice `0 60 0 170 fill` |
| `slot-chip-active` | slot hover / aktif | 3-slice `0 60 0 130 fill` |
| `icon-plinth` | dudukan ikon kotak | fixed 72–96px |
| `hex-socket` | socket core skill | fixed 88–108px |
| `divider-rail` | pemisah kategori | 3-slice `0 40 0 40 fill` |
| `corner-bracket` | ornamen 4 sudut | fixed, mirror per sudut |
| `orbit-ring` | ring orbit dekor | fixed, scrub `yPercent -18` |
| `pedestal` | alas mesin | fixed, scrub `yPercent 8` |

## Palet

`#0E1522` · `#131C30` · `#1B2540` · `#2A5FE0` · `#4E86C8` · `#DCE4F0`

Sama persis dengan parallax v2 (sudah lewat penggelapan global 0.90 + penyamaan
tone), jadi wadah ini tidak akan terlihat lebih terang dari latarnya.

## Vue + GSAP singkat

```bash
npm i gsap
```

```vue
<TechStackFoundry :categories="techCategories" />
```

Detail timeline, tilt `quickTo`, scrub ScrollTrigger, breakpoint, dan checklist
deploy ada di `PANDUAN-CONTAINER.md`.
