# Kenapa tampilanmu tidak seperti demo

Saya reproduksi ulang integrasi kamu di sandbox: saya ambil `foundry.css` milikmu apa
adanya, saya bungkus dengan DOM `TechStackSection.vue` milikmu (termasuk
`<div class="w-full flex justify-center">`) dan Tailwind preflight, lalu saya render.

**Hasilnya: tampil sempurna, persis demo.** Artinya CSS dan struktur komponenmu
**tidak salah**. Yang salah ada di luar itu, dan penyebabnya hampir pasti nomor 1.

---

## 1. PENYEBAB UTAMA - path aset 404

Semua aset di `foundry.css` dipanggil dengan path **absolut**:

```css
url("/foundry/assets/ui/panel-frame-wide.png")
```

Path yang dimulai dengan `/` dihitung dari **root dev server**, bukan dari folder
component. Jadi file itu WAJIB ada di:

```
public/
  foundry/
    assets/
      ui/*.png      <-- 11 file
      fx/*.png      <-- 4 file
    assets-2x/
      ui/*.png      <-- 11 file
```

Parallax kamu memakai `/parallax-v2/...` dan itu jalan, berarti pola `public/` kamu
sudah benar - kemungkinan besar folder foundry-nya belum dipindah ke `public/`,
atau tingkat foldernya bergeser satu (mis. `public/foundry/techstack-container-rya/assets/...`).

**Efeknya persis seperti gambarmu:** `border-image` gagal load, jadi rangka 3D,
plat, dan chip tidak punya gambar sama sekali - yang tersisa cuma kotak datar
plus teks. Bukan kartu lamamu, itu wadah baru yang "telanjang".

### Cara memastikan dalam 10 detik

Buka DevTools > tab **Network** > filter **Img** > reload. Kalau ada PNG merah
berstatus 404, itu masalahnya. Atau langsung buka di browser:

```
http://localhost:5173/foundry/assets/ui/panel-frame-wide.png
```

Kalau tidak muncul gambar rangka, path-nya salah.

### Perbaikan

```bash
# dari root project kamu
mkdir -p public/foundry
cp -r /lokasi/techstack-container-rya/assets      public/foundry/
cp -r /lokasi/techstack-container-rya/assets-2x   public/foundry/
```

Kalau kamu ingin menaruhnya di tempat lain, cari-ganti `/foundry/` di `foundry.css`
dengan path barumu. Jangan pakai path relatif (`../assets/...`) kalau file CSS-nya
di-import lewat `<style src>` - basis-nya beda.

---

## 2. `image-set()` tanpa fallback

`border-image-source: image-set(...)` belum didukung merata (Safari lama butuh
`-webkit-image-set`). Kalau browsermu tidak mengerti, seluruh deklarasi dibuang
dan rangka hilang - **gejalanya sama persis** dengan 404 di atas.

Sudah saya perbaiki: di `foundry.css` versi fix, setiap `image-set()` diberi baris
fallback `url()` 1x tepat sebelumnya. Browser lama pakai baris pertama, browser
baru menimpanya dengan versi retina. Tidak ada lagi kemungkinan rangka hilang.

---

## 3. `.foundry` menyusut di dalam flex Tailwind

Di `TechStackSection.vue` kamu, `<TechStackFoundry>` ada di dalam:

```html
<div class="w-full flex justify-center">
```

Sebagai flex item, `.foundry` lebarnya jadi *content-based*; `max-width: 1080px`
tidak bisa memaksanya melebar. Wadahnya bisa lebih sempit dari seharusnya dan chip
jadi membungkus aneh. Fix: `.foundry { width: 100%; max-width: 1080px; }` - sudah
ada di patch.

---

## 4. Tailwind preflight menimpa `border-width`

Preflight Tailwind menulis `border-width: 0` ke `*, ::before, ::after` dan
`background-image: none` ke `<button>`. Chip kamu adalah `<button>`. Kalau urutan
injeksi CSS berubah (sering terjadi di build production), `border-width` chip jadi 0
dan **9-slice-nya lenyap** - lagi-lagi tampilan datar. Patch mengunci ulang
`border-style`, `border-width`, dan `background-color` di bawah namespace `.foundry`.

---

## 5. `<style scoped src="./foundry.css">`

`scoped` menempelkan `[data-v-hash]` ke selector. Untuk selector turunan dan
`@keyframes`, ini bisa membuat sebagian aturan tidak kena, terutama setelah build.
Seluruh CSS ini sudah di-namespace di bawah `.foundry`, jadi `scoped` tidak perlu.
Di versi fix, `scoped` dihapus: `<style src="./foundry.css"></style>`.

---

## 6. ScrollTrigger mengukur sebelum gambar parallax selesai load

Ini penyebab kasus "section-nya kosong / panel tidak pernah muncul". Timeline kamu
pakai `.from({ autoAlpha: 0 })` dengan `immediateRender` - elemen langsung
disembunyikan, lalu baru ditampilkan saat trigger fire. Kalau layer parallax v2
(file JPG/PNG besar) baru selesai load setelah ScrollTrigger mengukur, posisi
trigger salah dan animasinya tidak pernah jalan -> panel tetap invisible selamanya.

Fix di komponen:

- `ScrollTrigger.refresh()` dipanggil pada `window.load`
- `invalidateOnRefresh: true`
- `start` dilonggarkan ke `top 85%`
- **pengaman**: kalau 2,5 detik timeline belum jalan, semua elemen dipaksa tampil
  (`clearProps`). Jadi web kamu tidak akan pernah menampilkan section kosong.

---

## 7. Ref array menumpuk

`plates`, `rails`, `chips` adalah array biasa yang diisi lewat function ref. Vue
memanggil function ref ulang setiap re-render, jadi array-nya terus bertambah
(node basi ikut masuk). Setelah hot-reload atau saat prop `categories` berubah,
GSAP menganimasikan node yang sudah tidak ada di DOM dan chip yang baru tetap
tersembunyi. Fix: array direset di `onBeforeUpdate`.

---

## Urutan langkah perbaikan

1. Ganti `foundry.css` dan `TechStackFoundry.vue` dengan versi di folder ini.
2. Pindahkan `assets/` dan `assets-2x/` ke `public/foundry/`.
3. Restart dev server (Vite tidak selalu mendeteksi file baru di `public/`).
4. Buka DevTools > Network > Img, pastikan **nol** 404.
5. Kalau masih datar, kirim screenshot tab Network-nya.

`TechStackSection.vue` milikmu **tidak perlu diubah** - sudah benar.
