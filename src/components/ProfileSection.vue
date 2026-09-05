<script setup>
import { ref, computed, onMounted, onUnmounted, onBeforeUpdate } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParallaxStage from "./ParallaxStage.vue";
import { useParallax } from "../utils/useParallax.js";

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);

// v2 02-profile layers — overlay vignette dinonaktifkan (global .px-section sudah handle fallback)
const pxLayers = [
  { file: "/parallax-v2/02-profile/profile-l1-backdrop.webp", mobile: "/parallax-v2/02-profile/profile-l1-backdrop.webp", speed: 0.03, scale: 1.02 },
  { file: "/parallax-v2/02-profile/profile-l2-far.webp",        mobile: "/parallax-v2/02-profile/profile-l2-far.webp",        speed: 0.10, scale: 1.03 },
  { file: "/parallax-v2/02-profile/profile-l3-mid.webp",        mobile: "/parallax-v2/02-profile/profile-l3-mid.webp",        speed: 0.20, scale: 1.05 },
  { file: "/parallax-v2/02-profile/profile-l4-near.webp",       mobile: "/parallax-v2/02-profile/profile-l4-near.webp",       speed: 0.34, scale: 1.08 },
  { file: "/parallax-v2/02-profile/profile-l5-foreground.webp", mobile: "/parallax-v2/02-profile/profile-l5-foreground.webp", speed: 0.55, scale: 1.12 },
  { file: "/parallax-v2/shared/overlay-glow-blue.webp",          speed: 0.04, blend: "is-overlay" },
  // overlay-vignette-navy dihapus — menyebabkan halaman terlalu gelap
  { file: "/parallax-v2/shared/overlay-grain.webp",              speed: 0,    blend: "is-grain"   },
  { file: "/parallax-v2/shared/overlay-fade-top.webp",           speed: 0,    blend: "is-grade"   },
  { file: "/parallax-v2/shared/overlay-fade-bottom.webp",        speed: 0,    blend: "is-grade"   },
];

useParallax(sectionRef, { scrub: 2, travelMul: 45, zoomMul: 0.16 });

const bgTextRef = ref(null);
const accentStripRef = ref(null);

// Array refs - pakai let biasa, bukan ref()
let photoContainerEls = [];
let leftColEls = [];
let rightColEls = [];
let stat1Els = [];
let stat2Els = [];
let badgesEls = [];

onBeforeUpdate(() => {
  photoContainerEls = [];
  leftColEls = [];
  rightColEls = [];
  stat1Els = [];
  stat2Els = [];
  badgesEls = [];
});

function pushRef(bucket, el) {
  if (el && !bucket.includes(el)) bucket.push(el);
}

// Get visible elements (desktop or mobile)
const getVisible = (arr) => arr.find(el => el.offsetParent !== null) || arr[0];

const yearsCount = ref(0);
const projectsCount = ref(0);

const roles = ["SOFTWARE ENGINEER", "AI ENGINEER"];
const currentRoleIndex = ref(0);
let roleInterval = null;
let ctx = null;

onMounted(() => {
  if (!sectionRef.value) return;

  ctx = gsap.context(() => {
    // Role text cycling with 3D flip
    const bigBgTextElement = bgTextRef.value?.querySelector(".big-bg-text");
    roleInterval = setInterval(() => {
      if (!bigBgTextElement) return;
      gsap.to(bigBgTextElement, {
        opacity: 0,
        duration: 0.4,
        rotationX: 45,
        onComplete: () => {
          currentRoleIndex.value = (currentRoleIndex.value + 1) % roles.length;
          gsap.fromTo(
            bigBgTextElement,
            { rotationX: -30 },
            {
              opacity: 1,
              rotationX: 15,
              duration: 0.5,
              ease: "power2.out",
            },
          );
        },
      });
    }, 3000);

    // Counter animations
    ScrollTrigger.create({
      trigger: sectionRef.value,
      start: "top 70%",
      onEnter: () => {
        gsap.to(yearsCount, {
          value: 1,
          duration: 1.5,
          ease: "power2.out",
          snap: { value: 1 },
        });
        gsap.to(projectsCount, {
          value: 20,
          duration: 2,
          ease: "power2.out",
          snap: { value: 1 },
        });
      },
      once: true,
    });

    // === ENTRANCE ANIMATIONS ===

    // Photo entrance - scale up from center
    gsap.from(getVisible(photoContainerEls), {
      scale: 0.8,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: getVisible(photoContainerEls),
        start: "top 85%",
        once: true,
      },
    });

    // Left column - slide from left
    gsap.from(getVisible(leftColEls), {
      x: -80,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: getVisible(leftColEls),
        start: "top 85%",
        once: true,
      },
    });

    // Right column - slide from right
    gsap.from(getVisible(rightColEls), {
      x: 80,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: getVisible(rightColEls),
        start: "top 85%",
        once: true,
      },
    });

    // Stat circles - pop in with 3D rotation
    gsap.from(getVisible(stat1Els), {
      scale: 0,
      rotation: -180,
      opacity: 0,
      duration: 1.2,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: getVisible(stat1Els),
        start: "top 85%",
        once: true,
      },
    });

    gsap.from(getVisible(stat2Els), {
      scale: 0,
      rotation: 180,
      opacity: 0,
      duration: 1.2,
      delay: 0.2,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: getVisible(stat2Els),
        start: "top 85%",
        once: true,
      },
    });

    // Badges slide up
    gsap.from(getVisible(badgesEls), {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: getVisible(badgesEls),
        start: "top 90%",
        once: true,
      },
    });

    // === PARALLAX SCROLL ANIMATIONS (3D Depth Effect) ===

    // Background text - parallax 3D rotation saat scroll
    gsap.to(bgTextRef.value, {
      yPercent: -30,
      rotationX: 35,
      rotationY: -10,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    // Accent strip - bergerak sedikit lebih cepat + scale
    gsap.to(accentStripRef.value, {
      yPercent: -15,
      scaleY: 1.2,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    // Photo - bergerak medium, 3D tilt effect
    gsap.to(getVisible(photoContainerEls), {
      yPercent: -12,
      rotationX: 3,
      rotationY: -2,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    // Left column - bergerak agak cepat ke atas
    gsap.to(getVisible(leftColEls), {
      yPercent: -18,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    // Right column - bergerak lebih lambat dari left (asymmetric depth)
    gsap.to(getVisible(rightColEls), {
      yPercent: -8,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    // Stat circles - subtle 3D rotation saat scroll
    gsap.to(getVisible(stat1Els), {
      rotationY: 15,
      rotationX: -5,
      yPercent: -10,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(getVisible(stat2Els), {
      rotationY: -15,
      rotationX: 5,
      yPercent: -14,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    // Badges - micro parallax
    gsap.to(getVisible(badgesEls), {
      yPercent: -6,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, sectionRef.value);
});

onUnmounted(() => {
  if (roleInterval) clearInterval(roleInterval);
  if (ctx) ctx.revert();
});
</script>

<template>
  <section
    id="about"
    ref="sectionRef"
    class="px-section relative py-24 min-h-screen flex items-center">

    <!-- v2 Parallax Stage -->
    <ParallaxStage :layers="pxLayers" />
    <!-- Vertical Accent Strip -->
    <div
      ref="accentStripRef"
      class="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[25vw] max-w-[300px] bg-white/[0.02] z-0 pointer-events-none"></div>

    <!-- Big Background Typography - 3D -->
    <div
      ref="bgTextRef"
      class="absolute inset-x-0 top-[10%] lg:top-[5%] flex flex-col justify-start items-center overflow-x-clip pointer-events-none z-0"
      style="perspective: 800px">
      <h2
        class="big-bg-text text-[18vw] font-black font-oswald text-transparent whitespace-nowrap uppercase tracking-tighter leading-[0.9] select-none text-center bg-text-3d pt-[0.12em]"
        style="
          transform-style: preserve-3d;
          transform: rotateX(15deg) rotateY(-5deg);
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.15);
        ">
        <span
          class="block"
          style="
            text-shadow:
              0 1px 0 rgba(255, 255, 255, 0.1),
              0 2px 0 rgba(255, 255, 255, 0.08),
              0 3px 0 rgba(255, 255, 255, 0.06),
              0 4px 0 rgba(255, 255, 255, 0.04),
              0 5px 0 rgba(255, 255, 255, 0.02),
              0 10px 20px rgba(0, 0, 0, 0.4);
          "
          >{{ roles[currentRoleIndex].split(" ")[0] }}</span
        >
        <span
          class="block"
          style="
            text-shadow:
              0 1px 0 rgba(255, 255, 255, 0.1),
              0 2px 0 rgba(255, 255, 255, 0.08),
              0 3px 0 rgba(255, 255, 255, 0.06),
              0 4px 0 rgba(255, 255, 255, 0.04),
              0 5px 0 rgba(255, 255, 255, 0.02),
              0 10px 20px rgba(0, 0, 0, 0.4);
          "
          >{{ roles[currentRoleIndex].split(" ")[1] }}</span
        >
      </h2>
    </div>

    <!-- Center Content Container -->
    <div
      class="relative z-10 w-full max-w-7xl mx-auto px-6 mt-12 lg:mt-24"
      style="transform-style: preserve-3d">

      <!-- Desktop: 3-column layout -->
      <div class="hidden lg:grid lg:grid-cols-[1fr_420px_1fr] gap-10 items-center" style="transform-style: preserve-3d">
        <!-- Left Column: Description -->
        <div
          :ref="el => pushRef(leftColEls, el)"
          class="flex flex-col justify-center items-end text-right z-20"
          style="transform-style: preserve-3d">
          <p
            class="text-[10px] sm:text-xs text-text-secondary uppercase tracking-[0.2em] leading-relaxed mb-8 border-r-2 border-accent/50 pr-6 max-w-[280px] font-oswald">
            FULL-STACK SOFTWARE ENGINEER & CO-FOUNDER OF CLYROVA.ID — BUILDING
            AI-POWERED PRODUCTS FROM PIPELINE TO PRODUCTION.
          </p>
          <p
            class="text-[10px] sm:text-xs text-text-secondary uppercase tracking-[0.2em] leading-relaxed border-r-2 border-accent/50 pr-6 max-w-[280px] font-oswald">
            SPECIALIZED IN COMPUTER-VISION AI (FACE RECOGNITION, ANTI-SPOOFING,
            IMAGE PROCESSING) AND END-TO-END WEB PLATFORMS.
          </p>
          <a
            href="#contact"
            class="mt-10 ml-auto flex items-center gap-4 text-white uppercase font-oswald tracking-widest text-xs sm:text-sm border border-white/20 py-3 px-6 hover:bg-white/5 transition-colors">
            <span>Let's talk</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <div class="mt-10 border-r-2 border-accent/50 pr-6 max-w-[280px]">
            <h3 class="text-[10px] font-bold font-oswald tracking-[0.3em] text-accent uppercase mb-2">Education</h3>
            <p class="text-sm font-black font-oswald text-[#F2F2F2] uppercase tracking-wide">Universitas PGRI Madiun</p>
            <p class="text-[10px] font-oswald tracking-widest text-text-secondary uppercase mt-1">S.Kom. — Informatics Engineering · GPA 3.70/4.00</p>
            <p class="text-[9px] font-oswald tracking-[0.2em] text-text-secondary uppercase mt-1">SEP 2022 — JUL 2026 · MADIUN, INDONESIA</p>
          </div>
        </div>

        <!-- Center Column: Photo -->
        <div
          :ref="el => pushRef(photoContainerEls, el)"
          class="flex justify-center relative z-10"
          style="transform-style: preserve-3d">
          <div class="relative w-full h-auto flex justify-center items-end">
            <img
              src="../assets/HERO-NO-BG.webp"
              alt="Rizky Yuli Andreanto"
              class="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative z-10 -mb-16" />
          </div>
        </div>

        <!-- Right Column: Stats & Description -->
        <div
          :ref="el => pushRef(rightColEls, el)"
          class="flex flex-col justify-center items-start gap-6 text-left z-20"
          style="transform-style: preserve-3d">
          <div class="flex flex-col gap-5">
            <div class="flex items-center gap-5 group">
              <div
                :ref="el => pushRef(stat1Els, el)"
                class="flex-shrink-0 flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#E5E0D8] text-[#12182B] border-[6px] border-background z-20 shadow-2xl transition-transform duration-300 group-hover:scale-105"
                style="transform-style: preserve-3d">
                <span class="text-3xl md:text-4xl font-black font-oswald tracking-tighter leading-none pt-1">0{{ Math.round(yearsCount) }}</span>
              </div>
              <p class="text-[10px] sm:text-xs tracking-widest text-text-secondary uppercase font-bold leading-relaxed">Years of<br />Experience</p>
            </div>
            <div class="flex items-center gap-5 group">
              <div
                :ref="el => pushRef(stat2Els, el)"
                class="flex-shrink-0 flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#E5E0D8] text-[#12182B] border-[6px] border-background z-20 shadow-2xl transition-transform duration-300 group-hover:scale-105"
                style="transform-style: preserve-3d">
                <span class="text-2xl md:text-3xl font-black font-oswald tracking-tighter leading-none pt-1">{{ Math.round(projectsCount) }}+</span>
              </div>
              <p class="text-[10px] sm:text-xs tracking-widest text-text-secondary uppercase font-bold leading-relaxed">Projects<br />Completed</p>
            </div>
          </div>
          <p class="text-[10px] sm:text-xs text-text-secondary uppercase tracking-[0.2em] leading-relaxed mt-4 border-l-2 border-accent/50 pl-4 max-w-[280px] font-oswald">
            EXPERIENCED IN BUILDING EDGE-AI SYSTEMS, ESPECIALLY COMPUTER VISION — FACE RECOGNITION, ANTI-SPOOFING, AND REAL-TIME IMAGE PROCESSING.
            <br /><br />
            STRONG FULL-STACK FOUNDATION ACROSS FRONTEND, BACKEND, DATABASE, AND DEPLOYMENT — CAPABLE OF DELIVERING PRODUCTS END-TO-END.
          </p>
          <div :ref="el => pushRef(badgesEls, el)" class="flex flex-wrap gap-3 mt-2">
            <span class="px-4 py-1.5 rounded-full border border-white/20 text-[9px] font-oswald tracking-widest uppercase text-white/70">CO-FOUNDER CLYROVA.ID</span>
            <span class="px-4 py-1.5 rounded-full border border-white/20 text-[9px] font-oswald tracking-widest uppercase text-white/70">AI ENGINEER</span>
            <span class="px-4 py-1.5 rounded-full border border-white/20 text-[9px] font-oswald tracking-widest uppercase text-white/70">FULL-STACK DEV</span>
          </div>
        </div>
      </div>

      <!-- Mobile: stacked layout -->
      <div class="lg:hidden flex flex-col items-center gap-10">
        <div :ref="el => pushRef(photoContainerEls, el)" class="flex justify-center relative z-10 w-[280px] sm:w-[350px]">
          <img
            src="../assets/HERO-NO-BG.webp"
            alt="Rizky Yuli Andreanto"
            class="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative z-10" />
        </div>
        <div :ref="el => pushRef(leftColEls, el)" class="flex flex-col items-center text-center gap-6">
          <p class="text-[10px] sm:text-xs text-text-secondary uppercase tracking-[0.2em] leading-relaxed max-w-[280px] font-oswald">
            FULL-STACK SOFTWARE ENGINEER & CO-FOUNDER OF CLYROVA.ID — BUILDING AI-POWERED PRODUCTS FROM PIPELINE TO PRODUCTION.
          </p>
          <p class="text-[10px] sm:text-xs text-text-secondary uppercase tracking-[0.2em] leading-relaxed max-w-[280px] font-oswald">
            SPECIALIZED IN COMPUTER-VISION AI (FACE RECOGNITION, ANTI-SPOOFING, IMAGE PROCESSING) AND END-TO-END WEB PLATFORMS.
          </p>
          <a href="#contact" class="flex items-center gap-4 text-white uppercase font-oswald tracking-widest text-xs sm:text-sm border border-white/20 py-3 px-6 hover:bg-white/5 transition-colors">
            <span>Let's talk</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </a>
          <div class="mt-2 border border-white/10 rounded-lg p-4 max-w-[280px]">
            <h3 class="text-[10px] font-bold font-oswald tracking-[0.3em] text-accent uppercase mb-2">Education</h3>
            <p class="text-sm font-black font-oswald text-[#F2F2F2] uppercase tracking-wide">Universitas PGRI Madiun</p>
            <p class="text-[10px] font-oswald tracking-widest text-text-secondary uppercase mt-1">S.Kom. — Informatics Engineering · GPA 3.70/4.00</p>
            <p class="text-[9px] font-oswald tracking-[0.2em] text-text-secondary uppercase mt-1">SEP 2022 — JUL 2026 · MADIUN, INDONESIA</p>
          </div>
        </div>
        <div :ref="el => pushRef(rightColEls, el)" class="flex flex-col items-center gap-6">
          <div class="flex flex-col gap-5">
            <div class="flex items-center gap-5">
              <div :ref="el => pushRef(stat1Els, el)" class="flex-shrink-0 flex items-center justify-center w-20 h-20 rounded-full bg-[#E5E0D8] text-[#12182B] border-[6px] border-background z-20 shadow-2xl">
                <span class="text-3xl font-black font-oswald tracking-tighter leading-none pt-1">0{{ Math.round(yearsCount) }}</span>
              </div>
              <p class="text-[10px] sm:text-xs tracking-widest text-text-secondary uppercase font-bold leading-relaxed">Years of<br />Experience</p>
            </div>
            <div class="flex items-center gap-5">
              <div :ref="el => pushRef(stat2Els, el)" class="flex-shrink-0 flex items-center justify-center w-20 h-20 rounded-full bg-[#E5E0D8] text-[#12182B] border-[6px] border-background z-20 shadow-2xl">
                <span class="text-2xl font-black font-oswald tracking-tighter leading-none pt-1">{{ Math.round(projectsCount) }}+</span>
              </div>
              <p class="text-[10px] sm:text-xs tracking-widest text-text-secondary uppercase font-bold leading-relaxed">Projects<br />Completed</p>
            </div>
          </div>
          <p class="text-[10px] sm:text-xs text-text-secondary uppercase tracking-[0.2em] leading-relaxed max-w-[280px] text-center font-oswald">
            EXPERIENCED IN BUILDING EDGE-AI SYSTEMS, ESPECIALLY COMPUTER VISION — FACE RECOGNITION, ANTI-SPOOFING, AND REAL-TIME IMAGE PROCESSING.
            <br /><br />
            STRONG FULL-STACK FOUNDATION ACROSS FRONTEND, BACKEND, DATABASE, AND DEPLOYMENT — CAPABLE OF DELIVERING PRODUCTS END-TO-END.
          </p>
          <div :ref="el => pushRef(badgesEls, el)" class="flex flex-wrap justify-center gap-3">
            <span class="px-4 py-1.5 rounded-full border border-white/20 text-[9px] font-oswald tracking-widest uppercase text-white/70">CO-FOUNDER CLYROVA.ID</span>
            <span class="px-4 py-1.5 rounded-full border border-white/20 text-[9px] font-oswald tracking-widest uppercase text-white/70">AI ENGINEER</span>
            <span class="px-4 py-1.5 rounded-full border border-white/20 text-[9px] font-oswald tracking-widest uppercase text-white/70">FULL-STACK DEV</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.bg-text-3d {
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.18) 0%,
    rgba(255, 255, 255, 0.04) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3));
}
</style>
