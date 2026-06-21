<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import gsap from "gsap";

const isVisible = ref(true);
const isMobileOpen = ref(false);
const isScrolled = ref(false);
let lastScroll = 0;

const links = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

function handleScroll() {
  const current = window.scrollY;
  isScrolled.value = current > 50;
  isVisible.value = current < lastScroll || current < 50;
  lastScroll = current;
}

function scrollTo(href) {
  isMobileOpen.value = false;
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll);

  // Navbar entrance animation
  gsap.from(".nav-brand", {
    y: -20,
    opacity: 0,
    duration: 0.8,
    delay: 0.2,
    ease: "power3.out",
  });

  gsap.from(".nav-link", {
    y: -20,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    delay: 0.3,
    ease: "power3.out",
  });
});

onUnmounted(() => window.removeEventListener("scroll", handleScroll));
</script>

<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    :class="[
      isVisible ? 'translate-y-0' : '-translate-y-full',
      isScrolled ? 'py-2' : 'py-6 lg:py-8',
    ]">
    <!-- Transparent Background that becomes blurred on scroll -->
    <div
      class="absolute inset-0 transition-opacity duration-500"
      :class="
        isScrolled
          ? 'backdrop-blur-md bg-background/80 border-b border-white/5 opacity-100'
          : 'opacity-0'
      "></div>

    <div
      class="relative max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
      <!-- Brand -->
      <a href="#" class="nav-brand group relative z-10 flex items-center gap-2">
        <span
          class="text-xl sm:text-2xl lg:text-3xl font-black font-oswald tracking-widest text-text"
          >RYA<span class="text-accent">.</span></span
        >
      </a>

      <!-- Desktop Links -->
      <div class="hidden lg:flex items-center gap-10 z-10">
        <a
          v-for="link in links"
          :key="link.href"
          @click.prevent="scrollTo(link.href)"
          class="nav-link relative text-sm font-medium tracking-widest uppercase text-text/70 hover:text-text transition-colors cursor-pointer group py-2">
          {{ link.label }}
          <!-- Hover indicator line -->
          <div
            class="absolute bottom-0 left-0 w-full h-px bg-accent scale-x-0 origin-right transition-transform duration-300 ease-out group-hover:scale-x-100 group-hover:origin-left"></div>
        </a>
      </div>

      <!-- Mobile Menu Toggle -->
      <button
        @click="isMobileOpen = !isMobileOpen"
        class="lg:hidden relative z-20 text-text/70 hover:text-text p-2 transition-colors">
        <div class="w-6 h-5 flex flex-col justify-between">
          <span
            class="w-full h-0.5 bg-current transition-all duration-300 origin-left"
            :class="isMobileOpen ? 'rotate-45' : ''"></span>
          <span
            class="w-full h-0.5 bg-current transition-all duration-300"
            :class="isMobileOpen ? 'opacity-0' : ''"></span>
          <span
            class="w-full h-0.5 bg-current transition-all duration-300 origin-left"
            :class="isMobileOpen ? '-rotate-45' : ''"></span>
        </div>
      </button>
    </div>

    <!-- Mobile Menu Overlay -->
    <div
      class="fixed inset-0 bg-background/98 backdrop-blur-xl z-10 lg:hidden transition-all duration-500 flex flex-col justify-center items-center gap-8"
      :class="
        isMobileOpen
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      ">
      <a
        v-for="(link, index) in links"
        :key="link.href"
        @click.prevent="scrollTo(link.href)"
        class="text-2xl font-oswald tracking-widest text-text uppercase hover:text-accent transition-colors cursor-pointer"
        :style="{
          transform: isMobileOpen ? 'translateY(0)' : 'translateY(20px)',
          opacity: isMobileOpen ? 1 : 0,
          transitionDelay: `${100 + index * 50}ms`,
          transitionDuration: '500ms',
        }">
        {{ link.label }}
      </a>
    </div>
  </nav>
</template>
