<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
const yearsCount = ref(0);
const projectsCount = ref(0);

const roles = ["BACKEND ENGINEER", "AI ENGINEER"];
const currentRoleIndex = ref(0);
let roleInterval = null;

onMounted(() => {
  if (!sectionRef.value) return;

  // Cycle through roles for the big background text
  roleInterval = setInterval(() => {
    gsap.to(".big-bg-text", {
      opacity: 0,
      duration: 0.3,
      y: -10,
      onComplete: () => {
        currentRoleIndex.value = (currentRoleIndex.value + 1) % roles.length;
        gsap.to(".big-bg-text", {
          opacity: 0.2, // Increased opacity to be more visible like reference
          y: 0,
          duration: 0.3
        });
      }
    });
  }, 3000);

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

  gsap.from(".profile-fade-in", {
    y: 40,
    opacity: 0,
    stagger: 0.2,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: { trigger: sectionRef.value, start: "top 60%" },
  });

  // Circle stats animation
  gsap.from(".stat-circle", {
    scale: 0,
    opacity: 0,
    duration: 1,
    ease: "back.out(1.7)",
    scrollTrigger: { trigger: sectionRef.value, start: "top 50%" },
  });
});

onUnmounted(() => {
  if (roleInterval) clearInterval(roleInterval);
});
</script>

<template>
  <section id="about" ref="sectionRef" class="relative py-24 min-h-[90vh] bg-[#0A0D18] overflow-hidden flex items-center justify-center">

    <!-- Vertical Accent Strip like reference (instead of a big solid box) -->
    <div class="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[25vw] max-w-[300px] bg-white/[0.02] z-0 pointer-events-none"></div>

    <!-- Big Background Typography (Elevated) -->
    <div class="absolute inset-x-0 top-[10%] lg:top-[5%] flex flex-col justify-start items-center overflow-hidden pointer-events-none z-0">
      <h2 class="big-bg-text opacity-20 text-[18vw] font-black font-oswald text-[#F2F2F2] whitespace-nowrap uppercase tracking-tighter leading-[0.85] select-none text-center">
        <span class="block">{{ roles[currentRoleIndex].split(' ')[0] }}</span>
        <span class="block">{{ roles[currentRoleIndex].split(' ')[1] }}</span>
      </h2>
    </div>

    <!-- Center Content Container -->
    <div class="relative z-10 w-full max-w-[90rem] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-12 items-center mt-12 lg:mt-24">

      <!-- Left Column: Description -->
      <div class="profile-fade-in order-2 lg:order-1 flex flex-col justify-center lg:items-end text-center lg:text-right w-full z-20 pt-8 lg:pt-32">
        <p class="text-[10px] sm:text-xs text-text-secondary uppercase tracking-[0.2em] leading-relaxed mb-12 lg:border-r-2 border-accent/50 lg:pr-4 text-center lg:text-right inline-block mx-auto lg:mx-0 max-w-[280px] font-oswald">
          AS A DIGITAL DEVELOPER, I FOCUS ON PRODUCING TOP-NOTCH AND IMPACTFUL DIGITAL EXPERIENCES.
        </p>
        <p class="text-[10px] sm:text-xs text-text-secondary uppercase tracking-[0.2em] leading-relaxed lg:border-r-2 border-accent/50 lg:pr-4 text-center lg:text-right inline-block mx-auto lg:mx-0 max-w-[280px] font-oswald">
          RIZKY'S BACKEND ARCHITECTURE & AI EXPERTISE DELIVERED.
        </p>

        <!-- Let's talk button -->
        <a href="#contact" class="mt-12 mx-auto lg:ml-auto lg:mr-0 flex items-center gap-4 text-white uppercase font-oswald tracking-widest text-xs sm:text-sm border border-white/20 py-3 px-6 hover:bg-white/5 transition-colors">
          <span>Let's talk</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      </div>

      <!-- Center Column: Photo NO-BG -->
      <div class="profile-fade-in order-1 lg:order-2 flex justify-center relative z-10">
        <div class="relative w-[300px] sm:w-[400px] lg:w-[450px] xl:w-[500px] h-auto flex justify-center items-end">
          <!-- Photo Image without Background -->
          <img
            src="../assets/HERO-NO-BG.png"
            alt="Rizky Yuli Andreanto"
            class="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative z-10 -mb-12 lg:-mb-24" />
        </div>
      </div>

      <!-- Right Column: Stats & Description -->
      <div class="profile-fade-in order-3 flex flex-col justify-center items-center lg:items-start lg:pl-4 xl:pl-8 gap-8 text-center lg:text-left z-20 pt-8 lg:pt-32">

        <!-- Stat 1: Years Experience (Flex Layout to avoid overlap) -->
        <div class="flex flex-col lg:flex-row items-center lg:items-center gap-6 group">
          <div class="stat-circle flex-shrink-0 flex items-center justify-center w-28 h-28 md:w-36 md:h-36 rounded-full bg-[#E5E0D8] text-[#12182B] border-[8px] border-background lg:-ml-12 xl:-ml-20 z-20 shadow-2xl transition-transform duration-300 group-hover:scale-105">
            <span class="text-5xl md:text-6xl font-black font-oswald tracking-tighter leading-none pt-1">0{{ Math.round(yearsCount) }}</span>
          </div>
          <div class="max-w-[120px] text-center lg:text-left">
            <p class="text-[10px] sm:text-xs tracking-widest text-text-secondary uppercase font-bold leading-relaxed">Years of<br>Experience</p>
          </div>
        </div>

        <!-- Stat 2: Projects (Flex Layout) -->
        <div class="flex flex-col lg:flex-row items-center lg:items-center gap-6 group">
          <div class="stat-circle flex-shrink-0 flex items-center justify-center w-28 h-28 md:w-36 md:h-36 rounded-full bg-[#E5E0D8] text-[#12182B] border-[8px] border-background lg:-ml-12 xl:-ml-20 z-20 shadow-2xl transition-transform duration-300 group-hover:scale-105">
            <span class="text-4xl md:text-5xl font-black font-oswald tracking-tighter leading-none pt-1">{{ Math.round(projectsCount) }}+</span>
          </div>
          <div class="max-w-[120px] text-center lg:text-left">
            <p class="text-[10px] sm:text-xs tracking-widest text-text-secondary uppercase font-bold leading-relaxed">Projects<br>Completed</p>
          </div>
        </div>

        <p class="text-[10px] sm:text-xs text-text-secondary uppercase tracking-[0.2em] leading-relaxed mt-6 lg:border-l-2 border-accent/50 lg:pl-4 text-center lg:text-left inline-block mx-auto lg:mx-0 max-w-[280px] font-oswald">
          A CUTTING-EDGE DIGITAL PLATFORM DESIGNED TO REVOLUTIONIZE THE WAY PEOPLE INTERACT WITH TECHNOLOGY.
          <br><br>
          EXCEPTIONAL BACKEND ARCHITECTURE AND AI EXPERIENCE.
        </p>

        <!-- Tiny badges -->
        <div class="flex gap-4 mt-2 justify-center lg:justify-start w-full">
          <span class="px-4 py-1.5 rounded-full border border-white/20 text-[9px] font-oswald tracking-widest uppercase text-white/70">BACKEND ENGINEER</span>
          <span class="px-4 py-1.5 rounded-full border border-white/20 text-[9px] font-oswald tracking-widest uppercase text-white/70">2026</span>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
/* Removed old animations to match new clean editorial style */
</style>
