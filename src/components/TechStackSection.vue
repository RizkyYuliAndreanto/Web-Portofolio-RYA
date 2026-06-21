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

// New tech logos
import fastApiLogo from "../assets/new/FastApi.jpg";
import firebaseLogo from "../assets/new/firebase.jpg";
import flaskLogo from "../assets/new/flaskpython.jpg";
import mongodbLogo from "../assets/new/mongodb.jpg";
import nextjsLogo from "../assets/new/nextjs.jpg";
import nuxtjsLogo from "../assets/new/nuxtjs.jpg";
import postmanLogo from "../assets/new/postman.jpg";
import sqliteLogo from "../assets/new/sqlite.jpg";
import vscodeLogo from "../assets/new/vscode.jpg";

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
const monitorRef = ref(null);

const techGroups = [
  {
    title: "Core Languages",
    description:
      "The fundamental building blocks for robust logic and scripting.",
    techs: [
      { name: "JavaScript", logo: jsLogo },
      { name: "TypeScript", logo: tsLogo },
      { name: "Python", logo: pythonLogo },
      { name: "PHP", logo: phpLogo },
      { name: "Go", logo: goLogo },
      { name: "Dart", logo: dartLogo },
    ],
  },
  {
    title: "Frontend & UI",
    description: "Creating highly interactive and performant user interfaces.",
    techs: [
      { name: "Vue.js", logo: vueLogo },
      { name: "Nuxt.js", logo: nuxtjsLogo },
      { name: "React", logo: reactLogo },
      { name: "Next.js", logo: nextjsLogo },
      { name: "TailwindCSS", logo: tailwindLogo },
      { name: "Vite", logo: viteLogo },
      { name: "HTML5", logo: html5Logo },
      { name: "CSS3", logo: css3Logo },
    ],
  },
  {
    title: "Backend & API",
    description: "Architecting scalable server logic and API services.",
    techs: [
      { name: "Node.js", logo: nodejsLogo },
      { name: "Express", logo: expressLogo },
      { name: "Laravel", logo: laravelLogo },
      { name: "FastAPI", logo: fastApiLogo },
      { name: "Flask", logo: flaskLogo },
      { name: "GraphQL", logo: graphqlLogo },
      { name: "Sequelize", logo: sequelizeLogo },
    ],
  },
  {
    title: "Database",
    description: "Storing and managing data at scale.",
    techs: [
      { name: "PostgreSQL", logo: postgresLogo },
      { name: "MySQL", logo: mysqlLogo },
      { name: "MongoDB", logo: mongodbLogo },
      { name: "SQLite", logo: sqliteLogo },
      { name: "Firebase", logo: firebaseLogo },
    ],
  },
  {
    title: "Tools & DevOps",
    description: "Streamlining development workflow and deployment.",
    techs: [
      { name: "Docker", logo: dockerLogo },
      { name: "Git", logo: gitLogo },
      { name: "GitHub", logo: githubLogo },
      { name: "Postman", logo: postmanLogo },
      { name: "VS Code", logo: vscodeLogo },
    ],
  },
];

let floatingAnim = null;
const planeRef = ref(null);
const crackRef = ref(null);

onMounted(() => {
  if (!sectionRef.value || !monitorRef.value) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.value,
      start: "top 60%",
    },
  });

  // Monitor starts hidden
  tl.set(monitorRef.value, { opacity: 1 });
  tl.set(".monitor-content", { opacity: 0 });
  tl.set(crackRef.value, { opacity: 0, scale: 0 });

  // 1. Paper plane flies in from far away toward the screen
  tl.fromTo(
    planeRef.value,
    {
      x: -600,
      y: -300,
      scale: 0.3,
      rotation: -20,
      opacity: 1,
    },
    {
      x: 0,
      y: 0,
      scale: 1.5,
      rotation: 5,
      duration: 1.2,
      ease: "power3.in",
    },
  );

  // 2. IMPACT — plane hits the screen
  // Plane disappears on impact
  tl.to(planeRef.value, {
    scale: 3,
    opacity: 0,
    duration: 0.15,
    ease: "power4.in",
  });

  // 3. Screen shakes violently on impact
  tl.to(
    monitorRef.value,
    {
      x: 15,
      duration: 0.05,
      ease: "none",
    },
    "-=0.1",
  );
  tl.to(monitorRef.value, { x: -12, duration: 0.05, ease: "none" });
  tl.to(monitorRef.value, { x: 10, duration: 0.05, ease: "none" });
  tl.to(monitorRef.value, { x: -8, duration: 0.05, ease: "none" });
  tl.to(monitorRef.value, { x: 5, duration: 0.05, ease: "none" });
  tl.to(monitorRef.value, { x: -3, duration: 0.04, ease: "none" });
  tl.to(monitorRef.value, { x: 0, duration: 0.04, ease: "none" });

  // 4. Crack appears on impact point
  tl.to(
    crackRef.value,
    {
      opacity: 1,
      scale: 1,
      duration: 0.2,
      ease: "power4.out",
    },
    "-=0.3",
  );

  // 5. Crack fades away as content reveals
  tl.to(crackRef.value, {
    opacity: 0,
    scale: 1.5,
    duration: 0.8,
    ease: "power2.out",
    delay: 0.3,
  });

  // 6. Monitor content reveals after impact
  tl.to(
    ".monitor-content",
    {
      opacity: 1,
      duration: 0.6,
      ease: "power2.out",
    },
    "-=0.6",
  );

  // 7. Text slides in
  tl.from(
    ".monitor-text",
    {
      y: 30,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "power3.out",
    },
    "-=0.3",
  );

  // 8. Tech badges scatter in from impact (like debris settling)
  tl.fromTo(
    ".tech-badge-item",
    {
      scale: 0,
      opacity: 0,
      x: () => gsap.utils.random(-50, 50),
      y: () => gsap.utils.random(-40, 40),
      rotation: () => gsap.utils.random(-30, 30),
      filter: "grayscale(100%)",
    },
    {
      scale: 1,
      opacity: 1,
      x: 0,
      y: 0,
      rotation: 0,
      filter: "grayscale(100%)",
      duration: 0.6,
      stagger: 0.03,
      ease: "back.out(1.5)",
    },
    "-=0.4",
  );

  // Wave highlight animation (same as before)
  setTimeout(() => {
    const allBadges = gsap.utils.toArray(".tech-badge-item");
    const perItemDelay = 0.15;
    const highlightDuration = 0.6;
    const pauseBetweenCycles = 1.5;

    function runWaveCycle() {
      const waveTl = gsap.timeline({
        onComplete: () => {
          gsap.delayedCall(pauseBetweenCycles, runWaveCycle);
        },
      });

      allBadges.forEach((badge, i) => {
        waveTl.to(
          badge,
          {
            scale: 1.15,
            y: -4,
            filter: "grayscale(0%)",
            duration: highlightDuration / 2,
            ease: "power2.out",
          },
          i * perItemDelay,
        );
        waveTl.to(
          badge,
          {
            scale: 1,
            y: 0,
            filter: "grayscale(100%)",
            duration: highlightDuration / 2,
            ease: "power2.inOut",
          },
          i * perItemDelay + highlightDuration / 2,
        );
      });
    }

    runWaveCycle();
  }, 3000);

  // Continuous floating
  floatingAnim = gsap.to(monitorRef.value, {
    rotateY: -5,
    rotateX: 2,
    rotateZ: 0,
    duration: 6,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: 2.5,
  });
});

onUnmounted(() => {
  if (floatingAnim) floatingAnim.kill();
});
</script>

<template>
  <section
    ref="sectionRef"
    id="skills"
    class="py-16 md:py-24 bg-[#0A0D18] overflow-hidden min-h-screen flex items-center">
    <div
      class="relative w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-12 flex justify-center perspective-[2000px]">
      <!-- Paper Plane (flies toward screen) -->
      <div
        ref="planeRef"
        class="absolute z-[60] pointer-events-none"
        style="top: 50%; left: 50%; transform: translate(-50%, -50%)">
        <svg
          width="60"
          height="60"
          viewBox="0 0 24 24"
          fill="none"
          class="drop-shadow-[0_0_20px_rgba(59,130,246,0.8)]">
          <path
            d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
            fill="currentColor"
            class="text-accent" />
        </svg>
      </div>

      <!-- 3D Monitor Container -->
      <div
        ref="monitorRef"
        class="relative w-full max-w-[900px] rounded-xl sm:rounded-2xl border-[3px] sm:border-[8px] border-[#1A1A1A] bg-[#0A0D18] shadow-[0_20px_60px_rgba(0,0,0,0.8),inset_0_0_80px_rgba(0,0,0,0.8)] overflow-hidden"
        style="
          transform: perspective(2000px) rotateX(0deg) rotateY(-8deg)
            rotateZ(0.5deg);
          transform-style: preserve-3d;
        ">
        <!-- Crack overlay (appears on impact) -->
        <div
          ref="crackRef"
          class="absolute inset-0 z-[55] pointer-events-none flex items-center justify-center">
          <svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            fill="none"
            class="opacity-80">
            <path
              d="M100 60 L95 80 L80 85 L90 100 L75 120 L85 115 L90 140 L100 120 L105 145 L110 115 L125 130 L115 105 L130 95 L110 90 L120 70 L105 80 Z"
              stroke="white"
              stroke-width="2"
              fill="none" />
            <path
              d="M100 60 L100 40"
              stroke="white"
              stroke-width="1.5"
              opacity="0.6" />
            <path
              d="M75 120 L55 135"
              stroke="white"
              stroke-width="1.5"
              opacity="0.6" />
            <path
              d="M125 130 L145 145"
              stroke="white"
              stroke-width="1.5"
              opacity="0.6" />
            <path
              d="M130 95 L150 85"
              stroke="white"
              stroke-width="1.5"
              opacity="0.6" />
            <path
              d="M80 85 L60 75"
              stroke="white"
              stroke-width="1.5"
              opacity="0.6" />
            <circle cx="100" cy="100" r="3" fill="white" opacity="0.8" />
          </svg>
        </div>

        <!-- Screen glare reflection -->
        <div
          class="absolute inset-0 z-50 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent transform -skew-x-12 translate-x-1/4"></div>

        <!-- Inner Screen Content -->
        <div
          class="monitor-content relative w-full h-full p-5 sm:p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
          style="transform: translateZ(20px)">
          <!-- Screen Header/Text Left -->
          <div class="flex flex-col justify-center">
            <h2
              class="monitor-text text-3xl sm:text-4xl lg:text-5xl font-oswald font-black text-[#F2F2F2] leading-[1.1] tracking-tight mb-6">
              A robust
              <span
                class="text-accent italic font-serif font-light lowercase text-4xl sm:text-5xl lg:text-6xl relative z-10 before:content-[''] before:absolute before:bottom-2 before:left-0 before:w-full before:h-1 before:bg-accent/40 before:-z-10"
                >Arsenal</span
              ><br />
              of modern tech, <br />
              crafted for scale <br />
              and innovation.
            </h2>

            <div
              class="monitor-text flex flex-wrap gap-x-8 gap-y-4 text-xs font-mono uppercase tracking-widest text-text-secondary mt-8">
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
          <div
            class="relative flex flex-col justify-center h-full perspective-[1000px]">
            <!-- Orange/Accent backdrop panel matching the reference style -->
            <div
              class="absolute right-0 bottom-0 lg:-bottom-20 w-[90%] sm:w-[80%] h-[110%] bg-gradient-to-br from-accent/80 to-[#12182B] rounded-lg -z-10 shadow-2xl opacity-90"
              style="transform: translateZ(-30px)"></div>

            <div
              class="monitor-text relative z-10 bg-[#12182B]/90 backdrop-blur-md border border-white/10 p-4 sm:p-5 rounded-lg shadow-xl -ml-4 lg:-ml-8 mt-8 lg:mt-0"
              style="transform: translateZ(40px)">
              <div
                v-for="(group, gIdx) in techGroups"
                :key="gIdx"
                class="mb-5 last:mb-0 group/section">
                <div
                  class="flex justify-between items-end mb-2 border-b border-white/10 pb-1.5">
                  <h3
                    class="text-[#F2F2F2] font-oswald uppercase tracking-widest text-sm font-bold group-hover/section:text-accent transition-colors duration-300">
                    {{ group.title }}
                  </h3>
                  <span
                    class="text-[10px] text-text-secondary font-mono hidden sm:block"
                    >{{ group.description }}</span
                  >
                </div>

                <div class="flex flex-wrap gap-1.5 sm:gap-2">
                  <div
                    v-for="tech in group.techs"
                    :key="tech.name"
                    class="tech-badge-item flex items-center gap-1.5 px-2 py-1 bg-[#0A0D18] border border-white/5 rounded shadow-sm cursor-default">
                    <img
                      :src="tech.logo"
                      :alt="tech.name"
                      class="tech-logo-img w-3.5 h-3.5 object-cover rounded-sm" />
                    <span
                      class="text-[9px] sm:text-[10px] font-oswald tracking-wider uppercase text-white"
                      >{{ tech.name }}</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Tiny UI accents mimicking a browser/website inside the monitor -->
          <div
            class="absolute top-4 sm:top-6 left-6 sm:left-10 flex gap-4 text-[10px] font-mono text-text-secondary uppercase tracking-widest"
            style="transform: translateZ(10px)">
            <span>Rizky Y.A</span>
            <span>Digital Developer</span>
          </div>
          <div
            class="absolute top-4 sm:top-6 right-6 sm:left-auto flex gap-4 items-center"
            style="transform: translateZ(10px)">
            <span
              class="text-[10px] font-mono text-text-secondary border border-white/10 px-2 py-0.5 rounded"
              >EN</span
            >
            <span
              class="text-[10px] font-mono bg-white text-black px-3 py-1 rounded font-bold"
              >Tech Stack</span
            >
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
