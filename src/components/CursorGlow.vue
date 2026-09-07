<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const dot = ref(null);
let rafId = null;
let enabled = false;

function handleMouseMove(e) {
  if (!enabled || rafId) return;
  rafId = requestAnimationFrame(() => {
    rafId = null;
    // transform = compositor-only, tidak memicu layout (beda dengan left/top)
    dot.value.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
  });
}

onMounted(() => {
  enabled = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (enabled) window.addEventListener("mousemove", handleMouseMove, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("mousemove", handleMouseMove);
  if (rafId) cancelAnimationFrame(rafId);
});
</script>

<template>
  <div
    ref="dot"
    class="hidden lg:block fixed top-0 left-0 pointer-events-none z-[9999] w-8 h-8 rounded-full bg-accent/30 blur-sm will-change-transform"
    style="transform: translate(-100px, -100px)" />
</template>
