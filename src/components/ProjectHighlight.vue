<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github } from "lucide-vue-next";

gsap.registerPlugin(ScrollTrigger);

const containerRef = ref(null);
const activeIndex = ref(0);
let ctx = null;
let autoInterval = null;

const projects = [
  {
    id: 1,
    title: "AI Chat Platform",
    subtitle:
      "Real-time AI-powered communication with NLP capabilities and streaming responses",
    tech: ["Vue", "Python", "FastAPI", "OpenAI"],
    github: "#",
    demo: "#",
  },
  {
    id: 2,
    title: "E-Commerce Engine",
    subtitle:
      "Scalable marketplace platform handling high-traffic inventory with distributed locking",
    tech: ["Vue", "Node.js", "PostgreSQL", "Redis"],
    github: "#",
    demo: "#",
  },
  {
    id: 3,
    title: "ML Pipeline Framework",
    subtitle:
      "End-to-end machine learning orchestration with model versioning and lineage tracking",
    tech: ["Python", "TensorFlow", "Airflow", "AWS"],
    github: "#",
    demo: "#",
  },
  {
    id: 4,
    title: "Real-time Analytics",
    subtitle:
      "Stream processing analytics platform with sub-second query latency at scale",
    tech: ["Kafka", "Spark", "ClickHouse", "Vue"],
    github: "#",
    demo: "#",
  },
  {
    id: 5,
    title: "Smart Home IoT",
    subtitle:
      "IoT device management and automation with edge computing and offline-first sync",
    tech: ["Rust", "MQTT", "TimescaleDB", "Vue"],
    github: "#",
    demo: "#",
  },
];

// Carousel: each card slides in from right, active is center/full
const getCardStyle = (index) => {
  const total = projects.length;
  const diff = index - activeIndex.value;

  // Normalize for circular behavior
  let offset = diff;
  if (offset > Math.floor(total / 2)) offset -= total;
  if (offset < -Math.floor(total / 2)) offset += total;

  const translateX = offset * 110; // percent-based spread
  const rotation = offset * 8;
  const translateZ = -Math.abs(offset) * 100;
  const scale = offset === 0 ? 1 : 0.7 - Math.abs(offset) * 0.05;
  const opacity =
    offset === 0 ? 1 : Math.max(0.3, 0.6 - Math.abs(offset) * 0.15);
  const zIndex = offset === 0 ? 10 : 5 - Math.abs(offset);

  return {
    transform: `translateX(${translateX}%) perspective(1200px) translateZ(${translateZ}px) rotateY(${rotation}deg) scale(${scale})`,
    opacity,
    zIndex,
  };
};

function next() {
  activeIndex.value = (activeIndex.value + 1) % projects.length;
}

function prev() {
  activeIndex.value =
    (activeIndex.value - 1 + projects.length) % projects.length;
}

function startAutoRotate() {
  stopAutoRotate();
  autoInterval = setInterval(next, 4000);
}

function stopAutoRotate() {
  if (autoInterval) {
    clearInterval(autoInterval);
    autoInterval = null;
  }
}

onMounted(() => {
  if (!containerRef.value) return;

  ctx = gsap.context(() => {
    gsap.from(".showcase-title", {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.value,
        start: "top 80%",
      },
    });

    ScrollTrigger.create({
      trigger: containerRef.value,
      start: "top 60%",
      end: "bottom 40%",
      onEnter: () => startAutoRotate(),
      onLeave: () => stopAutoRotate(),
      onEnterBack: () => startAutoRotate(),
      onLeaveBack: () => stopAutoRotate(),
    });
  }, containerRef.value);
});

onUnmounted(() => {
  if (ctx) ctx.revert();
  stopAutoRotate();
});
</script>

<template>
  <section
    ref="containerRef"
    class="relative overflow-hidden bg-background py-24 md:py-32"
    @mouseenter="stopAutoRotate"
    @mouseleave="startAutoRotate">
    <div class="showcase-title px-6 mb-16 text-center">
      <h2 class="text-3xl md:text-5xl font-bold text-text mb-4">
        Project <span class="text-accent">Showcase</span>
      </h2>
      <p class="text-text-secondary max-w-2xl mx-auto">
        Swipe through featured projects — each one built to solve real-world
        challenges.
      </p>
    </div>

    <!-- Glow behind active card -->
    <div
      class="absolute left-1/2 top-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-3xl opacity-25 pointer-events-none"
      style="
        background: radial-gradient(
          ellipse,
          rgba(59, 130, 246, 0.5),
          rgba(96, 165, 250, 0.15),
          transparent 70%
        );
      " />

    <!-- 3D Carousel -->
    <div
      class="relative w-full max-w-5xl mx-auto h-[350px] sm:h-[400px] md:h-[440px] flex items-center justify-center">
      <div
        v-for="(project, index) in projects"
        :key="project.id"
        class="absolute w-[85%] sm:w-[70%] md:w-[60%] aspect-video rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ease-out"
        :class="[
          index === activeIndex
            ? 'ring-2 ring-accent/50 shadow-[0_0_60px_rgba(59,130,246,0.25)]'
            : 'pointer-events-none',
        ]"
        :style="getCardStyle(index)"
        @click="activeIndex = index">
        <!-- Card background -->
        <div
          class="absolute inset-0 bg-surface border border-white/10 rounded-2xl" />

        <!-- Active card: full content visible -->
        <div
          v-if="index === activeIndex"
          class="relative z-10 w-full h-full p-6 sm:p-8 md:p-10 flex flex-col justify-between">
          <!-- Top: number badge -->
          <div class="flex items-start justify-between">
            <div
              class="px-3 py-1 rounded-lg bg-accent/15 border border-accent/25 text-accent text-xs font-semibold">
              Project {{ index + 1 }} / {{ projects.length }}
            </div>
            <div class="flex gap-2">
              <a
                :href="project.github"
                @click.stop
                class="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-text-secondary hover:text-text hover:border-accent/30 transition-colors">
                <Github class="w-4 h-4" />
              </a>
              <a
                :href="project.demo"
                @click.stop
                class="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-text-secondary hover:text-text hover:border-accent/30 transition-colors">
                <ExternalLink class="w-4 h-4" />
              </a>
            </div>
          </div>

          <!-- Bottom: title, description, tech -->
          <div>
            <h3
              class="text-xl sm:text-2xl md:text-3xl font-bold text-text mb-2">
              {{ project.title }}
            </h3>
            <p
              class="text-sm md:text-base text-text-secondary mb-4 line-clamp-2">
              {{ project.subtitle }}
            </p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tech in project.tech"
                :key="tech"
                class="px-3 py-1 text-xs bg-accent/10 text-accent border border-accent/20 rounded-lg">
                {{ tech }}
              </span>
            </div>
          </div>
        </div>

        <!-- Inactive cards: minimal content -->
        <div
          v-else
          class="relative z-10 w-full h-full p-5 flex flex-col justify-end opacity-60">
          <h3 class="text-sm md:text-base font-bold text-text truncate">
            {{ project.title }}
          </h3>
        </div>
      </div>

      <!-- Navigation arrows -->
      <button
        @click="prev"
        class="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-surface/80 border border-white/10 flex items-center justify-center text-text-secondary hover:text-text hover:border-accent/30 transition-colors backdrop-blur-sm"
        aria-label="Previous project">
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        @click="next"
        class="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-surface/80 border border-white/10 flex items-center justify-center text-text-secondary hover:text-text hover:border-accent/30 transition-colors backdrop-blur-sm"
        aria-label="Next project">
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    <!-- Dot indicators -->
    <div class="flex justify-center gap-2 mt-8">
      <button
        v-for="(project, index) in projects"
        :key="'dot-' + project.id"
        @click="activeIndex = index"
        class="h-2.5 rounded-full transition-all duration-300"
        :class="
          index === activeIndex
            ? 'bg-accent w-8'
            : 'bg-white/20 hover:bg-white/40 w-2.5'
        "
        :aria-label="'Show project ' + project.title" />
    </div>
  </section>
</template>
