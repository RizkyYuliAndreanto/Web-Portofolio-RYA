<script setup>
import { ref } from "vue";
import { Github, Linkedin, Instagram, Mail } from "lucide-vue-next";
import ParallaxStage from "./ParallaxStage.vue";
import { useParallax } from "../utils/useParallax.js";

const footerRef = ref(null);

const socials = [
  { icon: Github,    href: "https://github.com/RizkyYuliAndreanto",            label: "GitHub"    },
  { icon: Linkedin,  href: "https://www.linkedin.com/in/rizky-yuli-andreanto/", label: "LinkedIn"  },
  { icon: Instagram, href: "https://www.instagram.com/eryry07",                 label: "Instagram" },
  { icon: Mail,      href: "mailto:rizkyandreanto123@gmail.com",                 label: "Email"     },
];

// v2 08-footer layers (3 layers as per manifest)
const pxLayers = [
  { file: "/parallax-v2/08-footer/footer-l1-backdrop.jpg", mobile: "/parallax-v2/08-footer/footer-l1-backdrop.png", speed: 0.03, scale: 1.02 },
  { file: "/parallax-v2/08-footer/footer-l2-far.png",       mobile: "/parallax-v2/08-footer/footer-l2-far.png",       speed: 0.10, scale: 1.03 },
  { file: "/parallax-v2/08-footer/footer-l3-near.png",      mobile: "/parallax-v2/08-footer/footer-l3-near.png",      speed: 0.34, scale: 1.08 },
  { file: "/parallax-v2/shared/overlay-vignette-navy.png",  speed: 0, blend: "is-grade" },
  { file: "/parallax-v2/shared/overlay-grain.png",           speed: 0, blend: "is-grain" },
  { file: "/parallax-v2/shared/overlay-fade-top.png",        speed: 0, blend: "is-grade" },
];

useParallax(footerRef, { scrub: 2, travelMul: 38, zoomMul: 0.12 });
</script>

<template>
  <footer ref="footerRef" class="px-section relative" style="min-height: unset;">
    <!-- v2 Parallax Stage -->
    <ParallaxStage :layers="pxLayers" />

    <!-- Footer content -->
    <div class="px-content relative py-12 px-6" style="min-height: unset;">
      <div class="max-w-7xl mx-auto flex flex-col items-center gap-6">
        <div class="flex gap-4">
          <a
            v-for="social in socials"
            :key="social.label"
            :href="social.href"
            :aria-label="social.label"
            target="_blank"
            rel="noopener noreferrer"
            class="w-10 h-10 rounded-lg bg-surface/80 border border-white/10 flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent/30 hover:shadow-[0_0_15px_rgba(78,134,200,0.2)] transition-all duration-300">
            <component :is="social.icon" class="w-5 h-5" />
          </a>
        </div>
        <p class="text-sm text-text-secondary">
          &copy; {{ new Date().getFullYear() }} Rizky Yuli Andreanto. Built with
          Vue &amp; passion.
        </p>
      </div>
    </div>
  </footer>
</template>
