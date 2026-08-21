<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParallaxStage from "./ParallaxStage.vue";
import { useParallax } from "../utils/useParallax.js";

gsap.registerPlugin(ScrollTrigger);

const heroRef = ref(null);
const photoRef = ref(null);
const typoRef = ref(null);
const sidebarRef = ref(null);
const descRef = ref(null);

// v2 layer config — max 2 overlays per section
const layers = [
  { file: "/parallax-v2/01-hero/hero-l1-backdrop.jpg",  mobile: "/parallax-v2/01-hero/hero-l1-backdrop.png", speed: 0.03, scale: 1.02 },
  { file: "/parallax-v2/01-hero/hero-l2-far.png",        mobile: "/parallax-v2/01-hero/hero-l2-far.png",        speed: 0.10, scale: 1.03 },
  { file: "/parallax-v2/01-hero/hero-l3-mid.png",        mobile: "/parallax-v2/01-hero/hero-l3-mid.png",        speed: 0.20, scale: 1.05, blend: "is-overlay" },
  { file: "/parallax-v2/01-hero/hero-l4-near.png",       mobile: "/parallax-v2/01-hero/hero-l4-near.png",       speed: 0.34, scale: 1.08 },
  { file: "/parallax-v2/01-hero/hero-l5-foreground.png", mobile: "/parallax-v2/01-hero/hero-l5-foreground.png", speed: 0.55, scale: 1.12 },
  // Overlays — max 2 per v2 spec
  { file: "/parallax-v2/shared/overlay-light-rays.png",  speed: 0.05, blend: "is-overlay" },
  { file: "/parallax-v2/shared/overlay-vignette-navy.png", speed: 0, blend: "is-grade" },
  { file: "/parallax-v2/shared/overlay-grain.png",         speed: 0, blend: "is-grain"  },
  { file: "/parallax-v2/shared/overlay-fade-bottom.png",   speed: 0, blend: "is-grade"  },
];

// Hero uses Firewatch-style PINNING — section stays while layers animate
// pin:true + pinEnd:'+=110%' means user scrolls 1.1× viewport to pass the hero
useParallax(heroRef, {
  pin: true,
  pinEnd: '+=110%',
  scrub: 1.4,       // responsive inertia — feels smooth without lag
  travelMul: 45,    // natural layer travel
  zoomMul: 0.14,    // subtle zoom-in on deeper layers
  mouseMul: 40,
});

let ctx = null;

onUnmounted(() => {
  if (ctx) ctx.revert();
});

onMounted(() => {
  if (!heroRef.value) return;

  ctx = gsap.context(() => {
    const tl = gsap.timeline();

    // Entrance animations (GSAP handles content, useParallax handles layers)
    tl.from(photoRef.value, {
      y: "100%",
      opacity: 0,
      duration: 1.5,
      ease: "power4.out",
    })
      .from(
        ".text-line",
        { y: "100%", duration: 1.2, stagger: 0.1, ease: "power4.out" },
        "-=1",
      )
      .from(
        sidebarRef.value,
        { x: -50, opacity: 0, duration: 1, ease: "power3.out" },
        "-=0.8",
      )
      .from(
        descRef.value,
        { y: 30, opacity: 0, duration: 1, ease: "power3.out" },
        "-=0.8",
      );

    // Content drift synced to the pinned hero's scroll duration (110% of viewport)
    gsap.to(typoRef.value, {
      yPercent: -15, opacity: 0.3, ease: "none",
      scrollTrigger: { trigger: heroRef.value, start: "top top", end: "+=110%", scrub: 1.4 },
    });
    gsap.to(descRef.value, {
      yPercent: -18, opacity: 0, ease: "none",
      scrollTrigger: { trigger: heroRef.value, start: "top top", end: "+=70%", scrub: 1.2 },
    });
  }, heroRef.value);
});
</script>

<template>
  <section
    id="hero"
    ref="heroRef"
    class="px-section flex flex-col lg:flex-row pt-16 lg:pt-0">

    <!-- v2 Parallax Stage -->
    <ParallaxStage :layers="layers" />

    <!-- Content -->
    <div class="relative z-10 w-full h-full min-h-dvh flex flex-col lg:flex-row px-content--strong-scrim">

      <!-- Left sidebar nav -->
      <div
        ref="sidebarRef"
        class="hidden lg:flex flex-col justify-center w-1/4 pl-12 gap-6 z-30">
        <div class="hero-label text-xs tracking-widest font-bold text-text-secondary mb-8">
          RIZKY YULI ANDREANTO
        </div>
        <nav class="flex flex-col gap-12 relative mt-4">
          <a
            href="#about"
            class="hero-link text-2xl font-bold font-oswald text-text opacity-70 hover:opacity-100 transition-opacity tracking-wider uppercase"
            >ABOUT ME</a>
          <div class="hero-link-active relative w-max">
            <div class="absolute -inset-4 bg-gradient-to-r from-accent/20 to-transparent -z-10 blur-md rounded-lg"></div>
            <a
              href="#skills"
              class="text-[2rem] font-bold font-oswald text-text tracking-wider uppercase relative drop-shadow-[0_0_8px_rgba(78,134,200,0.5)]"
              >TECH STACK</a>
            <div class="absolute -left-12 top-1/2 -translate-y-1/2 w-8 h-[3px] bg-accent"></div>
          </div>
        </nav>
        <div class="hero-controls flex gap-2 mt-20 items-center">
          <button class="p-1 hover:text-accent transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button class="p-1 hover:text-accent transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
          <div class="w-8 h-0.5 bg-text opacity-50 ml-2"></div>
          <div class="w-8 h-0.5 bg-text opacity-20 hover:opacity-100 transition-opacity cursor-pointer"></div>
          <div class="w-8 h-0.5 bg-text opacity-20 hover:opacity-100 transition-opacity cursor-pointer"></div>
        </div>
      </div>

      <!-- Center / Right area -->
      <div class="relative w-full lg:w-3/4 flex-grow flex justify-center lg:justify-end items-end h-screen px-4 lg:px-0">

        <!-- Big typography overlay -->
        <div
          ref="typoRef"
          class="absolute top-1/2 lg:top-1/3 -translate-y-1/2 left-0 right-0 lg:left-auto lg:-translate-y-0 flex flex-col justify-center items-center lg:items-end lg:pr-12 xl:pr-24 z-30 pointer-events-none">
          <div class="text-center lg:text-right font-oswald drop-shadow-2xl">
            <h1 class="text-[3.5rem] sm:text-6xl md:text-7xl lg:text-[7rem] xl:text-[8rem] font-bold text-text leading-[0.9] tracking-tighter uppercase">
              <span class="block overflow-hidden"><span class="block text-line">THE BEST FOR</span></span>
              <span class="block overflow-hidden"><span class="block text-line">ALL YOUR</span></span>
              <span class="block overflow-hidden"><span class="block text-line text-accent">SOFTWARE</span></span>
              <span class="block overflow-hidden"><span class="block text-line">NEEDS</span></span>
            </h1>
          </div>
        </div>

        <!-- Portrait photo -->
        <div
          ref="photoRef"
          class="absolute bottom-0 left-1/2 lg:left-[45%] -translate-x-1/2 lg:-translate-x-1/2 w-[90%] sm:w-[70%] md:w-[60%] lg:w-[65%] xl:w-[55%] h-[75vh] lg:h-[95vh] z-20">
          <img
            src="../assets/HERO-NO-BG.png"
            alt="Rizky Yuli Andreanto"
            class="w-full h-full object-cover object-top lg:object-contain lg:object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]" />
        </div>

        <!-- Subtitle description -->
        <div
          ref="descRef"
          class="absolute bottom-8 lg:bottom-16 right-6 lg:right-12 xl:right-24 max-w-[280px] lg:max-w-sm text-right z-30">
          <p class="text-xs lg:text-sm text-text-secondary uppercase tracking-[0.2em] leading-loose font-oswald">
            CHOOSE ME TO BUILD YOUR SCALABLE SYSTEMS AND INNOVATIVE DIGITAL
            SOLUTIONS WITH CUTTING-EDGE AI TECHNOLOGY.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
