<template>
  <section
    id="skills"
    ref="sectionRef"
    class="px-section techstack-section relative py-16 md:py-24 min-h-screen flex items-center overflow-hidden">

    <!-- Parallax background -->
    <ParallaxStage :layers="pxLayers" />

    <!-- Dark overlay -->
    <div class="absolute inset-0 bg-[#0a0f1a]/70 z-0 pointer-events-none"></div>

    <!-- Content -->
    <div class="px-content relative z-10 w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-12 flex flex-col items-center">

      <!-- Header -->
      <div ref="headerRef" class="techstack-header text-center mb-12 md:mb-16">
        <p class="text-[10px] font-mono uppercase tracking-[0.28em] text-[#4E86C8] mb-3">Tech Stack</p>
        <h2 class="text-4xl sm:text-5xl lg:text-6xl font-oswald font-black text-[#F2F2F2] leading-[1.05] tracking-tight">
          A robust
          <span class="text-[#2A5FE0] italic font-serif font-light lowercase text-5xl sm:text-6xl lg:text-7xl relative z-10">
            arsenal
          </span>
          of modern tech.
        </h2>
      </div>

      <!-- Main content: 3 columns on desktop -->
      <div class="techstack-layout">
        <!-- Left HUD -->
        <div ref="hudLeftRef" class="techstack-layout__left">
          <TechCoreHud :active-face="activeFace" @select-category="onSelectCategory" />
        </div>

        <!-- Center: 3D Canvas -->
        <div ref="canvasRef" class="techstack-layout__center">
          <TechCore3D
            ref="core3dRef"
            :active-index="activeFace"
            :paused="isPaused"
            @face-change="onFaceChange"
            @ready="onCoreReady" />
        </div>

        <!-- Right: Detail (shown on xl) -->
        <div ref="hudRightRef" class="techstack-layout__right">
          <!-- Detail content managed by TechCoreHud internally -->
        </div>
      </div>

      <!-- Hint -->
      <p ref="hintRef" class="techstack-hint mt-8 text-center">
        <span class="techstack-hint__key">← →</span> navigate
        <span class="techstack-hint__sep">·</span>
        <span class="techstack-hint__key">drag</span> rotate
        <span class="techstack-hint__sep">·</span>
        <span class="techstack-hint__key">click</span> select face
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import ParallaxStage from "../ParallaxStage.vue"
import { useParallax } from "../../utils/useParallax.js"
import TechCore3D from "./TechCore3D.vue"
import TechCoreHud from "./TechCoreHud.vue"
import { categories, totalTechnologies, totalCategories } from "./techStackData.js"

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref(null)
const headerRef = ref(null)
const canvasRef = ref(null)
const hudLeftRef = ref(null)
const hudRightRef = ref(null)
const hintRef = ref(null)
const core3dRef = ref(null)

// State
const activeFace = ref(-1)
const isPaused = ref(false)
const isCoreReady = ref(false)

// Parallax layers
const pxLayers = [
  { file: "/parallax-v2/05-tech-stack/tech-l1-backdrop.webp", mobile: "/parallax-v2/05-tech-stack/tech-l1-backdrop.webp", speed: 0.03, scale: 1.02 },
  { file: "/parallax-v2/05-tech-stack/tech-l2-far.webp", mobile: "/parallax-v2/05-tech-stack/tech-l2-far.webp", speed: 0.10, scale: 1.03 },
  { file: "/parallax-v2/05-tech-stack/tech-l3-mid.webp", mobile: "/parallax-v2/05-tech-stack/tech-l3-mid.webp", speed: 0.20, scale: 1.05 },
  { file: "/parallax-v2/05-tech-stack/tech-l4-near.webp", mobile: "/parallax-v2/05-tech-stack/tech-l4-near.webp", speed: 0.34, scale: 1.08 },
  { file: "/parallax-v2/05-tech-stack/tech-l5-foreground.webp", mobile: "/parallax-v2/05-tech-stack/tech-l5-foreground.webp", speed: 0.55, scale: 1.12 },
  { file: "/parallax-v2/shared/overlay-hex-mesh.webp", speed: 0.07, blend: "is-overlay" },
  { file: "/parallax-v2/shared/overlay-grain.webp", speed: 0, blend: "is-grain" },
  { file: "/parallax-v2/shared/overlay-fade-top.webp", speed: 0, blend: "is-grade" },
  { file: "/parallax-v2/shared/overlay-fade-bottom.webp", speed: 0, blend: "is-grade" },
]

useParallax(sectionRef, { scrub: 2, travelMul: 46, zoomMul: 0.16 })

// Handlers
function onFaceChange(idx) {
  activeFace.value = idx
}

function onSelectCategory(faceIdx) {
  if (core3dRef.value) {
    core3dRef.value.rotateToFace(faceIdx)
  }
}

function onCoreReady() {
  isCoreReady.value = true
}

// Watchdog: force visible after 2.5s
let watchdogTimer = null
onMounted(() => {
  watchdogTimer = setTimeout(() => {
    if (sectionRef.value && sectionRef.value.offsetHeight > 0) {
      sectionRef.value.classList.add("is-static")
    }
  }, 2500)
})

// ScrollTrigger animations
let ctx = null

onMounted(() => {
  if (!sectionRef.value) return

  ctx = gsap.context(() => {
    // Header entrance
    gsap.from(headerRef.value, {
      y: 40,
      opacity: 0,
      scale: 0.94,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.value, start: "top 85%", once: true },
    })

    // Canvas entrance
    gsap.from(canvasRef.value, {
      scale: 0.6,
      opacity: 0,
      rotation: 720,
      duration: 1.4,
      ease: "power2.out",
      scrollTrigger: { trigger: sectionRef.value, start: "top 80%", once: true },
    })

    // HUD left
    gsap.from(hudLeftRef.value, {
      xPercent: -6,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.value, start: "top 75%", once: true },
    })

    // Hint
    gsap.from(hintRef.value, {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.value, start: "top 70%", once: true },
    })

    // Dolly on scroll
    ScrollTrigger.create({
      trigger: sectionRef.value,
      start: "top bottom",
      end: "bottom top",
      scrub: 1.5,
      onUpdate: (self) => {
        // Camera dolly effect handled in useTechCore
      },
    })
  }, sectionRef.value)

  // Refresh after images load
  if (document.readyState === "complete") {
    ScrollTrigger.refresh()
  } else {
    window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true })
  }
})

onBeforeUnmount(() => {
  if (watchdogTimer) clearTimeout(watchdogTimer)
  if (ctx) ctx.revert()
})
</script>

<style>
/* Layout */
.techstack-layout {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  max-width: 1200px;
}

@media (min-width: 1280px) {
  .techstack-layout {
    display: grid;
    grid-template-columns: 240px 1fr 280px;
    gap: 32px;
    align-items: start;
  }
}

.techstack-layout__left {
  order: 2;
}

@media (min-width: 1280px) {
  .techstack-layout__left { order: 1; }
}

.techstack-layout__center {
  order: 1;
  display: flex;
  justify-content: center;
}

@media (min-width: 1280px) {
  .techstack-layout__center { order: 2; }
}

.techstack-layout__right {
  order: 3;
}

@media (min-width: 1280px) {
  .techstack-layout__right { order: 3; }
}

/* Hint */
.techstack-hint {
  font: 400 10px/1 ui-monospace, SFMono-Regular, monospace;
  color: #8FA2BD;
  letter-spacing: 0.08em;
}

.techstack-hint__key {
  color: #DCE4F0;
  padding: 2px 6px;
  background: rgba(19, 28, 48, 0.8);
  border: 1px solid rgba(27, 37, 64, 0.8);
  border-radius: 4px;
}

.techstack-hint__sep {
  margin: 0 8px;
  color: #4E86C8;
}

/* Static fallback */
.techstack-section.is-static .techstack-layout__center {
  opacity: 1 !important;
  transform: none !important;
}
</style>
