<script setup>
import { onMounted, onUnmounted } from "vue";
import Lenis from "lenis";
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

let lenis = null;
let rafId = null;

onMounted(() => {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
  });

  function raf(time) {
    lenis.raf(time);
    rafId = requestAnimationFrame(raf);
  }
  rafId = requestAnimationFrame(raf);
});

onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId);
  if (lenis) lenis.destroy();
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
