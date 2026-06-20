<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
const bgTextRef = ref(null);
const accentStripRef = ref(null);
const photoContainerRef = ref(null);
const leftColRef = ref(null);
const rightColRef = ref(null);
const stat1Ref = ref(null);
const stat2Ref = ref(null);
const badgesRef = ref(null);

const yearsCount = ref(0);
const projectsCount = ref(0);

const roles = ["BACKEND ENGINEER", "AI ENGINEER"];
const currentRoleIndex = ref(0);
let roleInterval = null;
let ctx = null;

onMounted(() => {
  if (!sectionRef.value) return;

  ctx = gsap.context(() => {
    // Role text cycling with 3D flip
    roleInterval = setInterval(() => {
      gsap.to(".big-bg-text", {
        opacity: 0,
        duration: 0.4,
        rotationX: 45,
        onComplete: () => {
          currentRoleIndex.value = (currentRoleIndex.value + 1) % roles.length;
          gsap.fromTo(
            ".big-bg-text",
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
    gsap.from(photoContainerRef.value, {
      scale: 0.8,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.value, start: "top 65%" },
    });

    // Left column - slide from left
    gsap.from(leftColRef.value, {
      x: -80,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.value, start: "top 60%" },
    });

    // Right column - slide from right
    gsap.from(rightColRef.value, {
      x: 80,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.value, start: "top 60%" },
    });

    // Stat circles - pop in with 3D rotation
    gsap.from(stat1Ref.value, {
      scale: 0,
      rotation: -180,
      opacity: 0,
      duration: 1.2,
      ease: "back.out(1.7)",
      scrollTrigger: { trigger: sectionRef.value, start: "top 50%" },
    });

    gsap.from(stat2Ref.value, {
      scale: 0,
      rotation: 180,
      opacity: 0,
      duration: 1.2,
      delay: 0.2,
      ease: "back.out(1.7)",
      scrollTrigger: { trigger: sectionRef.value, start: "top 50%" },
    });

    // Badges slide up
    gsap.from(badgesRef.value, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.value, start: "top 40%" },
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
    gsap.to(photoContainerRef.value, {
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
    gsap.to(leftColRef.value, {
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
    gsap.to(rightColRef.value, {
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
    gsap.to(stat1Ref.value, {
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

    gsap.to(stat2Ref.value, {
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
    gsap.to(badgesRef.value, {
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
    class="relative py-24 min-h-[90vh] bg-[#0A0D18] overflow-hidden flex items-center justify-center"
    style="perspective: 1000px">
    <!-- Vertical Accent Strip -->
    <div
      ref="accentStripRef"
      class="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[25vw] max-w-[300px] bg-white/[0.02] z-0 pointer-events-none"></div>

    <!-- Big Background Typography - 3D -->
    <div
      ref="bgTextRef"
      class="absolute inset-x-0 top-[10%] lg:top-[5%] flex flex-col justify-start items-center overflow-hidden pointer-events-none z-0"
      style="perspective: 800px">
      <h2
        class="big-bg-text text-[18vw] font-black font-oswald text-transparent whitespace-nowrap uppercase tracking-tighter leading-[0.85] select-none text-center bg-text-3d"
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
      class="relative z-10 w-full max-w-[90rem] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-12 items-center mt-12 lg:mt-24"
      style="transform-style: preserve-3d">
      <!-- Left Column: Description -->
      <div
        ref="leftColRef"
        class="order-2 lg:order-1 flex flex-col justify-center lg:items-end text-center lg:text-right w-full z-20 pt-8 lg:pt-32"
        style="transform-style: preserve-3d">
        <p
          class="text-[10px] sm:text-xs text-text-secondary uppercase tracking-[0.2em] leading-relaxed mb-12 lg:border-r-2 border-accent/50 lg:pr-4 text-center lg:text-right inline-block mx-auto lg:mx-0 max-w-[280px] font-oswald">
          AS A DIGITAL DEVELOPER, I FOCUS ON PRODUCING TOP-NOTCH AND IMPACTFUL
          DIGITAL EXPERIENCES.
        </p>
        <p
          class="text-[10px] sm:text-xs text-text-secondary uppercase tracking-[0.2em] leading-relaxed lg:border-r-2 border-accent/50 lg:pr-4 text-center lg:text-right inline-block mx-auto lg:mx-0 max-w-[280px] font-oswald">
          RIZKY'S BACKEND ARCHITECTURE & AI EXPERTISE DELIVERED.
        </p>

        <!-- Let's talk button -->
        <a
          href="#contact"
          class="mt-12 mx-auto lg:ml-auto lg:mr-0 flex items-center gap-4 text-white uppercase font-oswald tracking-widest text-xs sm:text-sm border border-white/20 py-3 px-6 hover:bg-white/5 transition-colors">
          <span>Let's talk</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      <!-- Center Column: Photo -->
      <div
        ref="photoContainerRef"
        class="order-1 lg:order-2 flex justify-center relative z-10"
        style="transform-style: preserve-3d">
        <div
          class="relative w-[300px] sm:w-[400px] lg:w-[450px] xl:w-[500px] h-auto flex justify-center items-end">
          <img
            src="../assets/HERO-NO-BG.png"
            alt="Rizky Yuli Andreanto"
            class="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative z-10 -mb-12 lg:-mb-24" />
        </div>
      </div>

      <!-- Right Column: Stats & Description -->
      <div
        ref="rightColRef"
        class="order-3 flex flex-col justify-center items-center lg:items-start lg:pl-4 xl:pl-8 gap-8 text-center lg:text-left z-20 pt-8 lg:pt-32"
        style="transform-style: preserve-3d">
        <!-- Stat 1: Years Experience -->
        <div
          class="flex flex-col lg:flex-row items-center lg:items-center gap-6 group">
          <div
            ref="stat1Ref"
            class="flex-shrink-0 flex items-center justify-center w-28 h-28 md:w-36 md:h-36 rounded-full bg-[#E5E0D8] text-[#12182B] border-[8px] border-background lg:-ml-12 xl:-ml-20 z-20 shadow-2xl transition-transform duration-300 group-hover:scale-105"
            style="transform-style: preserve-3d">
            <span
              class="text-5xl md:text-6xl font-black font-oswald tracking-tighter leading-none pt-1"
              >0{{ Math.round(yearsCount) }}</span
            >
          </div>
          <div class="max-w-[120px] text-center lg:text-left">
            <p
              class="text-[10px] sm:text-xs tracking-widest text-text-secondary uppercase font-bold leading-relaxed">
              Years of<br />Experience
            </p>
          </div>
        </div>

        <!-- Stat 2: Projects -->
        <div
          class="flex flex-col lg:flex-row items-center lg:items-center gap-6 group">
          <div
            ref="stat2Ref"
            class="flex-shrink-0 flex items-center justify-center w-28 h-28 md:w-36 md:h-36 rounded-full bg-[#E5E0D8] text-[#12182B] border-[8px] border-background lg:-ml-12 xl:-ml-20 z-20 shadow-2xl transition-transform duration-300 group-hover:scale-105"
            style="transform-style: preserve-3d">
            <span
              class="text-4xl md:text-5xl font-black font-oswald tracking-tighter leading-none pt-1"
              >{{ Math.round(projectsCount) }}+</span
            >
          </div>
          <div class="max-w-[120px] text-center lg:text-left">
            <p
              class="text-[10px] sm:text-xs tracking-widest text-text-secondary uppercase font-bold leading-relaxed">
              Projects<br />Completed
            </p>
          </div>
        </div>

        <p
          class="text-[10px] sm:text-xs text-text-secondary uppercase tracking-[0.2em] leading-relaxed mt-6 lg:border-l-2 border-accent/50 lg:pl-4 text-center lg:text-left inline-block mx-auto lg:mx-0 max-w-[280px] font-oswald">
          A CUTTING-EDGE DIGITAL PLATFORM DESIGNED TO REVOLUTIONIZE THE WAY
          PEOPLE INTERACT WITH TECHNOLOGY.
          <br /><br />
          EXCEPTIONAL BACKEND ARCHITECTURE AND AI EXPERIENCE.
        </p>

        <!-- Badges -->
        <div
          ref="badgesRef"
          class="flex gap-4 mt-2 justify-center lg:justify-start w-full">
          <span
            class="px-4 py-1.5 rounded-full border border-white/20 text-[9px] font-oswald tracking-widest uppercase text-white/70"
            >BACKEND ENGINEER</span
          >
          <span
            class="px-4 py-1.5 rounded-full border border-white/20 text-[9px] font-oswald tracking-widest uppercase text-white/70"
            >2026</span
          >
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
