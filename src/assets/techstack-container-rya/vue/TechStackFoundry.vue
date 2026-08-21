<!--
  TechStackFoundry.vue
  Container 3D untuk TechStackSection.vue - dianimasikan dengan GSAP + ScrollTrigger.

  npm i gsap
  Taruh folder assets/ pada public/parallax-ui/ lalu sesuaikan konstanta UI di bawah.
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
				<div class="core" ref="core">
					<div v-for="c in core" :key="c" class="core__cell"><span>{{ c }}</span></div>
				</div>

				<div v-for="(cat, ci) in categories" :key="cat.title" class="cat">
					<div class="cat__plate" :ref="el => setRef(plates, el)">
						<h3 class="cat__title">{{ cat.title }}</h3>
						<p class="cat__desc">{{ cat.desc }}</p>
					</div>
					<div class="cat__rail" :ref="el => setRef(rails, el)"></div>
					<div class="grid">
						<button
							v-for="item in cat.items"
							:key="item.name"
							class="chip"
							:class="{ 'is-active': active === item.name }"
							:ref="el => setRef(chips, el)"
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
			<div class="foundry__pedestal"></div>
			<p class="foundry__badge">{{ total }} tools / {{ categories.length }} divisi</p>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue"
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
const plates = ref([])
const rails = ref([])
const chips = ref([])
const active = ref("")

const total = computed(() =>
	props.categories.reduce((n, c) => n + c.items.length, 0),
)

function setRef(bucket, el) {
	if (el && !bucket.value.includes(el)) bucket.value.push(el)
}

let ctx
let quickX
let quickY

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
		{ xPercent: 60, autoAlpha: 0.85, duration: 0.55, ease: "power2.out",
			onComplete: () => gsap.to(sheen, { autoAlpha: 0, duration: 0.25 }) },
	)
}

onMounted(() => {
	const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
	if (reduced) return

	ctx = gsap.context(() => {
		/* 1. rangka masuk */
		const tl = gsap.timeline({
			defaults: { ease: "power3.out" },
			scrollTrigger: { trigger: root.value, start: "top 78%", once: true },
		})

		tl.from(panel.value, { y: 70, scale: 0.94, rotateX: 9, autoAlpha: 0, duration: 1 })
			.from(".foundry__bracket", { scale: 0.4, autoAlpha: 0, duration: 0.5, stagger: 0.06 }, "-=0.55")
			.from(core.value.children, { y: 28, scale: 0.8, autoAlpha: 0, duration: 0.6, stagger: 0.07 }, "-=0.35")
			.from(plates.value, { xPercent: -4, autoAlpha: 0, duration: 0.55, stagger: 0.1 }, "-=0.3")
			.from(rails.value, { scaleX: 0.2, transformOrigin: "left center", autoAlpha: 0, duration: 0.5, stagger: 0.1 }, "-=0.45")
			.from(chips.value, { y: 22, autoAlpha: 0, duration: 0.45, stagger: { each: 0.035, from: "start" } }, "-=0.35")

		/* 2. parallax halus mengikuti scroll (sinkron dengan pack parallax v2) */
		gsap.to(ring.value, {
			yPercent: -18,
			ease: "none",
			scrollTrigger: { trigger: root.value, start: "top bottom", end: "bottom top", scrub: true },
		})
		gsap.to(".foundry__pedestal", {
			yPercent: 8,
			ease: "none",
			scrollTrigger: { trigger: root.value, start: "top bottom", end: "bottom top", scrub: true },
		})

		/* 3. ring mengapung */
		gsap.to(ring.value, { y: -10, rotate: 1.2, duration: 4.5, ease: "sine.inOut", yoyo: true, repeat: -1 })

		/* 4. hover chip */
		chips.value.forEach((chip) => {
			const hoverIn = () => gsap.to(chip, { y: -4, duration: 0.3, ease: "power2.out" })
			const hoverOut = () => gsap.to(chip, { y: 0, duration: 0.4, ease: "power2.out" })
			chip.addEventListener("pointerenter", hoverIn)
			chip.addEventListener("pointerleave", hoverOut)
		})

		/* 5. tilt 3D */
		quickX = gsap.quickTo(panel.value, "rotateX", { duration: 0.8, ease: "power3.out" })
		quickY = gsap.quickTo(panel.value, "rotateY", { duration: 0.8, ease: "power3.out" })
		window.addEventListener("pointermove", onPointerMove, { passive: true })
	}, root.value)
})

onBeforeUnmount(() => {
	window.removeEventListener("pointermove", onPointerMove)
	ctx && ctx.revert()
})
</script>

<style scoped src="./foundry.css"></style>
