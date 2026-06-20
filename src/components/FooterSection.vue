<script setup>
import { Github, Linkedin, Instagram, Mail } from "lucide-vue-next";

const socials = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Mail, href: "#", label: "Email" },
];
</script>

<template>
  <footer class="py-12 px-6 border-t border-white/5">
    <div class="max-w-7xl mx-auto flex flex-col items-center gap-6">
      <div class="flex gap-4">
        <a
          v-for="social in socials"
          :key="social.label"
          :href="social.href"
          :aria-label="social.label"
          class="w-10 h-10 rounded-lg bg-surface/80 border border-white/10 flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all duration-300">
          <component :is="social.icon" class="w-5 h-5" />
        </a>
      </div>
      <p class="text-sm text-text-secondary">
        &copy; {{ new Date().getFullYear() }} Rizky Yuli Andreanto. Built with
        Vue & passion.
      </p>
    </div>
  </footer>
</template>
