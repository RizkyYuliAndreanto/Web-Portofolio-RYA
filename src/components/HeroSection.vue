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

// Sidebar mini-nav — panah + garis jadi navigasi section fungsional
const navSections = [
  { id: "about", label: "About Me" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
];
const activeSection = ref("about");

function jumpSection(dir) {
  const idx = navSections.findIndex((s) => s.id === activeSection.value);
  const next = navSections[Math.min(navSections.length - 1, Math.max(0, idx + dir))];
  document.getElementById(next.id)?.scrollIntoView({ behavior: "smooth" });
}

function goToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

let sectionObserver = null;

onUnmounted(() => {
  sectionObserver?.disconnect();
});

// v2 layer config — max 2 overlays per section
const layers = [
  { file: "/parallax-v2/01-hero/hero-l1-backdrop.webp",  mobile: "/parallax/assets-mobile/01-hero/hero-l1-backdrop.webp", speed: 0.03, scale: 1.02 },
  { file: "/parallax-v2/01-hero/hero-l2-far.webp",        mobile: "/parallax/assets-mobile/01-hero/hero-l2-far.webp",        speed: 0.10, scale: 1.03 },
  { file: "/parallax-v2/01-hero/hero-l3-mid.webp",        mobile: "/parallax/assets-mobile/01-hero/hero-l3-mid.webp",        speed: 0.20, scale: 1.05, blend: "is-overlay" },
  { file: "/parallax-v2/01-hero/hero-l4-near.webp",       mobile: "/parallax/assets-mobile/01-hero/hero-l4-near.webp",       speed: 0.34, scale: 1.08 },
  { file: "/parallax-v2/01-hero/hero-l5-foreground.webp", mobile: "/parallax/assets-mobile/01-hero/hero-l5-foreground.webp", speed: 0.55, scale: 1.12 },
  // Overlays — max 2 per v2 spec
  { file: "/parallax-v2/shared/overlay-light-rays.webp",  speed: 0.05, blend: "is-overlay" },
  { file: "/parallax-v2/shared/overlay-vignette-navy.webp", speed: 0, blend: "is-grade" },
  { file: "/parallax-v2/shared/overlay-grain.webp",         speed: 0, blend: "is-grain"  },
  { file: "/parallax-v2/shared/overlay-fade-bottom.webp",   speed: 0, blend: "is-grade"  },
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

  // Track scroll position untuk indikator garis (About / Services / Projects)
  sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) activeSection.value = entry.target.id;
      });
    },
    { rootMargin: "-40% 0px -40% 0px" }
  );
  navSections.forEach(({ id }) => {
    const el = document.getElementById(id);
    if (el) sectionObserver.observe(el);
  });

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
    // Drift pakai fromTo + immediateRender:false — start value EKSPLISIT (opacity 1),
    // bukan direkam saat refresh yang bisa jatuh di tengah entrance (opacity < 1).
    // Tanpa ini, scroll balik ke atas hanya pulih ke opacity yang terekam (mis. 0.1).
    gsap.fromTo(
      descRef.value,
      { yPercent: 0, opacity: 1 },
      {
        yPercent: -18, opacity: 0, ease: "none", immediateRender: false,
        scrollTrigger: { trigger: heroRef.value, start: "top top", end: "+=70%", scrub: 1.2 },
      },
    );
    gsap.fromTo(
      sidebarRef.value,
      { yPercent: 0, opacity: 1 },
      {
        yPercent: -20, opacity: 0, ease: "none", immediateRender: false,
        scrollTrigger: { trigger: heroRef.value, start: "top top", end: "+=80%", scrub: 1.2 },
      },
    );
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
        <div class="mb-10">
          <!-- SEO: H1 nama — identitas utama di area kiri yang lega (desktop only) -->
          <h1 class="hidden lg:block text-4xl xl:text-[3.4rem] font-black font-oswald text-text leading-[0.95] tracking-tight uppercase drop-shadow-2xl">
            Rizky Yuli<br /><span class="text-accent">Andreanto</span>
          </h1>
          <p class="text-[10px] tracking-[0.3em] font-oswald text-text-secondary uppercase mt-4">
            Software Engineer &amp; AI Engineer
          </p>
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
          <button
            @click="jumpSection(-1)"
            :disabled="activeSection === 'about'"
            aria-label="Previous section"
            class="p-1 text-text hover:text-accent disabled:opacity-20 disabled:hover:text-text transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            @click="jumpSection(1)"
            :disabled="activeSection === 'projects'"
            aria-label="Next section"
            class="p-1 text-text hover:text-accent disabled:opacity-20 disabled:hover:text-text transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
          <button
            v-for="section in navSections"
            :key="section.id"
            @click="goToSection(section.id)"
            :aria-label="`Go to ${section.label}`"
            :title="section.label"
            class="ml-2 first:ml-2 w-8 h-0.5 transition-all duration-300 cursor-pointer"
            :class="activeSection === section.id ? 'bg-accent opacity-100 scale-x-110' : 'bg-text opacity-20 hover:opacity-60'">
          </button>
        </div>
      </div>

      <!-- Center / Right area -->
      <div class="relative w-full lg:w-3/4 flex-grow flex justify-center lg:justify-end items-end h-screen px-4 lg:px-0">

        <!-- Big typography overlay -->
        <div
          ref="typoRef"
          class="absolute top-1/2 lg:top-1/3 -translate-y-1/2 left-0 right-0 lg:left-auto lg:-translate-y-0 flex flex-col justify-center items-center lg:items-end lg:pr-12 xl:pr-24 z-30 pointer-events-none">
          <div class="text-center lg:text-right font-oswald drop-shadow-2xl">
            <!-- SEO fallback (mobile): H1 nama tetap ada karena sidebar kiri hidden —
                 disembunyikan secara visual via sr-only agar layout desktop tidak ganda. -->
            <h1 class="sr-only lg:hidden">Rizky Yuli Andreanto</h1>
            <p class="text-[3.5rem] sm:text-6xl md:text-7xl lg:text-[7rem] xl:text-[8rem] font-bold text-text leading-[0.9] tracking-tighter uppercase m-0">
              <span class="block overflow-hidden"><span class="block text-line">THE BEST FOR</span></span>
              <span class="block overflow-hidden"><span class="block text-line">ALL YOUR</span></span>
              <span class="block overflow-hidden"><span class="block text-line text-accent">SOFTWARE</span></span>
              <span class="block overflow-hidden"><span class="block text-line">NEEDS</span></span>
            </p>
          </div>
        </div>

        <!-- Portrait photo -->
        <div
          ref="photoRef"
          class="absolute bottom-0 left-1/2 lg:left-[45%] -translate-x-1/2 lg:-translate-x-1/2 w-[90%] sm:w-[70%] md:w-[60%] lg:w-[65%] xl:w-[55%] h-[75vh] lg:h-[95vh] z-20">
          <img
            src="../assets/HERO-NO-BG.webp"
            alt="Rizky Yuli Andreanto"
            class="w-full h-full object-cover object-top lg:object-contain lg:object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]" />
        </div>

        <!-- Subtitle description -->
        <div
          ref="descRef"
          class="absolute bottom-8 lg:bottom-16 right-6 lg:right-12 xl:right-24 max-w-[280px] lg:max-w-sm text-right z-30">
          <p class="text-xs lg:text-sm text-text-secondary uppercase tracking-[0.2em] leading-loose font-oswald">
            RIZKY YULI ANDREANTO — SOFTWARE ENGINEER &amp; AI ENGINEER. BUILDING
            SCALABLE SYSTEMS AND INNOVATIVE DIGITAL SOLUTIONS WITH CUTTING-EDGE
            AI TECHNOLOGY.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
