<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
const headerRef = ref(null);
const headerDescRef = ref(null);

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
    // Header — characters fall from above one by one
    const headerChars = gsap.utils.toArray(".header-char");
    gsap.from(headerChars, {
      y: -200,
      opacity: 0,
      rotation: () => gsap.utils.random(-90, 90),
      scale: () => gsap.utils.random(0.3, 2),
      duration: 0.8,
      stagger: 0.03,
      ease: "bounce.out",
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top 70%",
      },
    });

    gsap.from(headerDescRef.value, {
      x: 60,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top 65%",
      },
    });

    // === CRASH ANIMATION FOR EACH SERVICE ITEM ===
    const items = gsap.utils.toArray(".service-item");

    items.forEach((item, i) => {
      const fromLeft = i % 2 === 0;
      const num = item.querySelector(".service-num");
      const title = item.querySelector(".service-title");
      const desc = item.querySelector(".service-desc");
      const line = item.querySelector(".service-line");
      const chars = item.querySelectorAll(".scatter-char");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "top 82%",
        },
      });

      // 1. Item CRASHES in from far left/right — fast, hits hard
      tl.from(item, {
        x: fromLeft ? -window.innerWidth * 0.7 : window.innerWidth * 0.7,
        rotation: fromLeft ? -8 : 8,
        opacity: 0,
        duration: 0.6,
        ease: "power4.in",
      });

      // 2. IMPACT — item bounces back slightly and shakes
      tl.to(item, {
        x: fromLeft ? 30 : -30,
        rotation: fromLeft ? 2 : -2,
        duration: 0.1,
        ease: "power1.out",
      });

      // 3. Characters SCATTER on impact
      tl.to(
        chars,
        {
          x: () => gsap.utils.random(-30, 30),
          y: () => gsap.utils.random(-20, 20),
          rotation: () => gsap.utils.random(-25, 25),
          opacity: 0.6,
          duration: 0.2,
          ease: "power2.out",
        },
        "-=0.08",
      );

      // 4. Item settles to final position
      tl.to(item, {
        x: 0,
        rotation: 0,
        duration: 0.4,
        ease: "elastic.out(1, 0.5)",
      });

      // 5. Characters snap back into place
      tl.to(
        chars,
        {
          x: 0,
          y: 0,
          rotation: 0,
          opacity: 1,
          duration: 0.5,
          ease: "elastic.out(1, 0.4)",
          stagger: 0.01,
        },
        "-=0.3",
      );

      // 6. Number pops with scale bounce on settle
      tl.from(
        num,
        {
          scale: 2.5,
          opacity: 0,
          rotation: fromLeft ? -180 : 180,
          duration: 0.6,
          ease: "back.out(2)",
        },
        "-=0.6",
      );

      // 7. Line draws in from impact side
      tl.from(
        line,
        {
          scaleX: 0,
          transformOrigin: fromLeft ? "left" : "right",
          duration: 0.6,
          ease: "power4.out",
        },
        "-=0.4",
      );
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

// Helper to split text into individual characters for scatter effect
function splitChars(text) {
  return text.split("");
}
</script>

<template>
  <section
    id="services"
    ref="sectionRef"
    class="py-24 md:py-32 bg-[#0A0D18] overflow-hidden"
    style="perspective: 1000px">
    <div
      class="max-w-[90rem] mx-auto px-6"
      style="transform-style: preserve-3d">
      <!-- Editorial Header -->
      <div
        class="flex flex-col lg:flex-row lg:items-end justify-between mb-16 lg:mb-24 gap-8">
        <h2
          ref="headerRef"
          class="text-5xl md:text-7xl lg:text-[6rem] font-black font-oswald text-[#F2F2F2] uppercase tracking-tighter leading-[0.9]">
          <span class="block text-accent">
            <span
              v-for="(char, ci) in splitChars('SERVICES &')"
              :key="'s' + ci"
              class="header-char inline-block"
              :style="char === ' ' ? 'width: 0.25em' : ''"
              >{{ char === " " ? "\u00A0" : char }}</span
            >
          </span>
          <span class="block">
            <span
              v-for="(char, ci) in splitChars('EXPERTISE.')"
              :key="'e' + ci"
              class="header-char inline-block"
              >{{ char }}</span
            >
          </span>
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

          <!-- Title (split into characters for scatter) -->
          <div class="relative w-full lg:w-[40%]">
            <h3
              class="service-title text-2xl lg:text-4xl font-bold font-oswald text-[#F2F2F2] tracking-wider uppercase group-hover:translate-x-4 transition-transform duration-500">
              <span
                v-for="(char, ci) in splitChars(service.title)"
                :key="ci"
                class="scatter-char inline-block"
                :style="char === ' ' ? 'width: 0.3em' : ''"
                >{{ char === " " ? "\u00A0" : char }}</span
              >
            </h3>
          </div>

          <!-- Description (split into words for scatter) -->
          <div class="relative w-full lg:w-[45%]">
            <p
              class="service-desc text-[10px] sm:text-xs text-text-secondary uppercase tracking-[0.15em] leading-loose font-oswald">
              <span
                v-for="(word, wi) in service.description.split(' ')"
                :key="wi"
                class="scatter-char inline-block mr-[0.3em]"
                >{{ word }}</span
              >
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
