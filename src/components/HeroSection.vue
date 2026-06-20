<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const heroRef = ref(null);
const backgroundRef = ref(null);
const photoRef = ref(null);
const typoRef = ref(null);
const sidebarRef = ref(null);
const descRef = ref(null);

onUnmounted(() => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
});

onMounted(() => {
  if (!heroRef.value) return;

  const tl = gsap.timeline();

  // Initial Entrance Animation
  tl.from(photoRef.value, {
    y: "100%",
    opacity: 0,
    duration: 1.5,
    ease: "power4.out",
  })
    .from(
      ".text-line",
      {
        y: "100%",
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
      },
      "-=1",
    )
    .from(
      sidebarRef.value,
      {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      },
      "-=0.8",
    )
    .from(
      descRef.value,
      {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      },
      "-=0.8",
    );

  // Scroll Parallax Animation
  // Setiap layer bergerak dengan kecepatan berbeda saat scroll
  // Foto bergerak paling lambat, typography sedikit lebih cepat

  // 1. Background
  gsap.to(backgroundRef.value, {
    yPercent: -10,
    ease: "none",
    scrollTrigger: {
      trigger: heroRef.value,
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });

  // 2. Typography - bergerak sedikit lebih cepat dari foto (efek depth)
  gsap.to(typoRef.value, {
    yPercent: -20,
    ease: "none",
    scrollTrigger: {
      trigger: heroRef.value,
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });

  // 3. Foto - bergerak paling lambat (tetap terlihat paling lama)
  gsap.to(photoRef.value, {
    yPercent: -5,
    ease: "none",
    scrollTrigger: {
      trigger: heroRef.value,
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });

  // 4. Description text - bergerak sedikit saja, tanpa fade
  gsap.to(descRef.value, {
    yPercent: -15,
    ease: "none",
    scrollTrigger: {
      trigger: heroRef.value,
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });
});
</script>

<template>
  <section
    ref="heroRef"
    class="relative min-h-dvh flex flex-col lg:flex-row overflow-hidden bg-background pt-16 lg:pt-0">
    <!-- Layer 0: Background Texture / Abstract representation -->
    <div
      ref="backgroundRef"
      class="absolute inset-0 w-full h-full z-0 opacity-20 pointer-events-none flex justify-center items-center">
      <!-- Reusing the existing nodejs logo as a huge abstract backdrop texture -->
      <img
        src="../assets/nodejs.jpg"
        class="w-full h-full object-cover blur-[100px] opacity-30 mix-blend-screen scale-150"
        alt="bg texture" />
    </div>

    <!-- Content container with magazine layout -->
    <div
      class="relative z-10 w-full h-full min-h-dvh flex flex-col lg:flex-row">
      <!-- Layer 1: Left side Navigation / Categories (Moves Fast) -->
      <div
        ref="sidebarRef"
        class="hidden lg:flex flex-col justify-center w-1/4 pl-12 gap-6 z-30">
        <div
          class="hero-label text-xs tracking-widest font-bold text-text-secondary mb-8">
          RIZKY YULI ANDREANTO
        </div>
        <nav class="flex flex-col gap-12 relative mt-4">
          <a
            href="#about"
            class="hero-link text-2xl font-bold font-oswald text-text opacity-70 hover:opacity-100 transition-opacity tracking-wider uppercase"
            >ABOUT ME</a
          >

          <div class="hero-link-active relative w-max">
            <div
              class="absolute -inset-4 bg-gradient-to-r from-accent/20 to-transparent -z-10 blur-md rounded-lg"></div>
            <a
              href="#skills"
              class="text-[2rem] font-bold font-oswald text-text tracking-wider uppercase relative drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
              >TECH STACK</a
            >
            <div
              class="absolute -left-12 top-1/2 -translate-y-1/2 w-8 h-[3px] bg-accent"></div>
          </div>
        </nav>

        <div class="hero-controls flex gap-2 mt-20 items-center">
          <button class="p-1 hover:text-accent transition-colors">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button class="p-1 hover:text-accent transition-colors">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
          <div class="w-8 h-0.5 bg-text opacity-50 ml-2"></div>
          <div
            class="w-8 h-0.5 bg-text opacity-20 hover:opacity-100 transition-opacity cursor-pointer"></div>
          <div
            class="w-8 h-0.5 bg-text opacity-20 hover:opacity-100 transition-opacity cursor-pointer"></div>
        </div>
      </div>

      <!-- Center/Right Area -->
      <div
        class="relative w-full lg:w-3/4 flex-grow flex justify-center lg:justify-end items-end h-screen px-4 lg:px-0">
        <!-- Layer 2: Big Typography Overlay -->
        <div
          ref="typoRef"
          class="absolute top-1/2 lg:top-1/3 -translate-y-1/2 left-0 right-0 lg:left-auto lg:-translate-y-0 flex flex-col justify-center items-center lg:items-end lg:pr-12 xl:pr-24 z-30 pointer-events-none">
          <div class="text-center lg:text-right font-oswald drop-shadow-2xl">
            <h1
              class="text-[3.5rem] sm:text-6xl md:text-7xl lg:text-[7rem] xl:text-[8rem] font-bold text-text leading-[0.9] tracking-tighter uppercase mix-blend-difference lg:mix-blend-normal">
              <span class="block overflow-hidden"
                ><span class="block text-line">THE BEST FOR</span></span
              >
              <span class="block overflow-hidden"
                ><span class="block text-line">ALL YOUR</span></span
              >
              <span class="block overflow-hidden"
                ><span class="block text-line text-accent">SOFTWARE</span></span
              >
              <span class="block overflow-hidden"
                ><span class="block text-line">NEEDS</span></span
              >
            </h1>
          </div>
        </div>

        <!-- Layer 3: Main Portrait (Moves Slower, stays prominent) -->
        <div
          ref="photoRef"
          class="absolute bottom-0 left-1/2 lg:left-[45%] -translate-x-1/2 lg:-translate-x-1/2 w-[90%] sm:w-[70%] md:w-[60%] lg:w-[65%] xl:w-[55%] h-[75vh] lg:h-[95vh] z-20">
          <img
            src="../assets/HERO-NO-BG.png"
            alt="Rizky Yuli Andreanto"
            class="w-full h-full object-cover object-top lg:object-contain lg:object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]" />
        </div>

        <!-- Layer 4: Subtitle/Description (Moves Fast, fades) -->
        <div
          ref="descRef"
          class="absolute bottom-8 lg:bottom-16 right-6 lg:right-12 xl:right-24 max-w-[280px] lg:max-w-sm text-right z-30">
          <p
            class="text-xs lg:text-sm text-text-secondary uppercase tracking-[0.2em] leading-loose mix-blend-difference lg:mix-blend-normal font-oswald">
            CHOOSE ME TO BUILD YOUR SCALABLE SYSTEMS AND INNOVATIVE DIGITAL
            SOLUTIONS WITH CUTTING-EDGE AI TECHNOLOGY.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
