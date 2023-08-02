<script setup lang="ts">
const { src, className, alt } = defineProps({
  src: { type: String, required: true },
  className: { type: String, default: () => "" },
  alt: { type: String, default: () => "" },
});

const getImageUrl = (imageId: string) => {
   return new URL(`../assets/${imageId}.jpg`, import.meta.url).href
}

</script>

<template>
  <img :class="className" :src="getImageUrl(src)" :alt="alt" />
</template>
    