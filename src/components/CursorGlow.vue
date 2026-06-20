<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const x = ref(-100);
const y = ref(-100);
let rafId = null;

function handleMouseMove(e) {
  if (rafId) cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(() => {
    x.value = e.clientX;
    y.value = e.clientY;
  });
}

onMounted(() => window.addEventListener("mousemove", handleMouseMove));
onUnmounted(() => {
  window.removeEventListener("mousemove", handleMouseMove);
  if (rafId) cancelAnimationFrame(rafId);
});
</script>

<template>
  <div
    class="hidden lg:block fixed pointer-events-none z-[9999] w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/30 blur-sm transition-[left,top] duration-75 ease-out"
    :style="{ left: x + 'px', top: y + 'px' }" />
</template>
