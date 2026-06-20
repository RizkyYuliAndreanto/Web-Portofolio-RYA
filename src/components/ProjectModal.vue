<script setup>
import { ref, watch, onMounted, onUnmounted, nextTick } from "vue";
import gsap from "gsap";
import { X, ExternalLink, Github } from "lucide-vue-next";

const props = defineProps({
  project: { type: Object, default: null },
});

const emit = defineEmits(["close"]);

const backdropRef = ref(null);
const modalRef = ref(null);
const isVisible = ref(false);

function handleKeydown(e) {
  if (e.key === "Escape") closeModal();
}

function handleBackdropClick(e) {
  if (e.target === e.currentTarget) closeModal();
}

function closeModal() {
  if (!modalRef.value) {
    emit("close");
    return;
  }

  const tl = gsap.timeline({
    onComplete: () => {
      isVisible.value = false;
      emit("close");
    },
  });

  tl.to(modalRef.value, {
    rotateX: 10,
    rotateY: -6,
    scale: 0.85,
    opacity: 0,
    duration: 0.35,
    ease: "power3.in",
  });

  tl.to(backdropRef.value, { opacity: 0, duration: 0.25 }, "-=0.2");
}

watch(
  () => props.project,
  async (val) => {
    if (val) {
      document.body.style.overflow = "hidden";
      isVisible.value = true;
      await nextTick();

      if (modalRef.value && backdropRef.value) {
        gsap.fromTo(
          backdropRef.value,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: "power2.out" },
        );

        gsap.fromTo(
          modalRef.value,
          {
            rotateX: 18,
            rotateY: -10,
            scale: 0.6,
            opacity: 0,
            y: 50,
          },
          {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "back.out(1.3)",
            delay: 0.1,
          },
        );

        gsap.from(".modal-item", {
          y: 20,
          opacity: 0,
          stagger: 0.06,
          duration: 0.4,
          ease: "power3.out",
          delay: 0.35,
        });
      }
    } else {
      document.body.style.overflow = "";
      isVisible.value = false;
    }
  },
);

onMounted(() => window.addEventListener("keydown", handleKeydown));
onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
  document.body.style.overflow = "";
});
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isVisible"
      ref="backdropRef"
      @click="handleBackdropClick"
      class="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/85 backdrop-blur-xl"
      style="perspective: 1000px">
      <!-- Modal — wide, image on top full-width landscape -->
      <div
        ref="modalRef"
        class="relative w-full max-w-5xl"
        style="transform-style: preserve-3d">
        <div
          class="relative bg-[#0f1424] border border-white/10 rounded-2xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.7)]">
          <!-- Glare -->
          <div
            class="absolute inset-0 z-50 pointer-events-none rounded-2xl bg-gradient-to-br from-white/[0.03] via-transparent to-transparent"></div>

          <!-- Close -->
          <button
            @click="closeModal"
            class="absolute top-4 right-4 z-50 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300 hover:rotate-90">
            <X class="w-4 h-4" />
          </button>

          <!-- Image — full width, landscape ratio -->
          <div class="modal-item relative w-full bg-[#080b14] overflow-hidden">
            <img
              :src="project?.image"
              :alt="project?.title"
              class="w-full h-auto max-h-[280px] object-contain object-center" />
            <div
              class="absolute inset-0 bg-gradient-to-t from-[#0f1424] via-transparent to-transparent"></div>
            <!-- Number overlay -->
            <span
              class="absolute top-5 left-6 text-6xl md:text-7xl font-black font-oswald text-white/8">
              0{{ project?.id }}
            </span>
          </div>

          <!-- Content below image — compact -->
          <div class="p-5 md:p-7 -mt-6 relative z-10">
            <!-- Title row -->
            <div class="modal-item flex items-start justify-between gap-4 mb-4">
              <div>
                <h2
                  class="text-2xl md:text-3xl lg:text-4xl font-black font-oswald text-white uppercase tracking-wider leading-[0.95]">
                  {{ project?.title }}
                </h2>
                <p
                  class="text-xs md:text-sm text-white/50 leading-relaxed mt-2 max-w-2xl">
                  {{ project?.description }}
                </p>
              </div>
              <div class="flex gap-2 shrink-0 mt-1">
                <a
                  :href="project?.github"
                  class="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-accent hover:border-accent/50 transition-all duration-300">
                  <Github class="w-4 h-4" />
                </a>
                <a
                  :href="project?.demo"
                  class="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-accent hover:border-accent/50 transition-all duration-300">
                  <ExternalLink class="w-4 h-4" />
                </a>
              </div>
            </div>

            <!-- Tech + details in one row -->
            <div
              class="modal-item flex flex-col md:flex-row md:items-end gap-4 md:gap-6">
              <!-- Tech badges -->
              <div class="flex flex-wrap gap-2 shrink-0">
                <span
                  v-for="tech in project?.tech"
                  :key="tech"
                  class="px-3 py-1 text-[10px] font-oswald tracking-widest uppercase text-accent border border-accent/25 rounded-full bg-accent/5">
                  {{ tech }}
                </span>
              </div>

              <!-- Details inline -->
              <div class="flex-1 grid grid-cols-3 gap-2 md:gap-3">
                <div
                  class="p-2.5 md:p-3 rounded-lg bg-white/[0.03] border border-white/5">
                  <h4
                    class="text-[8px] md:text-[9px] font-oswald font-bold text-accent/80 uppercase tracking-widest mb-0.5">
                    Architecture
                  </h4>
                  <p
                    class="text-[10px] md:text-[11px] text-white/50 leading-snug">
                    {{ project?.architecture }}
                  </p>
                </div>
                <div
                  class="p-2.5 md:p-3 rounded-lg bg-white/[0.03] border border-white/5">
                  <h4
                    class="text-[8px] md:text-[9px] font-oswald font-bold text-accent/80 uppercase tracking-widest mb-0.5">
                    Challenge
                  </h4>
                  <p
                    class="text-[10px] md:text-[11px] text-white/50 leading-snug">
                    {{ project?.challenges }}
                  </p>
                </div>
                <div
                  class="p-2.5 md:p-3 rounded-lg bg-white/[0.03] border border-white/5">
                  <h4
                    class="text-[8px] md:text-[9px] font-oswald font-bold text-accent/80 uppercase tracking-widest mb-0.5">
                    Solution
                  </h4>
                  <p
                    class="text-[10px] md:text-[11px] text-white/50 leading-snug">
                    {{ project?.solution }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
