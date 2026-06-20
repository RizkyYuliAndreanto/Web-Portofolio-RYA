<script setup>
import { ref, onMounted, computed } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-vue-next";
import ProjectModal from "./ProjectModal.vue";

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
const selectedProject = ref(null);
const currentIndex = ref(0);

const projects = [
  {
    id: 1,
    title: "AI Chat Platform",
    description: "Real-time AI-powered communication with NLP capabilities and streaming responses",
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
    description: "Scalable marketplace platform with advanced inventory management and real-time sync",
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
    description: "Infrastructure monitoring & CI/CD visualization for large scale enterprise systems",
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
    description: "End-to-end machine learning orchestration and automated deployment workflows",
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
    description: "Stream processing analytics platform for processing millions of events per second",
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

function nextProject() {
  if (currentIndex.value < projects.length - 1) {
    currentIndex.value++;
  } else {
    currentIndex.value = 0; // Loop back
  }
}

function prevProject() {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  } else {
    currentIndex.value = projects.length - 1; // Loop to end
  }
}

function goToProject(index) {
  currentIndex.value = index;
}

function openProject(project) {
  selectedProject.value = project;
}

function closeProject() {
  selectedProject.value = null;
}

function getCardStyle(index) {
  const diff = index - currentIndex.value;
  // Handle circular layout conceptually
  let normalizedDiff = diff;
  const halfLen = Math.floor(projects.length / 2);

  // Allow wrapping calculation for a continuous feel
  if (diff > halfLen) normalizedDiff -= projects.length;
  if (diff < -halfLen) normalizedDiff += projects.length;

  const isActive = normalizedDiff === 0;
  const zIndex = 30 - Math.abs(normalizedDiff);

  // Fan effect logic
  // Center: scale 1, y 0, rot 0
  // Next/Prev: scale 0.85, y 20, rot +/- 15deg, translate X +/- 60%
  // Far Next/Prev: scale 0.7, y 40, rot +/- 25deg, translate X +/- 110%

  let scale = 1;
  let translateX = 0;
  let translateY = 0;
  let rotate = 0;
  let opacity = 1;

  if (isActive) {
    scale = 1;
    translateX = 0;
    translateY = 0;
    rotate = 0;
    opacity = 1;
  } else if (normalizedDiff === 1) {
    scale = 0.85;
    translateX = 70; // percentage
    translateY = 15; // percentage
    rotate = 8; // degrees
    opacity = 0.6;
  } else if (normalizedDiff === -1) {
    scale = 0.85;
    translateX = -70;
    translateY = 15;
    rotate = -8;
    opacity = 0.6;
  } else if (normalizedDiff > 1) {
    scale = 0.7;
    translateX = 120 + (normalizedDiff - 2) * 20;
    translateY = 30 + (normalizedDiff - 2) * 10;
    rotate = 15 + (normalizedDiff - 2) * 5;
    opacity = 0.2;
  } else if (normalizedDiff < -1) {
    scale = 0.7;
    translateX = -120 - (Math.abs(normalizedDiff) - 2) * 20;
    translateY = 30 + (Math.abs(normalizedDiff) - 2) * 10;
    rotate = -15 - (Math.abs(normalizedDiff) - 2) * 5;
    opacity = 0.2;
  }

  // Adjust for mobile screens
  const isMobile = window.innerWidth < 768;
  if (isMobile) {
    translateX = translateX * 0.7;
  }

  return {
    transform: `translateX(calc(-50% + ${translateX}%)) translateY(${translateY}%) scale(${scale}) rotate(${rotate}deg)`,
    zIndex,
    opacity,
    pointerEvents: isActive ? 'auto' : 'none'
  };
}

onMounted(() => {
  if (!sectionRef.value) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.value,
      start: "top 70%",
    }
  });

  tl.from(".project-header-text", {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power4.out"
  })
  .from(".carousel-container", {
    y: 100,
    opacity: 0,
    duration: 1.2,
    ease: "power4.out"
  }, "-=0.6");
});
</script>

<template>
  <section id="projects" ref="sectionRef" class="py-24 md:py-32 bg-[#0A0D18] overflow-hidden relative">

    <div class="max-w-[100rem] mx-auto px-6">
      <!-- Editorial Header -->
      <div class="flex flex-col lg:flex-row lg:items-end justify-between mb-16 lg:mb-24 gap-8">
        <h2 class="project-header-text text-5xl md:text-7xl lg:text-[6rem] font-black font-oswald text-[#F2F2F2] uppercase tracking-tighter leading-[0.9]">
          <span class="block text-accent">PROJECT</span>
          <span class="block">SHOWCASE.</span>
        </h2>
        <p class="project-header-text text-xs sm:text-sm text-text-secondary uppercase tracking-[0.2em] leading-relaxed max-w-sm font-oswald lg:pb-2 text-left lg:text-right">
          SWIPE THROUGH FEATURED PROJECTS — EACH ONE BUILT TO SOLVE REAL-WORLD CHALLENGES WITH ELEGANT ARCHITECTURE.
        </p>
      </div>

      <!-- Carousel Container -->
      <div class="carousel-container relative w-full h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] flex items-center justify-center mt-12">

        <!-- Prev Button -->
        <button @click="prevProject" class="absolute left-0 md:left-12 lg:left-24 z-40 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors">
          <ChevronLeft class="w-6 h-6" />
        </button>

        <!-- Cards Area -->
        <div class="relative w-full max-w-[320px] sm:max-w-[450px] md:max-w-[550px] lg:max-w-[650px] h-full mx-auto perspective-[2000px]">

          <div
            v-for="(project, index) in projects"
            :key="project.id"
            @click="currentIndex === index ? openProject(project) : goToProject(index)"
            class="absolute top-1/2 left-1/2 w-full h-[320px] sm:h-[350px] lg:h-[420px] origin-bottom transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] rounded-sm overflow-hidden cursor-pointer"
            :class="currentIndex === index ? 'shadow-[0_20px_50px_rgba(0,0,0,0.8)] border-accent/40' : 'border-white/5'"
            :style="getCardStyle(index)"
            style="margin-top: -160px; /* half height adjustment */"
          >
            <!-- Card Body (Editorial Style) -->
            <div class="w-full h-full bg-[#12182B] border border-inherit rounded-sm p-6 lg:p-10 flex flex-col justify-between">

              <!-- Top Bar -->
              <div class="flex justify-between items-start">
                <span class="text-3xl lg:text-5xl font-black font-oswald text-white/20">
                  0{{ index + 1 }}
                </span>

                <div class="flex gap-4" v-if="currentIndex === index">
                  <a :href="project.github" @click.stop class="text-text-secondary hover:text-white transition-colors">
                    <Github class="w-5 h-5" />
                  </a>
                  <a :href="project.demo" @click.stop class="text-text-secondary hover:text-white transition-colors">
                    <ExternalLink class="w-5 h-5" />
                  </a>
                </div>
              </div>

              <!-- Content -->
              <div class="mt-auto">
                <h3 class="text-3xl lg:text-4xl font-bold font-oswald text-[#F2F2F2] uppercase tracking-wider mb-4 transition-colors leading-[0.9]" :class="currentIndex === index ? 'text-white' : 'text-white/30'">
                  {{ project.title }}
                </h3>
                <p class="text-[10px] sm:text-xs text-text-secondary uppercase tracking-[0.15em] leading-relaxed mb-6 font-oswald max-w-md transition-opacity" :class="currentIndex === index ? 'opacity-100' : 'opacity-0'">
                  {{ project.description }}
                </p>

                <!-- Tech Stack -->
                <div class="flex flex-wrap gap-2 transition-opacity" :class="currentIndex === index ? 'opacity-100' : 'opacity-0'">
                  <span
                    v-for="tech in project.tech"
                    :key="tech"
                    class="px-2 py-1 text-[9px] font-oswald tracking-widest uppercase border border-white/10 rounded-sm text-text-secondary">
                    {{ tech }}
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>

        <!-- Next Button -->
        <button @click="nextProject" class="absolute right-0 md:right-12 lg:right-24 z-40 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors">
          <ChevronRight class="w-6 h-6" />
        </button>

      </div>

      <!-- Indicators -->
      <div class="flex justify-center gap-3 mt-12">
        <button
          v-for="(p, idx) in projects"
          :key="idx"
          @click="goToProject(idx)"
          class="h-1 rounded-sm transition-all duration-300"
          :class="currentIndex === idx ? 'w-12 bg-accent' : 'w-4 bg-white/20 hover:bg-white/40'">
        </button>
      </div>

    </div>

    <ProjectModal :project="selectedProject" @close="closeProject" />
  </section>
</template>

<style scoped>
/* Ensure 3D context for smooth rotation */
.perspective-[2000px] {
  perspective: 2000px;
  transform-style: preserve-3d;
}
</style>
