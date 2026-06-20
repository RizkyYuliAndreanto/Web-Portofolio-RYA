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

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
const carouselRef = ref(null);
const selectedProject = ref(null);
const currentIndex = ref(0);

const projects = [
  {
    id: 1,
    title: "AI Chat Platform",
    description:
      "Real-time AI-powered communication with NLP capabilities and streaming responses",
    tech: ["Vue", "Python", "FastAPI", "OpenAI"],
    image: "/placeholder-project.svg",
    github: "#",
    demo: "#",
    featured: true,
    architecture: "Microservices with event-driven communication",
    challenges: "Handling real-time streaming responses",
    solution: "Implemented SSE with backpressure handling",
  },
  {
    id: 2,
    title: "E-Commerce Engine",
    description:
      "Scalable marketplace platform with advanced inventory management and real-time sync",
    tech: ["Vue", "Node.js", "PostgreSQL", "Redis"],
    image: "/placeholder-project.svg",
    github: "#",
    demo: "#",
    featured: true,
    architecture: "Monolithic modular with CQRS",
    challenges: "High-traffic inventory management",
    solution: "Redis-based distributed locking",
  },
  {
    id: 3,
    title: "DevOps Dashboard",
    description:
      "Infrastructure monitoring & CI/CD visualization for large scale enterprise systems",
    tech: ["React", "Go", "Docker", "K8s"],
    image: "/placeholder-project.svg",
    github: "#",
    demo: "#",
    featured: false,
    architecture: "Event-sourced microservices",
    challenges: "Real-time metrics aggregation",
    solution: "Time-series DB with streaming pipeline",
  },
  {
    id: 4,
    title: "ML Pipeline Framework",
    description:
      "End-to-end machine learning orchestration and automated deployment workflows",
    tech: ["Python", "TensorFlow", "Airflow", "AWS"],
    image: "/placeholder-project.svg",
    github: "#",
    demo: "#",
    featured: true,
    architecture: "DAG-based pipeline orchestration",
    challenges: "Model versioning and reproducibility",
    solution: "Custom artifact store with lineage tracking",
  },
  {
    id: 5,
    title: "Real-time Analytics",
    description:
      "Stream processing analytics platform for processing millions of events per second",
    tech: ["Kafka", "Spark", "ClickHouse", "Vue"],
    image: "/placeholder-project.svg",
    github: "#",
    demo: "#",
    featured: false,
    architecture: "Lambda architecture",
    challenges: "Sub-second query latency at scale",
    solution: "Materialized views with incremental updates",
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
        trigger: sectionRef.value,
        start: "top 70%",
      },
    });

    gsap.from(".project-header-desc", {
      x: 60,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top 65%",
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
        trigger: sectionRef.value,
        start: "top 55%",
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
        delay: i * 0.12,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.value,
          start: "top 50%",
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

function handleCardHover(e, index) {
  if (currentIndex.value !== index) return;
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  const rotateY = ((x - centerX) / centerX) * 8;
  const rotateX = ((centerY - y) / centerY) * 8;

  gsap.to(card, {
    rotateX: rotateX,
    rotateY: rotateY,
    scale: 1.03,
    duration: 0.3,
    ease: "power2.out",
    overwrite: "auto",
  });
}

function handleCardLeave(e, index) {
  if (currentIndex.value !== index) return;
  gsap.to(e.currentTarget, {
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    duration: 0.5,
    ease: "elastic.out(1, 0.5)",
    overwrite: "auto",
  });
}
</script>

<template>
  <section
    id="projects"
    ref="sectionRef"
    class="py-24 md:py-32 bg-[#0A0D18] overflow-hidden relative min-h-screen">
    <div class="max-w-[90rem] mx-auto px-6">
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
            @mousemove="handleCardHover($event, index)"
            @mouseleave="handleCardLeave($event, index)"
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
                class="w-full h-full bg-[#12182B] border rounded-xl p-6 sm:p-8 flex flex-col justify-between"
                :class="
                  currentIndex === index ? 'border-accent/30' : 'border-white/5'
                ">
                <!-- Top -->
                <div class="flex justify-between items-start">
                  <span
                    class="text-4xl sm:text-5xl lg:text-6xl font-black font-oswald transition-colors duration-500"
                    :class="
                      currentIndex === index
                        ? 'text-accent/40'
                        : 'text-white/15'
                    ">
                    0{{ index + 1 }}
                  </span>
                  <div
                    class="flex gap-3"
                    :class="
                      currentIndex === index ? 'opacity-100' : 'opacity-0'
                    "
                    style="transition: opacity 0.5s">
                    <a
                      :href="project.github"
                      @click.stop
                      class="text-text-secondary hover:text-white transition-colors">
                      <Github class="w-5 h-5" />
                    </a>
                    <a
                      :href="project.demo"
                      @click.stop
                      class="text-text-secondary hover:text-white transition-colors">
                      <ExternalLink class="w-5 h-5" />
                    </a>
                  </div>
                </div>

                <!-- Bottom content -->
                <div>
                  <h3
                    class="text-2xl sm:text-3xl lg:text-4xl font-bold font-oswald uppercase tracking-wider mb-3 leading-[0.9] transition-colors duration-500"
                    :class="
                      currentIndex === index ? 'text-white' : 'text-white/30'
                    ">
                    {{ project.title }}
                  </h3>
                  <p
                    class="text-[10px] sm:text-xs text-text-secondary uppercase tracking-[0.15em] leading-relaxed mb-5 font-oswald max-w-sm transition-opacity duration-500"
                    :class="
                      currentIndex === index ? 'opacity-100' : 'opacity-0'
                    ">
                    {{ project.description }}
                  </p>
                  <div
                    class="flex flex-wrap gap-2 transition-opacity duration-500"
                    :class="
                      currentIndex === index ? 'opacity-100' : 'opacity-0'
                    ">
                    <span
                      v-for="tech in project.tech"
                      :key="tech"
                      class="px-2.5 py-1 text-[9px] font-oswald tracking-widest uppercase border border-white/10 rounded text-text-secondary">
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
