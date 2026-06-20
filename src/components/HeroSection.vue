<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const canvasRef = ref(null);
const heroRef = ref(null);
const contentRef = ref(null);
const photoRef = ref(null);
const currentTitle = ref("");
const showCursor = ref(true);

const titles = [
  "Fullstack Developer",
  "Backend Engineer",
  "AI Engineer",
  "Software Engineer",
];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeTimeout = null;
let scene, camera, renderer, particles, animationId;
let mouseVec = { x: 0, y: 0 };

function typeEffect() {
  const current = titles[titleIndex];
  if (!isDeleting) {
    currentTitle.value = current.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      typeTimeout = setTimeout(() => {
        isDeleting = true;
        typeEffect();
      }, 2000);
      return;
    }
    typeTimeout = setTimeout(typeEffect, 80);
  } else {
    currentTitle.value = current.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      typeTimeout = setTimeout(typeEffect, 500);
      return;
    }
    typeTimeout = setTimeout(typeEffect, 40);
  }
}

function initThree() {
  if (!canvasRef.value) return;
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer({
    canvas: canvasRef.value,
    alpha: true,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const count = 600;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    colors[i * 3] = 0.1 + Math.random() * 0.15;
    colors[i * 3 + 1] = 0.35 + Math.random() * 0.2;
    colors[i * 3 + 2] = 0.85 + Math.random() * 0.15;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.025,
    vertexColors: true,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending,
  });

  particles = new THREE.Points(geometry, material);
  scene.add(particles);

  function animate() {
    animationId = requestAnimationFrame(animate);
    particles.rotation.y += 0.0002;
    particles.rotation.x += 0.0001;
    particles.rotation.y += mouseVec.x * 0.0001;
    particles.rotation.x += mouseVec.y * 0.0001;
    renderer.render(scene, camera);
  }
  animate();
}

function handleResize() {
  if (!renderer || !camera) return;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function handleMouseMove(e) {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  mouseVec.x = (e.clientX - centerX) / centerX;
  mouseVec.y = (e.clientY - centerY) / centerY;

  // Subtle parallax on photo
  if (photoRef.value) {
    const moveX = mouseVec.x * 8;
    const moveY = mouseVec.y * 5;
    photoRef.value.style.transform = `translate(${moveX}px, ${moveY}px)`;
  }
}

function scrollToSection(id) {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

onMounted(() => {
  typeEffect();
  initThree();
  window.addEventListener("resize", handleResize);
  window.addEventListener("mousemove", handleMouseMove);

  setInterval(() => {
    showCursor.value = !showCursor.value;
  }, 530);

  // GSAP animations for new layout
  const tl = gsap.timeline();

  tl.from(".hero-label", {
    x: -30,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
  })
  .from(".hero-link", {
    x: -30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: "power3.out",
  }, "-=0.6")
  .from(".hero-link-active", {
    x: -30,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
  }, "-=0.6")
  .from(".hero-controls", {
    y: 20,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
  }, "-=0.4")
  .from(".hero-photo", {
    y: 100,
    opacity: 0,
    duration: 1.5,
    ease: "power4.out",
  }, 0.2)
  .to(".text-line", {
    y: 0,
    duration: 1.2,
    stagger: 0.15,
    ease: "power4.out",
  }, 0.5)
  .from(".hero-desc", {
    y: 30,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  }, 1.2);

  if (heroRef.value) {
    gsap.to(heroRef.value, {
      scale: 0.92,
      opacity: 0.4,
      scrollTrigger: {
        trigger: heroRef.value,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }
});

onUnmounted(() => {
  if (typeTimeout) clearTimeout(typeTimeout);
  if (animationId) cancelAnimationFrame(animationId);
  if (renderer) renderer.dispose();
  window.removeEventListener("resize", handleResize);
  window.removeEventListener("mousemove", handleMouseMove);
});
</script>

<template>
  <section
    ref="heroRef"
    class="relative min-h-dvh flex flex-col lg:flex-row overflow-hidden bg-background pt-16 lg:pt-0">

    <!-- Three.js particle canvas background -->
    <canvas ref="canvasRef" class="absolute inset-0 w-full h-full z-0 opacity-20" />

    <!-- Content container with magazine layout -->
    <div
      ref="contentRef"
      class="relative z-10 w-full h-full min-h-dvh flex flex-col lg:flex-row">

      <!-- Left side: Navigation / Categories -->
      <div class="hidden lg:flex flex-col justify-center w-1/4 pl-12 gap-6 z-20">
        <div class="hero-label text-xs tracking-widest font-bold text-text-secondary mb-8">RIZKY YULI ANDREANTO</div>
        <nav class="flex flex-col gap-12 relative mt-4">
          <a href="#about" class="hero-link text-2xl font-bold font-oswald text-text opacity-70 hover:opacity-100 transition-opacity tracking-wider uppercase">ABOUT ME</a>

          <!-- Highlighted Category -->
          <div class="hero-link-active relative w-max">
            <!-- Glitch / Glow Effect -->
            <div class="absolute -inset-4 bg-gradient-to-r from-accent/20 to-transparent -z-10 blur-md rounded-lg"></div>
            <a href="#skills" class="text-[2rem] font-bold font-oswald text-text tracking-wider uppercase relative drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">TECH STACK</a>
            <!-- Active indicator line -->
            <div class="absolute -left-12 top-1/2 -translate-y-1/2 w-8 h-[3px] bg-accent"></div>
          </div>
        </nav>

        <!-- Navigation indicators -->
        <div class="hero-controls flex gap-2 mt-20 items-center">
          <button class="p-1 hover:text-accent transition-colors"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg></button>
          <button class="p-1 hover:text-accent transition-colors"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg></button>
          <div class="w-8 h-0.5 bg-text opacity-50 ml-2"></div>
          <div class="w-8 h-0.5 bg-text opacity-20 hover:opacity-100 transition-opacity cursor-pointer"></div>
          <div class="w-8 h-0.5 bg-text opacity-20 hover:opacity-100 transition-opacity cursor-pointer"></div>
        </div>
      </div>

      <!-- Center/Right: Main Image and Big Typography -->
      <div class="relative w-full lg:w-3/4 flex-grow flex justify-center lg:justify-end items-end h-screen px-4 lg:px-0">

        <!-- Main Portrait - Full Bleed -->
        <div class="hero-photo absolute bottom-0 left-1/2 lg:left-[45%] -translate-x-1/2 lg:-translate-x-1/2 w-[90%] sm:w-[70%] md:w-[60%] lg:w-[65%] xl:w-[55%] h-[75vh] lg:h-[95vh] z-10">
          <img
            src="../assets/HERO-NO-BG.png"
            alt="Rizky Yuli Andreanto"
            class="w-full h-full object-cover object-top lg:object-contain lg:object-bottom drop-shadow-2xl" />
        </div>

        <!-- Big Typography Overlay -->
        <div class="hero-typography absolute top-1/2 lg:top-1/3 -translate-y-1/2 left-0 right-0 lg:left-auto lg:-translate-y-0 flex flex-col justify-center items-center lg:items-end lg:pr-12 xl:pr-24 z-20 pointer-events-none">
          <div class="text-center lg:text-right font-oswald drop-shadow-2xl">
            <h1 class="text-[3.5rem] sm:text-6xl md:text-7xl lg:text-[7rem] xl:text-[8rem] font-bold text-text leading-[0.9] tracking-tighter uppercase mix-blend-difference lg:mix-blend-normal">
              <span class="block overflow-hidden"><span class="block translate-y-full text-line">THE BEST FOR</span></span>
              <span class="block overflow-hidden"><span class="block translate-y-full text-line">ALL YOUR</span></span>
              <span class="block overflow-hidden"><span class="block translate-y-full text-line text-accent">SOFTWARE</span></span>
              <span class="block overflow-hidden"><span class="block translate-y-full text-line">NEEDS</span></span>
            </h1>
          </div>
        </div>

        <!-- Subtitle/Description in bottom right -->
        <div class="hero-desc absolute bottom-8 lg:bottom-16 right-6 lg:right-12 xl:right-24 max-w-[280px] lg:max-w-sm text-right z-20">
          <p class="text-xs lg:text-sm text-text-secondary uppercase tracking-[0.2em] leading-loose mix-blend-difference lg:mix-blend-normal">
            CHOOSE ME TO BUILD YOUR SCALABLE SYSTEMS AND INNOVATIVE DIGITAL SOLUTIONS WITH CUTTING-EDGE AI TECHNOLOGY.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes floatOrb {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  25% {
    transform: translate(30px, -20px) scale(1.05);
  }
  50% {
    transform: translate(-20px, 20px) scale(0.95);
  }
  75% {
    transform: translate(20px, 10px) scale(1.02);
  }
}
</style>
