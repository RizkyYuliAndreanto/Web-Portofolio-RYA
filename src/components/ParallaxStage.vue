<template>
  <!-- aria-hidden: purely decorative, screen readers skip this -->
  <div class="px-stage" aria-hidden="true">
    <div
      v-for="layer in layers"
      :key="layer.file"
      class="px-layer"
      :class="layer.blend"
      :data-speed="layer.speed"
      :data-scale="layer.scale"
      :data-mobile="layer.mobile || undefined"
      :style="{
        backgroundImage: `url(${layer.file})`,
        '--bg-mobile': layer.mobile ? `url(${layer.mobile})` : undefined,
      }"
    />
  </div>
</template>

<script setup>
defineProps({
  /**
   * Array of layer objects:
   * { file: string, speed: number, scale: number, blend?: string, mobile?: string }
   *
   * blend values: undefined | 'is-overlay' | 'is-grade' | 'is-grain'
   */
  layers: {
    type: Array,
    required: true,
  },
});
</script>
