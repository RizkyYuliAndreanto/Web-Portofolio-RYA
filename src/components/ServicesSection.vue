<script setup>
import { ref, onMounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);

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

onMounted(() => {
  if (!sectionRef.value) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.value,
      start: "top 70%",
    }
  });

  tl.from(".service-header-text", {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power4.out"
  })
  .from(".service-divider", {
    scaleX: 0,
    transformOrigin: "left",
    duration: 1.2,
    stagger: 0.2,
    ease: "power4.out"
  }, "-=0.5")
  .from(".service-item-content", {
    y: 30,
    opacity: 0,
    stagger: 0.1,
    duration: 0.8,
    ease: "power3.out"
  }, "-=1");
});
</script>

<template>
  <section id="services" ref="sectionRef" class="py-24 md:py-32 bg-[#0A0D18]">
    <div class="max-w-[90rem] mx-auto px-6">

      <!-- Editorial Header -->
      <div class="flex flex-col lg:flex-row lg:items-end justify-between mb-16 lg:mb-24 gap-8">
        <h2 class="service-header-text text-5xl md:text-7xl lg:text-[6rem] font-black font-oswald text-[#F2F2F2] uppercase tracking-tighter leading-[0.9]">
          <span class="block text-accent">SERVICES &</span>
          <span class="block">EXPERTISE.</span>
        </h2>
        <p class="service-header-text text-xs sm:text-sm text-text-secondary uppercase tracking-[0.2em] leading-relaxed max-w-sm font-oswald lg:pb-2">
          DELIVERING CUTTING-EDGE SOLUTIONS BY COMBINING ENGINEERING RIGOR WITH MODERN AI TECHNOLOGY.
        </p>
      </div>

      <!-- Services List (Editorial Table Style) -->
      <div class="flex flex-col w-full">
        <div class="service-divider w-full h-[1px] bg-white/10"></div>

        <div
          v-for="(service, index) in services"
          :key="index"
          class="group relative flex flex-col lg:flex-row lg:items-center py-10 lg:py-14 gap-6 lg:gap-12 hover:bg-white/[0.02] transition-colors duration-500 cursor-default">

          <!-- Number -->
          <div class="service-item-content w-full lg:w-[15%]">
            <span class="text-4xl lg:text-6xl font-black font-oswald text-white/30 group-hover:text-accent transition-colors duration-500">{{ service.num }}</span>
          </div>

          <!-- Title -->
          <div class="service-item-content w-full lg:w-[40%]">
            <h3 class="text-2xl lg:text-4xl font-bold font-oswald text-[#F2F2F2] tracking-wider uppercase group-hover:translate-x-4 transition-transform duration-500">
              {{ service.title }}
            </h3>
          </div>

          <!-- Description -->
          <div class="service-item-content w-full lg:w-[45%]">
            <p class="text-[10px] sm:text-xs text-text-secondary uppercase tracking-[0.15em] leading-loose font-oswald">
              {{ service.description }}
            </p>
          </div>

          <div class="service-divider absolute bottom-0 left-0 w-full h-[1px] bg-white/10"></div>
        </div>
      </div>

    </div>
  </section>
</template>
