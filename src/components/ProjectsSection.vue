<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ExternalLink,
  Github,
  ChevronLeft,
  ChevronRight,
} from "lucide-vue-next";
import ProjectModal from "./ProjectModal.vue";
import projectImage from "../assets/Project-foto.webp";
import ParallaxStage from "./ParallaxStage.vue";
import { useParallax } from "../utils/useParallax.js";

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
const carouselRef = ref(null);
const selectedProject = ref(null);
const currentIndex = ref(0);

// v2 04-projects layers
const pxLayers = [
  { file: "/parallax-v2/04-projects/projects-l1-backdrop.webp", mobile: "/parallax/assets-mobile/04-projects/projects-l1-backdrop.webp", speed: 0.03, scale: 1.02 },
  { file: "/parallax-v2/04-projects/projects-l2-far.webp",        mobile: "/parallax/assets-mobile/04-projects/projects-l2-far.webp",        speed: 0.10, scale: 1.03 },
  { file: "/parallax-v2/04-projects/projects-l3-mid.webp",        mobile: "/parallax/assets-mobile/04-projects/projects-l3-mid.webp",        speed: 0.20, scale: 1.05 },
  { file: "/parallax-v2/04-projects/projects-l4-near.webp",       mobile: "/parallax/assets-mobile/04-projects/projects-l4-near.webp",       speed: 0.34, scale: 1.08 },
  { file: "/parallax-v2/04-projects/projects-l5-foreground.webp", mobile: "/parallax/assets-mobile/04-projects/projects-l5-foreground.webp", speed: 0.55, scale: 1.12 },
  { file: "/parallax-v2/shared/overlay-bokeh-soft.webp",      speed: 0.26, blend: "is-overlay" },
  { file: "/parallax-v2/shared/overlay-vignette-navy.webp",   speed: 0,    blend: "is-grade"   },
  { file: "/parallax-v2/shared/overlay-grain.webp",            speed: 0,    blend: "is-grain"   },
  { file: "/parallax-v2/shared/overlay-fade-top.webp",         speed: 0,    blend: "is-grade"   },
  { file: "/parallax-v2/shared/overlay-fade-bottom.webp",      speed: 0,    blend: "is-grade"   },
];

useParallax(sectionRef, { scrub: 2, travelMul: 50, zoomMul: 0.18 });

const projects = [
  {
    id: 8,
    title: "AcademiSync",
    description:
      "Real-time thesis supervision platform that recreates sitting next to your supervisor: 1-on-1 WebRTC video call, server-driven PDF sync, live annotations, and session management. Server-authoritative architecture — client is never trusted for identity, role, or permissions.",
    tech: ["Go", "React", "TypeScript", "PostgreSQL", "MinIO", "WebRTC"],
    image: projectImage,
    github: "https://github.com/RizkyYuliAndreanto",
    demo: "#",
    featured: true,
    architecture:
      "Go/Gin API + WebSocket signaling, React+TS+Konva frontend, PostgreSQL, MinIO private bucket, coturn TURN server",
    challenges:
      "PDF sync and live annotation must look identical on every screen while surviving NAT traversal",
    solution:
      "Server-authoritative page sync with normalized annotation coordinates, P2P DTLS/SRTP media with coturn TURN, JWT via HttpOnly cookie",
  },
  {
    id: 9,
    title: "Grandchatter Workspace",
    description:
      "Indonesian TTS & voice cloning studio — text-to-speech Bahasa Indonesia with zero-shot voice cloning. Runs on free Kaggle GPU or fully local on your laptop (model downloaded once, works offline).",
    tech: ["Python", "PyTorch", "Gradio", "Kaggle", "TTS", "LLM"],
    image: projectImage,
    github: "https://github.com/RizkyYuliAndreanto",
    demo: "#",
    featured: true,
    architecture:
      "Gradio UI + Kaggle notebook launcher, chunked TTS pipeline (normalizer → chunker → TTS → DSP merge), 4 tunnel modes, crash-safe batch with resume",
    challenges:
      "Producing 10–30 minute voice-overs on hardware without a real GPU",
    solution:
      "Offload inference to free Kaggle GPU (P100/T4) controlled via browser, anti-repetition chunking, resume-by-hash batch, 57 unit tests",
  },
  {
    id: 1,
    title: "Lecturer Tracker",
    description:
      "Thesis project: real-time edge-AI academic attendance system with face recognition, multi-camera streaming, and Telegram notifications, built as microservices with per-faculty embedded lecturer data.",
    tech: ["Python", "FastAPI", "React", "OpenCV", "YOLOv26", "ArcFace", "go2rtc", "SQLite"],
    image: projectImage,
    github: "https://github.com/RizkyYuliAndreanto",
    demo: "#",
    featured: true,
    architecture: "Edge-AI microservices with multi-camera streaming",
    challenges:
      "Real-time face recognition with anti-spoofing on resource-constrained edge devices",
    solution:
      "89% face detection (YOLOv26), 99% recognition (ArcFace), MiniFASNetV2 anti-spoofing — demonstrated on campus, ready for formal handover",
  },
  {
    id: 2,
    title: "Clyrova.id AI Suite",
    description:
      "AI-powered pipeline for high-precision background removal and image upscaling, integrated into the Clyr0va.id service ecosystem for automated visual asset quality optimization.",
    tech: ["Python", "FastAPI", "AI/ML", "OpenCV"],
    image: projectImage,
    github: "https://github.com/RizkyYuliAndreanto",
    demo: "#",
    featured: true,
    architecture: "AI Pipeline with REST API integration",
    challenges:
      "High-precision background removal across diverse image types",
    solution: "Custom deep learning model with post-processing refinement",
  },
  {
    id: 3,
    title: "Auto Content Creator",
    description:
      "Independently developed and deployed fork of a YouTube clipping project — extended smart-clipping features and added TTS, subtitle generation, and AI-assisted script drafting for YouTube Shorts and TikTok. Runs a locally installed Llama model so the script workflow stays fully local.",
    tech: ["Python", "FFmpeg", "OpenAI", "TTS", "Llama"],
    image: projectImage,
    github: "https://github.com/RizkyYuliAndreanto",
    demo: "#",
    featured: true,
    architecture: "Pipeline-based automation engine",
    challenges: "Efficient multi-step video processing coordination",
    solution: "DAG-based task orchestration with parallel processing",
  },
  {
    id: 4,
    title: "Magetan Tourism Portal",
    description:
      "Full-stack integrated tourism platform built in collaboration with the Magetan Culture and Tourism Office to promote regional destinations through an interactive web interface.",
    tech: ["Vue.js", "Express.js", "Node.js", "MySQL"],
    image: projectImage,
    github: "https://github.com/RizkyYuliAndreanto",
    demo: "#",
    featured: true,
    architecture: "Full-stack MVC with Vue.js SPA",
    challenges: "Presenting tourism data interactively and engagingly",
    solution: "Interactive map integration with dynamic content management",
  },
  {
    id: 5,
    title: "Village Infographics",
    description:
      "Web infographic portal for digitizing village profiles and local potential across several villages in Madiun Regency — independently designed, built, and deployed end-to-end (requirements, UI, backend, testing, production release) through my own studio, Ernesty Digital Labs, using full-stack Laravel.",
    tech: ["Vue.js", "Laravel", "PostgreSQL", "Chart.js"],
    image: projectImage,
    github: "https://github.com/RizkyYuliAndreanto",
    demo: "#",
    featured: false,
    architecture: "Monolithic Laravel with Vue.js frontend",
    challenges: "Making complex data understandable to the general public",
    solution: "Interactive infographic dashboard with real-time data binding",
  },
  {
    id: 6,
    title: "Institutional Mail Management",
    description:
      "Digital bureaucracy application built with Laravel and Blade templates for official document and letter submission workflows, focused on operational efficiency.",
    tech: ["Laravel", "Blade", "MySQL", "Bootstrap"],
    image: projectImage,
    github: "https://github.com/RizkyYuliAndreanto",
    demo: "#",
    featured: false,
    architecture: "MVC Laravel with role-based access",
    challenges: "Complex multi-level approval workflows",
    solution: "State machine pattern for document workflow management",
  },
  {
    id: 7,
    title: "SME E-Commerce",
    description:
      "Digital marketplace infrastructure designed to help small businesses digitize their product catalogs, manage transactions, and expand their online market reach.",
    tech: ["Vue.js", "Node.js", "PostgreSQL", "Redis"],
    image: projectImage,
    github: "https://github.com/RizkyYuliAndreanto",
    demo: "#",
    featured: true,
    architecture: "Microservices with event-driven communication",
    challenges: "Scalability for a multi-vendor marketplace",
    solution: "CQRS pattern with Redis caching for high-traffic handling",
  },
];

let ctx = null;
let floatingAnim = null;

function nextProject() {
  currentIndex.value = (currentIndex.value + 1) % projects.length;
  animateTransition();
}

function prevProject() {
  currentIndex.value =
    (currentIndex.value - 1 + projects.length) % projects.length;
  animateTransition();
}

function goToProject(index) {
  currentIndex.value = index;
  animateTransition();
}

function openProject(project) {
  selectedProject.value = project;
}

function closeProject() {
  selectedProject.value = null;
}

function animateTransition() {
  gsap.fromTo(
    carouselRef.value,
    { rotateY: 0, scale: 1 },
    {
      rotateY: 4,
      scale: 0.97,
      duration: 0.12,
      ease: "power2.in",
      onComplete: () => {
        gsap.to(carouselRef.value, {
          rotateY: 0,
          scale: 1,
          duration: 0.5,
          ease: "elastic.out(1.2, 0.5)",
        });
      },
    },
  );
}

function getCardTransform(index) {
  const diff = index - currentIndex.value;
  let normalizedDiff = diff;
  const halfLen = Math.floor(projects.length / 2);
  if (diff > halfLen) normalizedDiff -= projects.length;
  if (diff < -halfLen) normalizedDiff += projects.length;

  const isActive = normalizedDiff === 0;

  // 3D fan layout — centered
  let rotateY = normalizedDiff * 35;
  let translateZ = isActive ? 50 : -120 - Math.abs(normalizedDiff) * 50;
  let translateX = normalizedDiff * 55; // percentage based
  let translateY = Math.abs(normalizedDiff) * 5;
  let scale = isActive ? 1 : 0.8 - Math.abs(normalizedDiff) * 0.05;
  let opacity = isActive
    ? 1
    : Math.max(0.2, 0.6 - Math.abs(normalizedDiff) * 0.2);
  let zIndex = 20 - Math.abs(normalizedDiff);

  if (Math.abs(normalizedDiff) > 2) {
    opacity = 0;
    scale = 0.5;
  }

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  if (isMobile) {
    translateX = normalizedDiff * 140;
    rotateY = normalizedDiff * 25;
    if (Math.abs(normalizedDiff) > 1) {
      opacity = 0;
    }
  }

  return {
    transform: `translate(-50%, -50%) translateX(${translateX}%) translateY(${translateY}%) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
    opacity,
    zIndex,
    pointerEvents: isActive ? "auto" : "none",
  };
}

onMounted(() => {
  if (!sectionRef.value) return;

  ctx = gsap.context(() => {
    // Header chars fall
    gsap.from(".project-header-char", {
      y: -150,
      opacity: 0,
      rotation: () => gsap.utils.random(-60, 60),
      duration: 0.8,
      stagger: 0.025,
      ease: "bounce.out",
      scrollTrigger: {
        trigger: ".project-header-text",
        start: "top 85%",
        once: true,
      },
    });

    gsap.from(".project-header-desc", {
      x: 60,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".project-header-desc",
        start: "top 85%",
        once: true,
      },
    });

    // Carousel entrance
    gsap.from(carouselRef.value, {
      rotateX: 20,
      rotateY: -25,
      opacity: 0,
      duration: 1.5,
      ease: "power4.out",
      scrollTrigger: {
        trigger: carouselRef.value,
        start: "top 85%",
        once: true,
      },
    });

    // Cards stagger in with slam effect
    const cards = gsap.utils.toArray(".project-card");
    cards.forEach((card, i) => {
      gsap.from(card, {
        rotateY: i % 2 === 0 ? -120 : 120,
        rotateX: 20,
        scale: 0.3,
        opacity: 0,
        duration: 1.4,
        delay: i * 0.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: carouselRef.value,
          start: "top 85%",
          once: true,
        },
      });
    });

    // Floating animation - more dramatic
    floatingAnim = gsap.to(carouselRef.value, {
      rotateX: 2.5,
      rotateY: -3,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 2,
    });

    // Parallax header
    gsap.to(".project-header-text", {
      yPercent: -15,
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
  if (ctx) ctx.revert();
  if (floatingAnim) floatingAnim.kill();
});

function splitChars(text) {
  return text.split("");
}
</script>

<template>
  <section
    id="projects"
    ref="sectionRef"
    class="px-section relative py-24 md:py-32 min-h-screen">

    <!-- v2 Parallax Stage -->
    <ParallaxStage :layers="pxLayers" />

    <div class="px-content relative max-w-[90rem] mx-auto px-6">
      <!-- Header -->
      <div
        class="project-header-text flex flex-col lg:flex-row lg:items-end justify-between mb-16 lg:mb-24 gap-8">
        <h2
          class="text-5xl md:text-7xl lg:text-[6rem] font-black font-oswald text-[#F2F2F2] uppercase tracking-tighter leading-[0.9]">
          <span class="block text-accent">
            <span
              v-for="(char, ci) in splitChars('PROJECT')"
              :key="'p' + ci"
              class="project-header-char inline-block"
              >{{ char }}</span
            >
          </span>
          <span class="block">
            <span
              v-for="(char, ci) in splitChars('SHOWCASE.')"
              :key="'s' + ci"
              class="project-header-char inline-block"
              >{{ char }}</span
            >
          </span>
        </h2>
        <p
          class="project-header-desc text-xs sm:text-sm text-text-secondary uppercase tracking-[0.2em] leading-relaxed max-w-sm font-oswald lg:pb-2 text-left lg:text-right">
          SWIPE THROUGH FEATURED PROJECTS — EACH ONE BUILT TO SOLVE REAL-WORLD
          CHALLENGES WITH ELEGANT ARCHITECTURE.
        </p>
      </div>

      <!-- 3D Carousel -->
      <div class="relative w-full flex items-center justify-center mt-8">
        <!-- Prev -->
        <button
          @click="prevProject"
          class="absolute left-2 md:left-8 z-40 w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 hover:scale-110">
          <ChevronLeft class="w-5 h-5" />
        </button>

        <!-- 3D Scene -->
        <div
          ref="carouselRef"
          class="relative w-full max-w-[700px] h-[420px] sm:h-[480px] lg:h-[540px]"
          style="perspective: 1500px; transform-style: preserve-3d">
          <!-- Cards -->
          <div
            v-for="(project, index) in projects"
            :key="project.id"
            @click="
              currentIndex === index ? openProject(project) : goToProject(index)
            "
            class="project-card absolute top-1/2 left-1/2 w-[280px] sm:w-[350px] lg:w-[420px] h-[360px] sm:h-[420px] lg:h-[480px] cursor-pointer transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)]"
            :style="getCardTransform(index)"
            style="transform-style: preserve-3d">
            <!-- Card -->
            <div
              class="w-full h-full rounded-xl overflow-hidden"
              :class="
                currentIndex === index
                  ? 'shadow-[0_25px_60px_rgba(59,130,246,0.15),0_10px_30px_rgba(0,0,0,0.7)]'
                  : 'shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
              ">
              <div
                class="w-full h-full bg-[#12182B] border rounded-xl flex flex-col"
                :class="
                  currentIndex === index ? 'border-accent/30' : 'border-white/5'
                ">
                <!-- Image area (top half) -->
                <div
                  class="relative flex-1 min-h-0 overflow-hidden rounded-t-xl">
                  <img
                    :src="project.image"
                    :alt="project.title"
                    class="w-full h-full object-cover object-center transition-opacity duration-500"
                    :class="
                      currentIndex === index ? 'opacity-100' : 'opacity-40'
                    " />
                  <!-- Number overlay -->
                  <span
                    class="absolute top-3 left-4 text-3xl sm:text-4xl font-black font-oswald transition-colors duration-500"
                    :class="
                      currentIndex === index
                        ? 'text-accent/60'
                        : 'text-white/15'
                    ">
                    0{{ index + 1 }}
                  </span>
                  <!-- Action buttons -->
                  <div
                    class="absolute top-3 right-4 flex gap-2 transition-opacity duration-500"
                    :class="
                      currentIndex === index ? 'opacity-100' : 'opacity-0'
                    ">
                    <a
                      :href="project.github"
                      @click.stop
                      class="text-white/70 hover:text-white transition-colors">
                      <Github class="w-4 h-4" />
                    </a>
                    <a
                      :href="project.demo"
                      @click.stop
                      class="text-white/70 hover:text-white transition-colors">
                      <ExternalLink class="w-4 h-4" />
                    </a>
                  </div>
                </div>

                <!-- Info area (bottom) -->
                <div class="p-4 sm:p-5">
                  <h3
                    class="text-xl sm:text-2xl lg:text-3xl font-bold font-oswald uppercase tracking-wider mb-2 leading-[0.9] transition-colors duration-500"
                    :class="
                      currentIndex === index ? 'text-white' : 'text-white/30'
                    ">
                    {{ project.title }}
                  </h3>
                  <p
                    class="text-[9px] sm:text-[10px] text-text-secondary uppercase tracking-[0.12em] leading-relaxed mb-3 font-oswald max-w-sm transition-opacity duration-500"
                    :class="
                      currentIndex === index ? 'opacity-100' : 'opacity-0'
                    ">
                    {{ project.description }}
                  </p>
                  <div
                    class="flex flex-wrap gap-1.5 transition-opacity duration-500"
                    :class="
                      currentIndex === index ? 'opacity-100' : 'opacity-0'
                    ">
                    <span
                      v-for="tech in project.tech"
                      :key="tech"
                      class="px-2 py-0.5 text-[8px] sm:text-[9px] font-oswald tracking-widest uppercase border border-white/10 rounded text-text-secondary">
                      {{ tech }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Next -->
        <button
          @click="nextProject"
          class="absolute right-2 md:right-8 z-40 w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 hover:scale-110">
          <ChevronRight class="w-5 h-5" />
        </button>
      </div>

      <!-- Indicators -->
      <div class="flex justify-center gap-3 mt-12">
        <button
          v-for="(p, idx) in projects"
          :key="idx"
          @click="goToProject(idx)"
          class="h-1 rounded-full transition-all duration-500"
          :class="
            currentIndex === idx
              ? 'w-10 bg-accent'
              : 'w-4 bg-white/20 hover:bg-white/40'
          "></button>
      </div>
    </div>

    <ProjectModal :project="selectedProject" @close="closeProject" />
  </section>
</template>
