<script setup>
import { watch, onMounted, onUnmounted } from "vue";
import { X } from "lucide-vue-next";

const props = defineProps({
  project: { type: Object, default: null },
});

const emit = defineEmits(["close"]);

function handleKeydown(e) {
  if (e.key === "Escape") emit("close");
}

function handleBackdropClick(e) {
  if (e.target === e.currentTarget) emit("close");
}

watch(
  () => props.project,
  (val) => {
    if (val) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
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
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0">
      <div
        v-if="project"
        @click="handleBackdropClick"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-lg">
        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95">
          <div
            v-if="project"
            class="relative w-full max-w-2xl max-h-[80vh] overflow-y-auto bg-surface border border-white/10 rounded-2xl p-6 md:p-8">
            <button
              @click="emit('close')"
              class="absolute top-4 right-4 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-text-secondary hover:text-text transition-colors">
              <X class="w-5 h-5" />
            </button>

            <div class="mb-6">
              <div class="h-48 rounded-xl overflow-hidden mb-6 bg-background">
                <img
                  :src="project.image"
                  :alt="project.title"
                  class="w-full h-full object-cover" />
              </div>
              <h2 class="text-2xl md:text-3xl font-bold text-text mb-2">
                {{ project.title }}
              </h2>
              <p class="text-text-secondary">{{ project.description }}</p>
            </div>

            <div class="space-y-5">
              <div>
                <h4
                  class="text-sm font-semibold text-accent mb-2 uppercase tracking-wider">
                  Tech Stack
                </h4>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="tech in project.tech"
                    :key="tech"
                    class="px-3 py-1 text-sm bg-accent/10 text-accent border border-accent/20 rounded-lg">
                    {{ tech }}
                  </span>
                </div>
              </div>

              <div>
                <h4
                  class="text-sm font-semibold text-accent mb-2 uppercase tracking-wider">
                  Architecture
                </h4>
                <p class="text-sm text-text-secondary">
                  {{ project.architecture }}
                </p>
              </div>

              <div>
                <h4
                  class="text-sm font-semibold text-accent mb-2 uppercase tracking-wider">
                  Challenges
                </h4>
                <p class="text-sm text-text-secondary">
                  {{ project.challenges }}
                </p>
              </div>

              <div>
                <h4
                  class="text-sm font-semibold text-accent mb-2 uppercase tracking-wider">
                  Solution
                </h4>
                <p class="text-sm text-text-secondary">
                  {{ project.solution }}
                </p>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
