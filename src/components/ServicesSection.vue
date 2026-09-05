<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParallaxStage from "./ParallaxStage.vue";
import { useParallax } from "../utils/useParallax.js";

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
const headerRef = ref(null);
const headerDescRef = ref(null);

// v2 03-services layers — vignette navy dihapus untuk mengurangi kegelapan
const pxLayers = [
  { file: "/parallax-v2/03-services/services-l1-backdrop.webp", mobile: "/parallax/assets-mobile/03-services/services-l1-backdrop.webp", speed: 0.03, scale: 1.02 },
  { file: "/parallax-v2/03-services/services-l2-far.webp",        mobile: "/parallax/assets-mobile/03-services/services-l2-far.webp",        speed: 0.10, scale: 1.03 },
  { file: "/parallax-v2/03-services/services-l3-mid.webp",        mobile: "/parallax/assets-mobile/03-services/services-l3-mid.webp",        speed: 0.20, scale: 1.05 },
  { file: "/parallax-v2/03-services/services-l4-near.webp",       mobile: "/parallax/assets-mobile/03-services/services-l4-near.webp",       speed: 0.34, scale: 1.08 },
  { file: "/parallax-v2/03-services/services-l5-foreground.webp", mobile: "/parallax/assets-mobile/03-services/services-l5-foreground.webp", speed: 0.55, scale: 1.12 },
  { file: "/parallax-v2/shared/overlay-grid-perspective.webp", speed: 0.16, blend: "is-overlay" },
  // overlay-vignette-navy dihapus
  { file: "/parallax-v2/shared/overlay-grain.webp",             speed: 0,    blend: "is-grain"   },
  { file: "/parallax-v2/shared/overlay-fade-top.webp",          speed: 0,    blend: "is-grade"   },
  { file: "/parallax-v2/shared/overlay-fade-bottom.webp",       speed: 0,    blend: "is-grade"   },
];

useParallax(sectionRef, { scrub: 2, travelMul: 48, zoomMul: 0.17 });

const services = [
  {
    num: "01",
    title: "BACKEND ARCHITECTURE",
    description:
      "DESIGNING AND BUILDING SCALABLE APIS, MICROSERVICES, AND ROBUST DATABASE STRUCTURES WITH MODERN NODE.JS, LARAVEL, AND PYTHON FRAMEWORKS.",
  },
  {
    num: "02",
    title: "AI INTEGRATION",
    description:
      "IMPLEMENTING INTELLIGENT FEATURES, ML PIPELINES, AND AUTOMATION INTO WEB APPLICATIONS TO REVOLUTIONIZE WORKFLOWS AND CAPABILITIES.",
  },
  {
    num: "03",
    title: "FULLSTACK DEVELOPMENT",
    description:
      "END-TO-END DEVELOPMENT CRAFTING SEAMLESS EXPERIENCES FROM HIGH-PERFORMANCE VUE.JS/REACT FRONTENDS TO SECURE BACKEND LOGIC.",
  },
  {
    num: "04",
    title: "API ENGINEERING",
    description:
      "DEVELOPING SCALABLE RESTFUL AND GRAPHQL APIS EQUIPPED WITH PROPER AUTHENTICATION, RATE LIMITING, AND COMPREHENSIVE DOCUMENTATION.",
  },
];

let ctx = null;

onMounted(() => {
  if (!sectionRef.value) return;

  ctx = gsap.context(() => {
    // Header entrance
    gsap.from(headerRef.value, {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: headerRef.value,
        start: "top 85%",
        once: true,
      },
    });

    gsap.from(headerDescRef.value, {
      x: 60,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: headerDescRef.value,
        start: "top 85%",
        once: true,
      },
    });

    // === ANIMATION FOR EACH SERVICE ITEM ===
    const items = gsap.utils.toArray(".service-item");

    items.forEach((item, i) => {
      const fromLeft = i % 2 === 0;
      const num = item.querySelector(".service-num");
      const title = item.querySelector(".service-title");
      const desc = item.querySelector(".service-desc");
      const line = item.querySelector(".service-line");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          once: true,
        },
      });

      tl.from(item, {
        x: fromLeft ? -50 : 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })
      .from(num, {
        scale: 0.5,
        opacity: 0,
        duration: 0.5,
        ease: "back.out(1.5)",
      }, "-=0.5")
      .from(title, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      }, "-=0.4")
      .from(desc, {
        y: 15,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      }, "-=0.4")
      .from(line, {
        scaleX: 0,
        transformOrigin: "left",
        duration: 0.8,
        ease: "power4.out",
      }, "-=0.5");
    });

    // === SCROLL PARALLAX ===
    gsap.to(headerRef.value, {
      yPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    items.forEach((item, i) => {
      gsap.fromTo(
        item,
        { rotationX: 3, rotationY: i % 2 === 0 ? -2 : 2 },
        {
          rotationX: -3,
          rotationY: i % 2 === 0 ? 2 : -2,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    });
  }, sectionRef.value);
});

onUnmounted(() => {
  if (ctx) ctx.revert();
});
</script>

<template>
  <section
    id="services"
    ref="sectionRef"
    class="px-section relative py-24 md:py-32"
    style="perspective: 1000px">

    <!-- v2 Parallax Stage -->
    <ParallaxStage :layers="pxLayers" />

    <div
      class="px-content relative max-w-[90rem] mx-auto px-6"
      style="transform-style: preserve-3d">
      <!-- Editorial Header -->
      <div
        class="flex flex-col lg:flex-row lg:items-end justify-between mb-16 lg:mb-24 gap-8">
        <h2
          ref="headerRef"
          class="text-5xl md:text-7xl lg:text-[6rem] font-black font-oswald text-[#F2F2F2] uppercase tracking-tighter leading-[0.9]">
          <span class="block text-accent">SERVICES &</span>
          <span class="block">EXPERTISE.</span>
        </h2>
        <p
          ref="headerDescRef"
          class="text-xs sm:text-sm text-text-secondary uppercase tracking-[0.2em] leading-relaxed max-w-sm font-oswald lg:pb-2">
          DELIVERING CUTTING-EDGE SOLUTIONS BY COMBINING ENGINEERING RIGOR WITH
          MODERN AI TECHNOLOGY.
        </p>
      </div>

      <!-- Services List -->
      <div class="flex flex-col w-full" style="transform-style: preserve-3d">
        <div class="w-full h-px bg-white/10"></div>

        <div
          v-for="(service, index) in services"
          :key="index"
          class="service-item group relative flex flex-col lg:flex-row lg:items-center py-10 lg:py-14 gap-6 lg:gap-12 cursor-default"
          style="transform-style: preserve-3d">
          <!-- Hover glow -->
          <div
            class="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-lg"></div>

          <!-- Number -->
          <div class="relative w-full lg:w-[15%]" style="perspective: 400px">
            <span
              class="service-num inline-block text-4xl lg:text-6xl font-black font-oswald text-white/30 group-hover:text-accent transition-all duration-500 group-hover:scale-110"
              style="transform-style: preserve-3d"
              >{{ service.num }}</span
            >
          </div>

          <!-- Title -->
          <div class="relative w-full lg:w-[40%]">
            <h3
              class="service-title text-2xl lg:text-4xl font-bold font-oswald text-[#F2F2F2] tracking-wider uppercase group-hover:translate-x-4 transition-transform duration-500">
              {{ service.title }}
            </h3>
          </div>

          <!-- Description -->
          <div class="relative w-full lg:w-[45%]">
            <p
              class="service-desc text-[10px] sm:text-xs text-text-secondary uppercase tracking-[0.15em] leading-loose font-oswald">
              {{ service.description }}
            </p>
          </div>

          <!-- Bottom line -->
          <div
            class="service-line absolute bottom-0 left-0 w-full h-px bg-white/10"></div>
        </div>
      </div>
    </div>
  </section>
</template>
