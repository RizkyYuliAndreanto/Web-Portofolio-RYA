<template>
  <div class="tech-hud">
    <div
      v-for="(cat, i) in categories"
      :key="cat.id"
      class="hud-category"
      :class="{ 'is-active': activeFace === cat.faceIndex }"
      @click="$emit('select-category', cat.faceIndex)"
      tabindex="0"
      @keydown.enter="$emit('select-category', cat.faceIndex)">
      <div class="hud-category__indicator" :style="{ '--cat-color': cat.accent }"></div>
      <div class="hud-category__info">
        <span class="hud-category__label">{{ cat.label }}</span>
        <span class="hud-category__count">{{ cat.items.length }} tools</span>
      </div>
      <div class="hud-category__items" v-if="activeFace === cat.faceIndex">
        <span
          v-for="(item, idx) in cat.items"
          :key="item.name"
          class="hud-item"
          :style="{ '--item-color': item.color, animationDelay: `${idx * 0.1}s` }">
          {{ item.short }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { categories } from "./techStackData.js"

defineProps({
  activeFace: { type: Number, default: -1 },
})

defineEmits(["select-category"])
</script>

<style>
.tech-hud {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

@media (max-width: 767px) {
  .tech-hud {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 6px;
    justify-content: center;
  }
}

.hud-category {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 8px;
  background: rgba(19, 28, 48, 0.7);
  border: 1px solid rgba(27, 37, 64, 0.6);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.22, 0.61, 0.36, 1);
  flex-wrap: wrap;
}

.hud-category:hover,
.hud-category:focus-visible {
  background: rgba(19, 28, 48, 0.95);
  border-color: rgba(78, 134, 200, 0.4);
}

.hud-category:focus-visible {
  outline: 2px solid #2A5FE0;
  outline-offset: 2px;
}

.hud-category.is-active {
  background: rgba(42, 95, 224, 0.15);
  border-color: rgba(42, 95, 224, 0.5);
}

@media (max-width: 767px) {
  .hud-category {
    padding: 6px 10px;
    gap: 6px;
  }
}

.hud-category__indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--cat-color, #4E86C8);
  flex-shrink: 0;
}

.hud-category__info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

@media (max-width: 767px) {
  .hud-category__info {
    flex-direction: row;
    gap: 6px;
    align-items: center;
  }
}

.hud-category__label {
  font: 600 11px/1 monospace;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #DCE4F0;
}

.hud-category__count {
  font: 400 9px/1 monospace;
  color: #8FA2BD;
}

.hud-category__items {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 6px;
  padding-top: 6px;
  border-top: 1px solid rgba(27, 37, 64, 0.6);
  width: 100%;
}

.hud-item {
  font: 500 8px/1 monospace;
  padding: 3px 6px;
  border-radius: 4px;
  background: rgba(14, 21, 34, 0.9);
  color: var(--item-color, #DCE4F0);
  border: 1px solid rgba(27, 37, 64, 0.8);
  animation: hud-item-float 3.2s ease-in-out infinite;
}

.hud-item:nth-child(2n) { animation-duration: 3.8s; }
.hud-item:nth-child(3n) { animation-duration: 4.2s; }
.hud-item:nth-child(5n) { animation-duration: 4.6s; }

@keyframes hud-item-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-2px); }
}
</style>
