<script setup>
import { onMounted, onUnmounted } from "vue";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./components/Navbar.vue";
import HeroSection from "./components/HeroSection.vue";
import ProfileSection from "./components/ProfileSection.vue";
import ServicesSection from "./components/ServicesSection.vue";
import ProjectsSection from "./components/ProjectsSection.vue";
import TechStackSection from "./components/TechStackSection.vue";
import ExperienceTimeline from "./components/ExperienceTimeline.vue";
import ContactSection from "./components/ContactSection.vue";
import FooterSection from "./components/FooterSection.vue";
import CursorGlow from "./components/CursorGlow.vue";

gsap.registerPlugin(ScrollTrigger);

let lenis = null;

onMounted(() => {
  // ─── Lenis smooth scroll ────────────────────────────────────────────────
  lenis = new Lenis({
    duration: 1.1,
    easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: false,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.5,
  });

  // ─── Lenis v1.3+ ↔ GSAP ScrollTrigger sync (cara yang benar) ──────────
  // Gunakan GSAP ticker sebagai RAF loop tunggal — jangan campur dengan rAF manual
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // Sync scroll position ke ScrollTrigger setiap Lenis update
  lenis.on("scroll", () => ScrollTrigger.update());

  // ─── ScrollTrigger.refresh() yang AMAN: tunggu DOM + Fonts + Gambar ────
  // FIX UTAMA: parallax gagal di browser baru karena gambar belum termuat
  // saat refresh pertama dipanggil. Solusi: tunggu semua resource siap dulu.
  const doRefresh = () => ScrollTrigger.refresh(true);

  // Step 1: tunggu fonts selesai (font mempengaruhi layout/tinggi elemen)
  document.fonts.ready.then(() => {
    // Step 2: tunggu semua <img> selesai load
    const imgs = [...document.querySelectorAll("img")];
    const imagePromises = imgs
      .filter((img) => !img.complete)
      .map(
        (img) =>
          new Promise((resolve) => {
            img.addEventListener("load", resolve, { once: true });
            img.addEventListener("error", resolve, { once: true }); // jangan hang kalau gambar error
          })
      );

    Promise.all(imagePromises).then(() => {
      // Step 3: tunggu 1 frame lagi agar CSS/GSAP sudah settle
      requestAnimationFrame(() => {
        doRefresh();
      });
    });
  });

  // Fallback: refresh juga saat window load (cover kasus background-image parallax)
  window.addEventListener("load", doRefresh, { once: true });
});

onUnmounted(() => {
  if (lenis) lenis.destroy();
  if (rafId) cancelAnimationFrame(rafId);
  ScrollTrigger.killAll();
  gsap.ticker.remove(() => {});
});
</script>

<template>
  <CursorGlow />
  <Navbar />
  <main>
    <HeroSection />
    <ProfileSection />
    <ServicesSection />
    <ProjectsSection />
    <TechStackSection />
    <ExperienceTimeline />
    <ContactSection />
  </main>
  <FooterSection />
</template>
