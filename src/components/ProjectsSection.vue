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
import projectImage from "../assets/Project-foto.png";

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
const carouselRef = ref(null);
const selectedProject = ref(null);
const currentIndex = ref(0);

const projects = [
  {
    id: 1,
    title: "Clyrova.id AI Suite",
    description:
      "Pipeline kecerdasan buatan untuk background removal presisi tinggi dan image upscaling, terintegrasi ke ekosistem layanan Clyr0va.id untuk optimasi kualitas aset visual secara otomatis.",
    tech: ["Python", "FastAPI", "AI/ML", "OpenCV"],
    image: projectImage,
    github: "https://github.com/RizkyYuliAndreanto",
    demo: "#",
    featured: true,
    architecture: "AI Pipeline with REST API integration",
    challenges:
      "Presisi tinggi pada background removal untuk berbagai jenis gambar",
    solution: "Custom deep learning model dengan post-processing refinement",
  },
  {
    id: 2,
    title: "Magetan Tourism Portal",
    description:
      "Platform pariwisata terintegrasi full-stack bekerja sama dengan Dinas Kebudayaan dan Pariwisata Magetan untuk mempromosikan destinasi wisata daerah melalui antarmuka web interaktif.",
    tech: ["Vue.js", "Express.js", "Node.js", "MySQL"],
    image: projectImage,
    github: "https://github.com/RizkyYuliAndreanto",
    demo: "#",
    featured: true,
    architecture: "Full-stack MVC with Vue.js SPA",
    challenges: "Menyajikan data wisata secara interaktif dan menarik",
    solution: "Interactive map integration dengan dynamic content management",
  },
  {
    id: 3,
    title: "Dosen Tracker",
    description:
      "Sistem pelacakan kehadiran akademik berbasis Computer Vision real-time di edge device dengan YOLOv8, ArcFace, dan deteksi anti-spoofing dalam arsitektur microservices.",
    tech: ["Python", "FastAPI", "React", "YOLOv8"],
    image: projectImage,
    github: "https://github.com/RizkyYuliAndreanto",
    demo: "#",
    featured: true,
    architecture: "Microservices with edge computing",
    challenges:
      "Real-time face recognition dengan anti-spoofing di edge device",
    solution: "Optimized inference pipeline dengan model quantization",
  },
  {
    id: 4,
    title: "Infografis Desa",
    description:
      "Portal web infografis untuk digitalisasi profil dan potensi daerah beberapa desa di Kabupaten Madiun, menyajikan data statistik dan informasi pelayanan masyarakat secara modern dan transparan.",
    tech: ["Vue.js", "Laravel", "PostgreSQL", "Chart.js"],
    image: projectImage,
    github: "https://github.com/RizkyYuliAndreanto",
    demo: "#",
    featured: false,
    architecture: "Monolithic Laravel with Vue.js frontend",
    challenges: "Visualisasi data kompleks yang mudah dipahami masyarakat",
    solution: "Interactive infographic dashboard dengan real-time data binding",
  },
  {
    id: 5,
    title: "Auto Content Creator",
    description:
      "Perangkat lunak pemrosesan video otomatis untuk YouTube Shorts dan TikTok dengan smart clipping, TTS, generator subtitle, dan penyusunan skrip pintar bertenaga AI.",
    tech: ["Python", "FFmpeg", "OpenAI", "TTS"],
    image: projectImage,
    github: "https://github.com/RizkyYuliAndreanto",
    demo: "#",
    featured: true,
    architecture: "Pipeline-based automation engine",
    challenges: "Koordinasi multi-step video processing secara efisien",
    solution: "DAG-based task orchestration dengan parallel processing",
  },
  {
    id: 6,
    title: "Manajemen Surat Instansi",
    description:
      "Aplikasi birokrasi digital berbasis Laravel dan Blade Template untuk alur pengajuan dokumen dan surat resmi ke instansi, dengan fokus pada efisiensi operasional.",
    tech: ["Laravel", "Blade", "MySQL", "Bootstrap"],
    image: projectImage,
    github: "https://github.com/RizkyYuliAndreanto",
    demo: "#",
    featured: false,
    architecture: "MVC Laravel with role-based access",
    challenges: "Alur approval multi-level yang kompleks",
    solution: "State machine pattern untuk document workflow management",
  },
  {
    id: 7,
    title: "E-Commerce UMKM",
    description:
      "Infrastruktur pasar digital yang dirancang khusus untuk memfasilitasi pelaku UMKM dalam mendigitalisasi etalase produk, mengelola transaksi, dan memperluas jangkauan pasar online.",
    tech: ["Vue.js", "Node.js", "PostgreSQL", "Redis"],
    image: projectImage,
    github: "https://github.com/RizkyYuliAndreanto",
    demo: "#",
    featured: true,
    architecture: "Microservices with event-driven communication",
    challenges: "Skalabilitas untuk multi-vendor marketplace",
    solution: "CQRS pattern dengan Redis caching untuk high-traffic handling",
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
