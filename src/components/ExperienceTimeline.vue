<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParallaxStage from "./ParallaxStage.vue";
import { useParallax } from "../utils/useParallax.js";

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
let ctx = null;

// v2 06-experience layers
const pxLayers = [
  { file: "/parallax-v2/06-experience/experience-l1-backdrop.webp", mobile: "/parallax/assets-mobile/05-experience/experience-l1-backdrop.webp", speed: 0.03, scale: 1.02 },
  { file: "/parallax-v2/06-experience/experience-l2-far.webp",        mobile: "/parallax/assets-mobile/05-experience/experience-l2-far.webp",        speed: 0.10, scale: 1.03 },
  { file: "/parallax-v2/06-experience/experience-l3-mid.webp",        mobile: "/parallax/assets-mobile/05-experience/experience-l3-mid.webp",        speed: 0.20, scale: 1.05 },
  { file: "/parallax-v2/06-experience/experience-l4-near.webp",       mobile: "/parallax/assets-mobile/05-experience/experience-l4-near.webp",       speed: 0.34, scale: 1.08 },
  { file: "/parallax-v2/06-experience/experience-l5-foreground.webp", mobile: "/parallax/assets-mobile/05-experience/experience-l5-foreground.webp", speed: 0.55, scale: 1.12 },
  { file: "/parallax-v2/shared/overlay-light-rays.webp",  speed: 0.05, blend: "is-overlay" },
  { file: "/parallax-v2/shared/overlay-vignette-navy.webp", speed: 0, blend: "is-grade" },
  { file: "/parallax-v2/shared/overlay-grain.webp",          speed: 0, blend: "is-grain" },
  { file: "/parallax-v2/shared/overlay-fade-top.webp",        speed: 0, blend: "is-grade" },
  { file: "/parallax-v2/shared/overlay-fade-bottom.webp",     speed: 0, blend: "is-grade" },
];

useParallax(sectionRef, { scrub: 2, travelMul: 44, zoomMul: 0.15 });

const experiences = [
  {
    title: "Founder & Software Engineer",
    company: "Ernesty Digital Labs",
    period: "OCT 2025 — PRESENT",
    description:
      "Independently designed, built, and deployed infographic websites for several villages in Madiun using full-stack Laravel — from requirements, UI, backend, testing, to production release. Providing end-to-end solutions through my own studio so village stakeholders have a single accountable party for their entire digital information platform.",
  },
  {
    title: "Co-Founder & AI Engineer",
    company: "Clyrova.ID",
    period: "JAN 2025 — PRESENT",
    description:
      "Developing and integrating high-precision AI pipelines for background removal and image upscaling to improve the quality of visual assets used by the Clyrova.ID team. Replaced reliance on paid SaaS tools with an internal, company-controlled workflow that keeps asset processing inside the internal ecosystem.",
  },
  {
    title: "Full-Stack Developer — Intern",
    company: "Dinas Kebudayaan dan Pariwisata Kabupaten Magetan",
    period: "JUL 2025 — SEP 2025",
    description:
      "Independently designed and built the new Magetan Tourism platform using Express.js and Vue.js, modernizing the old WordPress-based website. Completed and handed over the full source code and architecture; production deployment pending administrative processing by the local government.",
  },
];

onMounted(() => {
  if (!sectionRef.value) return;

  ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top 80%",
        once: true,
      },
    });

    tl.from(".exp-header-text", {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
    })
    .from(".exp-divider", {
      scaleX: 0,
      transformOrigin: "left",
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
    }, "-=0.4")
    .from(".exp-item-content", {
      y: 30,
      opacity: 0,
      stagger: 0.1,
      duration: 0.7,
      ease: "power3.out",
    }, "-=0.6");
  }, sectionRef.value);
});

onUnmounted(() => {
  if (ctx) ctx.revert();
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
          v-for="exp in experiences"
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