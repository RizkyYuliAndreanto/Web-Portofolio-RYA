<script setup>
import { ref, onMounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParallaxStage from "./ParallaxStage.vue";
import { useParallax } from "../utils/useParallax.js";

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);

// v2 06-experience layers
const pxLayers = [
  { file: "/parallax-v2/06-experience/experience-l1-backdrop.jpg", mobile: "/parallax-v2/06-experience/experience-l1-backdrop.png", speed: 0.03, scale: 1.02 },
  { file: "/parallax-v2/06-experience/experience-l2-far.png",        mobile: "/parallax-v2/06-experience/experience-l2-far.png",        speed: 0.10, scale: 1.03 },
  { file: "/parallax-v2/06-experience/experience-l3-mid.png",        mobile: "/parallax-v2/06-experience/experience-l3-mid.png",        speed: 0.20, scale: 1.05 },
  { file: "/parallax-v2/06-experience/experience-l4-near.png",       mobile: "/parallax-v2/06-experience/experience-l4-near.png",       speed: 0.34, scale: 1.08 },
  { file: "/parallax-v2/06-experience/experience-l5-foreground.png", mobile: "/parallax-v2/06-experience/experience-l5-foreground.png", speed: 0.55, scale: 1.12 },
  { file: "/parallax-v2/shared/overlay-light-rays.png",  speed: 0.05, blend: "is-overlay" },
  { file: "/parallax-v2/shared/overlay-vignette-navy.png", speed: 0, blend: "is-grade" },
  { file: "/parallax-v2/shared/overlay-grain.png",          speed: 0, blend: "is-grain" },
  { file: "/parallax-v2/shared/overlay-fade-top.png",        speed: 0, blend: "is-grade" },
  { file: "/parallax-v2/shared/overlay-fade-bottom.png",     speed: 0, blend: "is-grade" },
];

useParallax(sectionRef, { scrub: 2, travelMul: 44, zoomMul: 0.15 });

const experiences = [
  {
    title: "Software & AI Engineer",
    company: "Clyrova.id",
    period: "2025 — PRESENT",
    description:
      "End-to-End Software and AI-Driven Solutions. Helping businesses design, build, and scale high-quality software that is fast, secure, and targeted to their needs.",
  },
  {
    title: "Fullstack Developer Intern",
    company: "Dinas Pariwisata Magetan",
    period: "2025 (3 MONTHS)",
    description:
      "Designed and developed the 'Magetan Tourism' website, a scalable digital platform to showcase local tourism and improve public engagement through modern web technologies.",
  },
];

onMounted(() => {
  if (!sectionRef.value) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.value,
      start: "top 65%",
    }
  });

  tl.from(".exp-header-text", {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power4.out"
  })
  .from(".exp-divider", {
    scaleX: 0,
    transformOrigin: "left",
    duration: 1.2,
    stagger: 0.2,
    ease: "power4.out"
  }, "-=0.5")
  .from(".exp-item-content", {
    y: 30,
    opacity: 0,
    stagger: 0.15,
    duration: 0.8,
    ease: "power3.out"
  }, "-=1");
});
</script>

<template>
  <section id="experience" ref="sectionRef" class="px-section relative py-24 md:py-32">

    <!-- v2 Parallax Stage -->
    <ParallaxStage :layers="pxLayers" />

    <div class="px-content relative max-w-[100rem] mx-auto px-6">

      <!-- Editorial Header -->
      <div class="flex flex-col lg:flex-row lg:items-end justify-between mb-16 lg:mb-24 gap-8">
        <h2 class="exp-header-text text-5xl md:text-7xl lg:text-[6rem] font-black font-oswald text-[#F2F2F2] uppercase tracking-tighter leading-[0.9]">
          <span class="block">WORK</span>
          <span class="block text-accent">EXPERIENCE.</span>
        </h2>
        <p class="exp-header-text text-xs sm:text-sm text-text-secondary uppercase tracking-[0.2em] leading-relaxed max-w-sm font-oswald lg:pb-2 text-left lg:text-right">
          A JOURNEY THROUGH IMPACTFUL ROLES BUILDING SCALABLE PRODUCTS AND AI-DRIVEN SOLUTIONS.
        </p>
      </div>

      <!-- Experience List (Editorial Table Style) -->
      <div class="flex flex-col w-full border-t border-white/10 mt-12">

        <div
          v-for="(exp, index) in experiences"
          :key="exp.company"
          class="group relative flex flex-col lg:flex-row py-12 lg:py-16 border-b border-white/10 hover:bg-white/[0.02] transition-colors duration-500">

          <div class="exp-divider absolute bottom-0 left-0 w-full h-[1px] bg-white/10"></div>

          <!-- Period -->
          <div class="exp-item-content w-full lg:w-[20%] mb-4 lg:mb-0 pl-2 lg:pl-6">
            <span class="text-xs font-bold font-oswald tracking-[0.2em] text-accent uppercase">{{ exp.period }}</span>
          </div>

          <!-- Title & Company -->
          <div class="exp-item-content w-full lg:w-[45%] pr-4 mb-4 lg:mb-0 pl-2 lg:pl-0">
            <h3 class="text-3xl lg:text-5xl font-black font-oswald text-[#F2F2F2] uppercase tracking-wider mb-2 group-hover:text-white transition-colors duration-500 leading-none">
              {{ exp.company }}
            </h3>
            <div class="text-sm font-oswald tracking-widest text-text-secondary uppercase mt-4">
              ROLE / <span class="text-white">{{ exp.title }}</span>
            </div>
          </div>

          <!-- Description -->
          <div class="exp-item-content w-full lg:w-[35%] pl-2 lg:pl-0">
            <p class="text-[10px] sm:text-xs text-text-secondary uppercase tracking-[0.15em] leading-loose font-oswald">
              {{ exp.description }}
            </p>
          </div>

        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
</style>