<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import all tech logos
import jsLogo from "../assets/js.jpg";
import tsLogo from "../assets/TS.jpg";
import pythonLogo from "../assets/Stickers sur le thème Python.jpg";
import phpLogo from "../assets/PHP.jpg";
import goLogo from "../assets/golang.jpg";
import dartLogo from "../assets/dart.jpg";
import vueLogo from "../assets/Vue js Logo.jpg";
import reactLogo from "../assets/react.jpg";
import html5Logo from "../assets/html5.jpg";
import css3Logo from "../assets/css3.jpg";
import tailwindLogo from "../assets/tailwind.jpg";
import viteLogo from "../assets/vite.jpg";
import nodejsLogo from "../assets/nodejs.jpg";
import expressLogo from "../assets/expressjs.jpg";
import laravelLogo from "../assets/laravel.jpg";
import sequelizeLogo from "../assets/Sequelize v6 _ Sequelize.jpg";
import graphqlLogo from "../assets/GraphQL Logo Vector Files.jpg";
import mysqlLogo from "../assets/mysql.jpg";
import postgresLogo from "../assets/PostgreSQL Logo.jpg";
import dockerLogo from "../assets/docker.jpg";
import gitLogo from "../assets/Git.jpg";
import githubLogo from "../assets/github.jpg";

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
const monitorRef = ref(null);

const techGroups = [
  {
    title: "Core Languages",
    description: "The fundamental building blocks for robust logic and scripting.",
    techs: [
      { name: "JavaScript", logo: jsLogo },
      { name: "TypeScript", logo: tsLogo },
      { name: "Python", logo: pythonLogo },
      { name: "PHP", logo: phpLogo },
      { name: "Go", logo: goLogo },
      { name: "Dart", logo: dartLogo },
    ]
  },
  {
    title: "Frontend & UI",
    description: "Creating highly interactive and performant user interfaces.",
    techs: [
      { name: "Vue.js", logo: vueLogo },
      { name: "React", logo: reactLogo },
      { name: "TailwindCSS", logo: tailwindLogo },
      { name: "Vite", logo: viteLogo },
      { name: "HTML5", logo: html5Logo },
      { name: "CSS3", logo: css3Logo },
    ]
  },
  {
    title: "Backend & DB",
    description: "Architecting scalable data structures and secure server logic.",
    techs: [
      { name: "Node.js", logo: nodejsLogo },
      { name: "Express", logo: expressLogo },
      { name: "Laravel", logo: laravelLogo },
      { name: "GraphQL", logo: graphqlLogo },
      { name: "PostgreSQL", logo: postgresLogo },
      { name: "MySQL", logo: mysqlLogo },
    ]
  }
];

let floatingAnim = null;

onMounted(() => {
  if (!sectionRef.value || !monitorRef.value) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.value,
      start: "top 60%",
    }
  });

  // Monitor entry animation
  tl.from(monitorRef.value, {
    y: 100,
    opacity: 0,
    rotateX: 10,
    rotateY: -25,
    duration: 1.5,
    ease: "power4.out"
  });

  // Text entry animations inside the monitor
  tl.from(".monitor-text", {
    y: 30,
    opacity: 0,
    stagger: 0.1,
    duration: 0.8,
    ease: "power3.out"
  }, "-=0.8");

  // Animate the entire tech badges to appear first
  tl.fromTo(".tech-badge-item",
    { scale: 0.8, opacity: 0, filter: "grayscale(100%)" },
    { scale: 1, opacity: 1, filter: "grayscale(100%)", duration: 0.5, stagger: 0.04, ease: "back.out(1.5)" },
    "-=0.4"
  );

  // The Wave "Pop-up" Looping Animation (Left to Right)
  // We wait for the entrance animation to finish, then start the continuous wave
  setTimeout(() => {
    // Get total number of items to calculate stagger delay dynamically if needed
    // But since we want to wait for the whole cycle to finish, we'll use repeatDelay
    gsap.to(".tech-badge-item", {
      keyframes: {
        "0%": { scale: 1, y: 0, filter: "grayscale(100%)", ease: "power2.in" },
        "50%": { scale: 1.15, y: -5, filter: "grayscale(0%)", ease: "power2.out" },
        "100%": { scale: 1, y: 0, filter: "grayscale(100%)", ease: "power2.inOut" }
      },
      duration: 3,
      stagger: {
        each: 0.3, // Slower, more deliberate rhythm between items
        repeat: -1, // Infinite loop
        repeatDelay: 2 // Crucial: Wait 1 second AFTER the last item finishes before restarting at item 1
      }
    });
  }, 2000); // 2 seconds delay

  // Continuous floating/panning 3D animation (smooth and structural)
  floatingAnim = gsap.to(monitorRef.value, {
    rotateY: -5,
    rotateX: 2,
    rotateZ: 0,
    duration: 6,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: 1.5 // Start after initial entrance
  });
});

onUnmounted(() => {
  if (floatingAnim) floatingAnim.kill();
});
</script>

<template>
  <section ref="sectionRef" id="skills" class="py-24 md:py-32 bg-[#0A0D18] overflow-hidden min-h-screen flex items-center">
    <div class="w-full max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-12 flex justify-center perspective-[2000px]">

      <!-- 3D Monitor Container -->
      <div
        ref="monitorRef"
        class="relative w-full max-w-[1200px] rounded-xl sm:rounded-3xl border-[4px] sm:border-[12px] border-[#1A1A1A] bg-[#0A0D18] shadow-[0_20px_60px_rgba(0,0,0,0.8),inset_0_0_100px_rgba(0,0,0,0.8)] overflow-hidden"
        style="transform: perspective(2000px) rotateX(0deg) rotateY(-15deg) rotateZ(1deg); transform-style: preserve-3d;">

        <!-- Screen glare reflection -->
        <div class="absolute inset-0 z-50 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent transform -skew-x-12 translate-x-1/4"></div>

        <!-- Inner Screen Content -->
        <div class="relative w-full h-full p-6 sm:p-12 lg:p-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20" style="transform: translateZ(20px);">

          <!-- Screen Header/Text Left -->
          <div class="flex flex-col justify-center">
            <h2 class="monitor-text text-4xl sm:text-5xl lg:text-7xl font-oswald font-black text-[#F2F2F2] leading-[1.1] tracking-tight mb-8">
              A robust <span class="text-accent italic font-serif font-light lowercase text-5xl sm:text-6xl lg:text-8xl relative z-10 before:content-[''] before:absolute before:bottom-2 before:left-0 before:w-full before:h-1 before:bg-accent/40 before:-z-10">Arsenal</span><br>
              of modern tech, <br>
              crafted for scale <br>
              and innovation.
            </h2>

            <div class="monitor-text flex flex-wrap gap-x-8 gap-y-4 text-xs font-mono uppercase tracking-widest text-text-secondary mt-8">
              <div>
                <span class="block text-white/30 mb-1">Focus</span>
                Fullstack / AI Integration
              </div>
              <div>
                <span class="block text-white/30 mb-1">Architecture</span>
                Microservices & API
              </div>
            </div>
          </div>

          <!-- Screen Right (Tech Badges Image Replacement) -->
          <div class="relative flex flex-col justify-center h-full perspective-[1000px]">
            <!-- Orange/Accent backdrop panel matching the reference style -->
            <div class="absolute right-0 bottom-0 lg:-bottom-20 w-[90%] sm:w-[80%] h-[110%] bg-gradient-to-br from-accent/80 to-[#12182B] rounded-lg -z-10 shadow-2xl opacity-90" style="transform: translateZ(-30px);"></div>

            <div class="monitor-text relative z-10 bg-[#12182B]/90 backdrop-blur-md border border-white/10 p-6 sm:p-8 rounded-lg shadow-xl -ml-4 lg:-ml-12 mt-8 lg:mt-0" style="transform: translateZ(40px);">
              <div v-for="(group, gIdx) in techGroups" :key="gIdx" class="mb-8 last:mb-0 group/section">
                <div class="flex justify-between items-end mb-4 border-b border-white/10 pb-2">
                  <h3 class="text-[#F2F2F2] font-oswald uppercase tracking-widest text-lg font-bold group-hover/section:text-accent transition-colors duration-300">{{ group.title }}</h3>
                  <span class="text-[10px] text-text-secondary font-mono hidden sm:block">{{ group.description }}</span>
                </div>

                <div class="flex flex-wrap gap-2 sm:gap-3">
                  <div
                    v-for="tech in group.techs"
                    :key="tech.name"
                    class="tech-badge-item flex items-center gap-2 px-3 py-1.5 bg-[#0A0D18] border border-white/5 rounded shadow-sm cursor-default">
                    <img :src="tech.logo" :alt="tech.name" class="tech-logo-img w-4 h-4 object-cover rounded-sm" />
                    <span class="text-[10px] sm:text-xs font-oswald tracking-wider uppercase text-white">{{ tech.name }}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <!-- Tiny UI accents mimicking a browser/website inside the monitor -->
          <div class="absolute top-4 sm:top-6 left-6 sm:left-10 flex gap-4 text-[10px] font-mono text-text-secondary uppercase tracking-widest" style="transform: translateZ(10px);">
            <span>Rizky Y.A</span>
            <span>Digital Developer</span>
          </div>
          <div class="absolute top-4 sm:top-6 right-6 sm:left-auto flex gap-4 items-center" style="transform: translateZ(10px);">
            <span class="text-[10px] font-mono text-text-secondary border border-white/10 px-2 py-0.5 rounded">EN</span>
            <span class="text-[10px] font-mono bg-white text-black px-3 py-1 rounded font-bold">Tech Stack</span>
          </div>

        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.perspective-\[2000px\] {
  perspective: 2000px;
}
</style>