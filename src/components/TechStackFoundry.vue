<!--
  TechStackFoundry.vue — simplified to match reference demo.
  Container 3D untuk TechStackSection — GSAP + ScrollTrigger.
  Perubahan: removed hex/square shapes, ambient glow, magnetic hover.
-->
<template>
	<div class="foundry" ref="root">
		<div class="foundry__panel" ref="panel">
			<div class="foundry__glass"></div>
			<div class="foundry__frame"></div>
			<i class="foundry__bracket foundry__bracket--tl"></i>
			<i class="foundry__bracket foundry__bracket--tr"></i>
			<i class="foundry__bracket foundry__bracket--bl"></i>
			<i class="foundry__bracket foundry__bracket--br"></i>

			<div class="foundry__inner">
				<!-- Core hex row -->
				<div class="core" ref="core">
					<div v-for="c in core" :key="c" class="core__cell"><span>{{ c }}</span></div>
				</div>

				<!-- Category sections -->
				<div v-for="(cat, ci) in categories" :key="cat.title" class="cat">
					<div class="cat__plate" :ref="el => push(plates, el)">
						<h3 class="cat__title">{{ cat.title }}</h3>
						<p class="cat__desc">{{ cat.desc }}</p>
					</div>
					<div class="cat__rail" :ref="el => push(rails, el)"></div>

					<!-- Square shape: plinth row (Tools & DevOps) -->
					<div v-if="cat.shape === 'square'" class="plinth-row" :ref="el => push(plinths, el)">
						<div v-for="item in cat.items" :key="item.name" class="plinth">
							<img v-if="item.icon" :src="item.icon" :alt="item.name" width="32" height="32" style="object-fit:contain;border-radius:4px">
							<template v-else>{{ item.short }}</template>
						</div>
					</div>

					<!-- Regular chip grid -->
					<div v-else class="grid">
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
								<img v-if="item.icon" :src="item.icon" :alt="item.name" width="24" height="24">
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
			<div class="foundry__pedestal"></div>
			<div class="foundry__pedestal-glow" ref="pedestalGlow"></div>
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
const pedestalGlow = ref(null)
const active = ref("")

/* Reset refs every render to avoid stale elements */
let plates = []
let rails = []
let chips = []
let plinths = []
onBeforeUpdate(() => { plates = []; rails = []; chips = []; plinths = [] })
function push(bucket, el) { if (el) bucket.push(el) }

const total = computed(() =>
	props.categories.reduce((n, c) => n + c.items.length, 0),
)

let ctx
let quickX
let quickY

function onPointerMove(e) {
	if (!panel.value || !quickX) return
	const r = panel.value.getBoundingClientRect()
	const nx = gsap.utils.clamp(-1, 1, (e.clientX - (r.left + r.width / 2)) / (r.width / 2))
	const ny = gsap.utils.clamp(-1, 1, (e.clientY - (r.top + r.height / 2)) / (r.height / 2))
	// Tilt lebih responsif tapi tetap subtle
	quickY(nx * 5)
	quickX(-ny * 3.5)
}

function sweep(el) {
	const sheen = el.querySelector(".chip__sheen")
	if (!sheen) return
	gsap.fromTo(
		sheen,
		{ xPercent: -60, autoAlpha: 0 },
		{ xPercent: 60, autoAlpha: 0.85, duration: 0.55, ease: "power2.out",
			onComplete: () => gsap.to(sheen, { autoAlpha: 0, duration: 0.25 }) },
	)
}

onMounted(() => {
	const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
	if (reduced) return

	ctx = gsap.context(() => {
		/* Entrance timeline */
		const tl = gsap.timeline({
			defaults: { ease: "power3.out" },
			scrollTrigger: { trigger: root.value, start: "top 78%", once: true },
		})

		tl.from(panel.value, { y: 100, scale: 0.85, rotateX: 15, rotateY: -8, autoAlpha: 0, duration: 1.4 })
			.from(".foundry__bracket", { scale: 0.3, autoAlpha: 0, duration: 0.6, stagger: 0.08 }, "-=0.8")
			.from(ring.value, { scale: 0.5, rotateX: 45, autoAlpha: 0, duration: 0.8 }, "-=0.6")
			.from(".foundry__pedestal", { y: 40, scale: 0.9, autoAlpha: 0, duration: 0.7 }, "-=0.5")
			.from(pedestalGlow.value, { opacity: 0, scaleX: 0.5, duration: 0.6 }, "-=0.3")
			.from(core.value.children, { y: 30, scale: 0.7, autoAlpha: 0, duration: 0.7, stagger: 0.08 }, "-=0.4")
			.from(plates, { xPercent: -6, autoAlpha: 0, duration: 0.6, stagger: 0.12 }, "-=0.35")
			.from(rails, { scaleX: 0.1, transformOrigin: "left center", autoAlpha: 0, duration: 0.55, stagger: 0.12 }, "-=0.5")
			.from([...chips, ...plinths], { y: 24, scale: 0.9, autoAlpha: 0, duration: 0.5, stagger: { each: 0.03, from: "start" } }, "-=0.4")

		/* === 3D CONTINUOUS ROTATION === */
		// Panel berputar pelan di sumbu Y (holographic effect)
		gsap.to(panel.value, {
			rotateY: 3,
			rotateX: -1.5,
			duration: 6,
			ease: "sine.inOut",
			yoyo: true,
			repeat: -1,
		})

		/* === ORBIT RING 3D ORBIT === */
		// Ring mengelilingi panel dengan rotasi 3D
		const ringTl = gsap.timeline({ repeat: -1, ease: "none" })
		ringTl
			.to(ring.value, {
				rotateY: 360,
				rotateX: 8,
				duration: 20,
				ease: "none",
			})
			.to(ring.value, {
				rotateY: 720,
				rotateX: -5,
				duration: 40,
				ease: "none",
			}, 0)

		// Ring parallax sync with scroll
		gsap.to(ring.value, {
			yPercent: -25,
			scale: 1.05,
			ease: "none",
			scrollTrigger: { trigger: root.value, start: "top bottom", end: "bottom top", scrub: 1.5 },
		})

		/* === PEDESTAL GLOW PULSE === */
		gsap.to(pedestalGlow.value, {
			opacity: 0.8,
			scaleX: 1.1,
			duration: 2.5,
			ease: "sine.inOut",
			yoyo: true,
			repeat: -1,
		})

		// Pedestal parallax
		gsap.to(".foundry__pedestal", {
			yPercent: 8,
			ease: "none",
			scrollTrigger: { trigger: root.value, start: "top bottom", end: "bottom top", scrub: 1.5 },
		})

		/* === PANEL 3D SCROLL DEPTH === */
		// Panel bergerak lebih dalam saat scroll
		gsap.to(panel.value, {
			rotateX: -4,
			yPercent: -15,
			ease: "none",
			scrollTrigger: { trigger: root.value, start: "top bottom", end: "bottom top", scrub: 2 },
		})

		/* === TILT 3D (ikuti kursor) === */
		quickX = gsap.quickTo(panel.value, "rotateX", { duration: 1, ease: "power3.out" })
		quickY = gsap.quickTo(panel.value, "rotateY", { duration: 1, ease: "power3.out" })
		window.addEventListener("pointermove", onPointerMove, { passive: true })
	}, root.value)

	if (document.readyState === "complete") ScrollTrigger.refresh()
	else window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true })
})

onBeforeUnmount(() => {
	window.removeEventListener("pointermove", onPointerMove)
	ctx && ctx.revert()
})
</script>

<!-- CATATAN: `scoped` sengaja DIHAPUS.
     foundry.css sudah di-namespace di bawah .foundry. -->
<style src="./foundry.css"></style>
