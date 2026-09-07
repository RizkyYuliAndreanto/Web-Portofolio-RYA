<template>
  <!-- aria-hidden: purely decorative, screen readers skip this -->
  <div ref="stageRef" class="px-stage" aria-hidden="true">
    <div
      v-for="layer in layers"
      :key="layer.file"
      class="px-layer"
      :class="layer.blend"
      :data-speed="layer.speed"
      :data-scale="layer.speed ? layer.scale : undefined"
      :data-desktop="layer.file"
      :data-mobile="layer.mobile || undefined"
    />
  </div>
</template>

<script setup>
/**
 * ParallaxStage — lazy-load variant.
 *
 * SEBELUM: semua 90 layer (4.9 MB webp) dipasang backgroundImage saat render
 * pertama → browser download+decode semuanya sekaligus di load awal walau di
 * bawah fold → jank, layout berubah saat gambar masuk ("kadang muncul kadang
 * tidak"), ScrollTrigger.refresh terpicu berulang.
 *
 * SESUDAH: stage section yang terlihat (hero) reveal langsung; stage di bawah
 * fold baru mengisi gambarnya saat mendekati viewport (rootMargin 50%).
 * Layer pertama tiap section dipasang segera, sisanya 2 frame berikutnya.
 *
 * Mobile swap tetap jalan: CSS `.px-layer[data-mobile]` memakai
 * var(--bg-mobile) yang baru di-set saat reveal (attr data-mobile tetap ada).
 */
import { ref, onMounted, onBeforeUnmount } from "vue";

defineProps({
  layers: {
    type: Array,
    required: true,
  },
});

const stageRef = ref(null);
let observer = null;

onMounted(() => {
  const stageEl = stageRef.value;
  if (!stageEl) return;
  const nodes = [...stageEl.children];

  const reveal = () => {
    nodes.forEach((n, i) => {
      if (n.dataset.revealed) return;
      n.dataset.revealed = "1";
      const set = () => {
        n.style.backgroundImage = `url(${n.dataset.desktop})`;
        if (n.dataset.mobile) {
          n.style.setProperty("--bg-mobile", `url(${n.dataset.mobile})`);
        }
      };
      // Backdrop + far layer dipasang segera (section tampak utuh),
      // sisanya 2 frame berikutnya agar decode tidak menumpuk satu frame.
      i < 2 ? set() : requestAnimationFrame(() => requestAnimationFrame(set));
    });
  };

  // Section yang sudah terlihat saat mount (hero) → langsung.
  const rect = stageEl.getBoundingClientRect();
  if (rect.top < window.innerHeight && rect.bottom > 0) {
    reveal();
  } else {
    // Mulai muat setengah viewport sebelum section masuk layar.
    observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          reveal();
          observer.disconnect();
          observer = null;
        }
      },
      { rootMargin: "50% 0px" },
    );
    observer.observe(stageEl);
  }
});

onBeforeUnmount(() => observer?.disconnect());
</script>
