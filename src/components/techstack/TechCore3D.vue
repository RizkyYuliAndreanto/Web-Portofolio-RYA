<template>
  <div ref="containerRef" class="tech-core-wrapper">
    <!-- CSS 3D Cube -->
    <div class="cube-scene" ref="sceneRef">
      <div class="cube" :class="{ 'is-spinning': isAutoRotating }" :style="cubeTransform">
        <!-- Face 0: Core Languages -->
        <div class="cube__face cube__face--front">
          <div class="face-header" :style="{ borderColor: categories[0].color }">
            <span class="face-title" :style="{ color: categories[0].color }">CORE LANGUAGES</span>
          </div>
          <div class="face-grid">
            <div v-for="item in categories[0].items" :key="item.name" class="face-chip">
              <img :src="item.icon" :alt="item.name" class="face-chip__icon" />
              <span class="face-chip__name" :style="{ color: item.color }">{{ item.short }}</span>
            </div>
          </div>
        </div>

        <!-- Face 1: Frontend & UI -->
        <div class="cube__face cube__face--back">
          <div class="face-header" :style="{ borderColor: categories[1].color }">
            <span class="face-title" :style="{ color: categories[1].color }">FRONTEND & UI</span>
          </div>
          <div class="face-grid">
            <div v-for="item in categories[1].items" :key="item.name" class="face-chip">
              <img :src="item.icon" :alt="item.name" class="face-chip__icon" />
              <span class="face-chip__name" :style="{ color: item.color }">{{ item.short }}</span>
            </div>
          </div>
        </div>

        <!-- Face 2: Backend & API -->
        <div class="cube__face cube__face--right">
          <div class="face-header" :style="{ borderColor: categories[2].color }">
            <span class="face-title" :style="{ color: categories[2].color }">BACKEND & API</span>
          </div>
          <div class="face-grid">
            <div v-for="item in categories[2].items" :key="item.name" class="face-chip">
              <img :src="item.icon" :alt="item.name" class="face-chip__icon" />
              <span class="face-chip__name" :style="{ color: item.color }">{{ item.short }}</span>
            </div>
          </div>
        </div>

        <!-- Face 3: Database -->
        <div class="cube__face cube__face--left">
          <div class="face-header" :style="{ borderColor: categories[3].color }">
            <span class="face-title" :style="{ color: categories[3].color }">DATABASE</span>
          </div>
          <div class="face-grid">
            <div v-for="item in categories[3].items" :key="item.name" class="face-chip">
              <img :src="item.icon" :alt="item.name" class="face-chip__icon" />
              <span class="face-chip__name" :style="{ color: item.color }">{{ item.short }}</span>
            </div>
          </div>
        </div>

        <!-- Face 4: Tools & DevOps -->
        <div class="cube__face cube__face--top">
          <div class="face-header" :style="{ borderColor: categories[4].color }">
            <span class="face-title" :style="{ color: categories[4].color }">TOOLS & DEVOPS</span>
          </div>
          <div class="face-grid">
            <div v-for="item in categories[4].items" :key="item.name" class="face-chip">
              <img :src="item.icon" :alt="item.name" class="face-chip__icon" />
              <span class="face-chip__name" :style="{ color: item.color }">{{ item.short }}</span>
            </div>
          </div>
        </div>

        <!-- Face 5: Identity -->
        <div class="cube__face cube__face--bottom">
          <div class="face-identity">
            <span class="identity-monogram">RYA</span>
            <span class="identity-name">Rizky Yuli Andreanto</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Orbit rings -->
    <div class="orbit-rings">
      <div class="orbit-ring orbit-ring--1"></div>
      <div class="orbit-ring orbit-ring--2"></div>
    </div>

    <!-- Particles -->
    <div class="particles">
      <div v-for="i in 40" :key="i" class="particle" :style="particleStyle(i)"></div>
    </div>

    <!-- Badge -->
    <div class="tech-badge">{{ totalTech }} technologies / {{ totalCat }} domains</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from "vue"
import { categories, identityFace, totalTechnologies, totalCategories } from "./techStackData.js"

const props = defineProps({
  activeIndex: { type: Number, default: -1 },
  paused: { type: Boolean, default: false },
})

const emit = defineEmits(["face-change", "logo-hover", "ready"])

const containerRef = ref(null)
const sceneRef = ref(null)
const totalTech = totalTechnologies
const totalCat = totalCategories

// Rotation state
const rotateX = ref(-15)
const rotateY = ref(25)
const isAutoRotating = ref(true)
const isDragging = ref(false)
let autoRotateInterval = null
let lastInteraction = 0
let startX = 0
let startY = 0
let currentRotateX = -15
let currentRotateY = 25

// Face mapping
const faceMap = [0, 180, -90, 90, -90, 90]

// Computed cube transform
const cubeTransform = computed(() => ({
  transform: `rotateX(${rotateX.value}deg) rotateY(${rotateY.value}deg)`,
}))

// Particle style
function particleStyle(i) {
  const x = Math.random() * 100
  const y = Math.random() * 100
  const size = 1 + Math.random() * 2
  const delay = Math.random() * 5
  const duration = 3 + Math.random() * 4
  return {
    left: `${x}%`,
    top: `${y}%`,
    width: `${size}px`,
    height: `${size}px`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
  }
}

// Rotate to face
function rotateToFace(faceIndex) {
  if (faceIndex < 0 || faceIndex > 5) return
  isAutoRotating.value = false
  lastInteraction = Date.now()

  const targetY = faceMap[faceIndex]
  const targetX = faceIndex === 4 ? -90 : faceIndex === 5 ? 90 : -15

  // Animate with GSAP
  if (window.gsap) {
    window.gsap.to(rotateX, { value: targetX, duration: 0.9, ease: "power3.inOut" })
    window.gsap.to(rotateY, {
      value: targetY,
      duration: 0.9,
      ease: "power3.inOut",
      onComplete: () => {
        emit("face-change", faceIndex)
        setTimeout(() => { isAutoRotating.value = true }, 3000)
      },
    })
  } else {
    rotateX.value = targetX
    rotateY.value = targetY
    emit("face-change", faceIndex)
    setTimeout(() => { isAutoRotating.value = true }, 3000)
  }
}

// Drag handlers
function onPointerDown(e) {
  isDragging.value = true
  isAutoRotating.value = false
  startX = e.clientX || e.touches?.[0]?.clientX || 0
  startY = e.clientY || e.touches?.[0]?.clientY || 0
  currentRotateX = rotateX.value
  currentRotateY = rotateY.value
  lastInteraction = Date.now()
  e.preventDefault()
}

function onPointerMove(e) {
  if (!isDragging.value) return
  const x = e.clientX || e.touches?.[0]?.clientX || 0
  const y = e.clientY || e.touches?.[0]?.clientY || 0
  const deltaX = (x - startX) * 0.5
  const deltaY = (y - startY) * 0.5
  rotateY.value = currentRotateY + deltaX
  rotateX.value = Math.max(-60, Math.min(60, currentRotateX - deltaY))
}

function onPointerUp() {
  isDragging.value = false
  lastInteraction = Date.now()
  // Resume auto-rotate after 3s
  setTimeout(() => {
    if (Date.now() - lastInteraction >= 2900) {
      isAutoRotating.value = true
    }
  }, 3000)
}

// Keyboard
function onKeyDown(e) {
  if (!containerRef.value) return
  const currentFace = getCurrentFace()
  switch (e.key) {
    case "ArrowRight":
      rotateToFace((currentFace + 1) % 6)
      break
    case "ArrowLeft":
      rotateToFace((currentFace + 5) % 6)
      break
  }
}

function getCurrentFace() {
  // Determine which face is most visible based on rotation
  const y = ((rotateY.value % 360) + 360) % 360
  if (y >= 315 || y < 45) return 0
  if (y >= 45 && y < 135) return 2
  if (y >= 135 && y < 225) return 1
  return 3
}

// Watch activeIndex
watch(() => props.activeIndex, (val) => {
  if (val >= 0) rotateToFace(val)
})

// Lifecycle
onMounted(() => {
  const el = containerRef.value
  if (!el) return

  el.addEventListener("pointerdown", onPointerDown)
  window.addEventListener("pointermove", onPointerMove)
  window.addEventListener("pointerup", onPointerUp)
  el.addEventListener("touchstart", onPointerDown, { passive: false })
  window.addEventListener("touchmove", onPointerMove, { passive: false })
  window.addEventListener("touchend", onPointerUp)
  window.addEventListener("keydown", onKeyDown)

  emit("ready")
})

onBeforeUnmount(() => {
  const el = containerRef.value
  if (el) {
    el.removeEventListener("pointerdown", onPointerDown)
    el.removeEventListener("touchstart", onPointerDown)
  }
  window.removeEventListener("pointermove", onPointerMove)
  window.removeEventListener("pointerup", onPointerUp)
  window.removeEventListener("touchmove", onPointerMove)
  window.removeEventListener("touchend", onPointerUp)
  window.removeEventListener("keydown", onKeyDown)
})

defineExpose({ rotateToFace })
</script>

<style>
.tech-core-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  max-width: 560px;
  min-height: 400px;
  margin: 0 auto;
  perspective: 1200px;
  cursor: grab;
  user-select: none;
}

.tech-core-wrapper:active {
  cursor: grabbing;
}

.cube-scene {
  width: 280px;
  height: 280px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  perspective: 1200px;
}

.cube {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.05s linear;
}

.cube.is-spinning {
  animation: cube-auto-rotate 20s linear infinite;
}

@keyframes cube-auto-rotate {
  from { transform: rotateX(-15deg) rotateY(0deg); }
  to { transform: rotateX(-15deg) rotateY(360deg); }
}

.cube__face {
  position: absolute;
  width: 280px;
  height: 280px;
  background: linear-gradient(135deg, #131C30 0%, #0E1522 100%);
  border: 2px solid #1B2540;
  border-radius: 12px;
  padding: 16px;
  box-sizing: border-box;
  backface-visibility: visible;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.cube__face--front  { transform: translateZ(140px); }
.cube__face--back   { transform: rotateY(180deg) translateZ(140px); }
.cube__face--right  { transform: rotateY(90deg) translateZ(140px); }
.cube__face--left   { transform: rotateY(-90deg) translateZ(140px); }
.cube__face--top    { transform: rotateX(90deg) translateZ(140px); }
.cube__face--bottom { transform: rotateX(-90deg) translateZ(140px); }

.face-header {
  border-left: 3px solid;
  padding-left: 10px;
  margin-bottom: 12px;
}

.face-title {
  font: 700 11px/1 monospace;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.face-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  flex: 1;
}

.face-chip {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 6px 4px;
  background: rgba(14, 21, 34, 0.8);
  border: 1px solid rgba(27, 37, 64, 0.8);
  border-radius: 6px;
  transition: transform 0.2s, background 0.2s;
}

.face-chip:hover {
  background: rgba(42, 95, 224, 0.15);
  transform: scale(1.05);
}

.face-chip__icon {
  width: 28px;
  height: 28px;
  object-fit: contain;
  border-radius: 4px;
}

.face-chip__name {
  font: 600 8px/1 monospace;
  letter-spacing: 0.08em;
}

/* Identity face */
.face-identity {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 12px;
}

.identity-monogram {
  font: 900 64px/1 monospace;
  color: #2A5FE0;
  text-shadow: 0 0 40px rgba(42, 95, 224, 0.3);
}

.identity-name {
  font: 400 12px/1 monospace;
  color: #8FA2BD;
  letter-spacing: 0.1em;
}

/* Orbit rings */
.orbit-rings {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.orbit-ring {
  position: absolute;
  border: 1px solid rgba(78, 134, 200, 0.15);
  border-radius: 50%;
  animation: orbit-spin linear infinite;
}

.orbit-ring--1 {
  width: 400px;
  height: 400px;
  top: -200px;
  left: -200px;
  transform: rotateX(70deg) rotateZ(0deg);
  animation-duration: 15s;
}

.orbit-ring--2 {
  width: 450px;
  height: 450px;
  top: -225px;
  left: -225px;
  transform: rotateX(70deg) rotateZ(60deg);
  animation-duration: 25s;
  animation-direction: reverse;
}

@keyframes orbit-spin {
  from { transform: rotateX(70deg) rotateZ(0deg); }
  to { transform: rotateX(70deg) rotateZ(360deg); }
}

/* Particles */
.particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.particle {
  position: absolute;
  background: #4E86C8;
  border-radius: 50%;
  opacity: 0.15;
  animation: particle-drift linear infinite;
}

@keyframes particle-drift {
  0%, 100% { transform: translateY(0) translateX(0); opacity: 0.1; }
  50% { transform: translateY(-20px) translateX(10px); opacity: 0.25; }
}

/* Badge */
.tech-badge {
  position: absolute;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  font: 600 10px/1 monospace;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #8FA2BD;
  background: rgba(13, 21, 34, 0.85);
  padding: 6px 14px;
  border-radius: 20px;
  border: 1px solid rgba(78, 134, 200, 0.2);
  white-space: nowrap;
  z-index: 10;
}
</style>
