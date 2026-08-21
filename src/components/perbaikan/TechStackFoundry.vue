<!--
  TechStackFoundry.vue — VERSI PERBAIKAN (fix pack)

  Perbedaan vs versi kamu:
  1. plates / rails / chips sekarang dikosongkan setiap render supaya tidak
     menumpuk node lama (penyebab animasi "nyangkut" & elemen tetap invisible
     setelah hot-reload atau saat prop categories berubah).
  2. ScrollTrigger.refresh() dipanggil setelah semua gambar selesai load.
     Ini penyebab paling sering: gambar parallax v2 baru selesai load SETELAH
     ScrollTrigger mengukur halaman, posisi trigger jadi salah, timeline
     from({autoAlpha:0}) tidak pernah jalan -> panel tetap tersembunyi.
  3. Ada pengaman: kalau setelah 2.5 detik timeline belum pernah jalan,
     semuanya dipaksa tampil (clearProps). Jadi web kamu TIDAK PERNAH
     menampilkan section kosong, apa pun yang terjadi dengan GSAP.
  4. Kalau prefers-reduced-motion aktif, class .is-static dipasang supaya
     elemen tetap terlihat (versi lama cuma `return`, aman, tapi kini
     eksplisit).
-->
<template>
	<div class="foundry" :class="{ 'is-static': staticMode }" ref="root">
		<div class="foundry__panel" ref="panel">
			<div class="foundry__glass"></div>
			<div class="foundry__frame"></div>
			<i class="foundry__bracket foundry__bracket--tl"></i>
			<i class="foundry__bracket foundry__bracket--tr"></i>
			<i class="foundry__bracket foundry__bracket--bl"></i>
			<i class="foundry__bracket foundry__bracket--br"></i>

			<div class="foundry__inner">
				<div class="core" ref="core">
					<div v-for="c in core" :key="c" class="core__cell"><span>{{ c }}</span></div>
				</div>

				<div v-for="cat in categories" :key="cat.title" class="cat">
					<div class="cat__plate" :ref="el => push(plates, el)">
						<h3 class="cat__title">{{ cat.title }}</h3>
						<p class="cat__desc">{{ cat.desc }}</p>
					</div>
					<div class="cat__rail" :ref="el => push(rails, el)"></div>
					<div class="grid">
						<button
							v-for="item in cat.items"
							:key="item.name"
							class="chip"
							:class="{ 'is-active': active === item.name }"
							:ref="el => push(chips, el)"
							@click="active = active === item.name ? '' : item.name"
							@pointerenter="sweep($event.currentTarget)"
						>
							<i class="chip__icon">
								<img v-if="item.icon" :src="item.icon" :alt="item.name" width="16" height="16">
								<template v-else>{{ item.short }}</template>
							</i>
							{{ item.name }}
							<i class="chip__sheen"></i>
						</button>
					</div>
				</div>
			</div>
		</div>

		<div class="foundry__base">
			<div class="foundry__ring" ref="ring"></div>
			<div class="foundry__pedestal" ref="pedestal"></div>
			<p class="foundry__badge">{{ total }} tools / {{ categories.length }} divisi</p>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, onBeforeUpdate } from "vue"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const props = defineProps({
	categories: { type: Array, required: true },
	core: { type: Array, default: () => ["JS", "TS", "VUE", "NODE", "PY", "SQL"] },
})

const root = ref(null)
const panel = ref(null)
const core = ref(null)
const ring = ref(null)
const pedestal = ref(null)
const active = ref("")
const staticMode = ref(false)

/* FIX 1: kumpulan ref di-reset tiap render, jadi tidak ada node basi */
let plates = []
let rails = []
let chips = []
onBeforeUpdate(() => { plates = []; rails = []; chips = [] })
function push(bucket, el) { if (el) bucket.push(el) }

const total = computed(() =>
	props.categories.reduce((n, c) => n + c.items.length, 0),
)

let ctx
let quickX
let quickY
let played = false

function onPointerMove(e) {
	if (!panel.value || !quickX) return
	const r = panel.value.getBoundingClientRect()
	const nx = gsap.utils.clamp(-1, 1, (e.clientX - (r.left + r.width / 2)) / (r.width / 2))
	const ny = gsap.utils.clamp(-1, 1, (e.clientY - (r.top + r.height / 2)) / (r.height / 2))
	quickY(nx * 4.2)
	quickX(-ny * 3.2)
}

function sweep(el) {
	const sheen = el.querySelector(".chip__sheen")
	if (!sheen) return
	gsap.fromTo(
		sheen,
		{ xPercent: -60, autoAlpha: 0 },
		{
			xPercent: 60, autoAlpha: 0.85, duration: 0.55, ease: "power2.out",
			onComplete: () => gsap.to(sheen, { autoAlpha: 0, duration: 0.25 }),
		},
	)
}

/* FIX 3: pengaman - paksa tampil kalau timeline tak pernah jalan */
function forceVisible() {
	if (played) return
	const all = [panel.value, ...plates, ...rails, ...chips]
	if (core.value) all.push(...core.value.children)
	gsap.set(all.filter(Boolean), { clearProps: "all" })
	staticMode.value = true
}

onMounted(() => {
	const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
	if (reduced) {
		staticMode.value = true
		return
	}

	ctx = gsap.context(() => {
		const tl = gsap.timeline({
			defaults: { ease: "power3.out" },
			scrollTrigger: {
				trigger: root.value,
				start: "top 85%",
				once: true,
				invalidateOnRefresh: true,
				onEnter: () => { played = true },
			},
		})

		tl.from(panel.value, { y: 70, scale: 0.94, rotateX: 9, autoAlpha: 0, duration: 1 })
			.from(".foundry__bracket", { scale: 0.4, autoAlpha: 0, duration: 0.5, stagger: 0.06 }, "-=0.55")
			.from(core.value.children, { y: 28, scale: 0.8, autoAlpha: 0, duration: 0.6, stagger: 0.07 }, "-=0.35")
			.from(plates, { xPercent: -4, autoAlpha: 0, duration: 0.55, stagger: 0.1 }, "-=0.3")
			.from(rails, { scaleX: 0.2, transformOrigin: "left center", autoAlpha: 0, duration: 0.5, stagger: 0.1 }, "-=0.45")
			.from(chips, { y: 22, autoAlpha: 0, duration: 0.45, stagger: { each: 0.035 } }, "-=0.35")

		/* parallax halus, sinkron dengan pack parallax v2 */
		gsap.to(ring.value, {
			yPercent: -18, ease: "none",
			scrollTrigger: { trigger: root.value, start: "top bottom", end: "bottom top", scrub: true },
		})
		gsap.to(pedestal.value, {
			yPercent: 8, ease: "none",
			scrollTrigger: { trigger: root.value, start: "top bottom", end: "bottom top", scrub: true },
		})

		gsap.to(ring.value, { y: -10, rotate: 1.2, duration: 4.5, ease: "sine.inOut", yoyo: true, repeat: -1 })

		chips.forEach((chip) => {
			chip.addEventListener("pointerenter", () => gsap.to(chip, { y: -4, duration: 0.3, ease: "power2.out" }))
			chip.addEventListener("pointerleave", () => gsap.to(chip, { y: 0, duration: 0.4, ease: "power2.out" }))
		})

		quickX = gsap.quickTo(panel.value, "rotateX", { duration: 0.8, ease: "power3.out" })
		quickY = gsap.quickTo(panel.value, "rotateY", { duration: 0.8, ease: "power3.out" })
		window.addEventListener("pointermove", onPointerMove, { passive: true })
	}, root.value)

	/* FIX 2: ukur ulang setelah semua gambar (termasuk layer parallax) load */
	if (document.readyState === "complete") ScrollTrigger.refresh()
	else window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true })

	setTimeout(forceVisible, 2500)
})

onBeforeUnmount(() => {
	window.removeEventListener("pointermove", onPointerMove)
	ctx && ctx.revert()
})
</script>

<!-- CATATAN: `scoped` sengaja DIHAPUS.
     foundry.css memakai selector turunan (.foundry .chip, dst) dan aturan
     @keyframes; dengan `scoped` beberapa selector turunan bisa tidak kena
     karena atribut data-v hanya ditempel di elemen paling luar dari
     tiap blok. File ini sudah semua di-namespace di bawah .foundry,
     jadi aman tanpa scoped. -->
<style src="./foundry.css"></style>
