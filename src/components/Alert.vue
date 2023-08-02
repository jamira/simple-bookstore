<script lang="ts" setup>
import { computed } from "vue";
const { type, title, message } = defineProps({
  type: {
    type: String,
    default: "info",
    validator: (value: string) =>
      ["info", "success", "warning", "error"].includes(value),
  },
  title: {
    type: String,
  },
  message: {
    type: String,
  },
});

const getTypeClass = computed(() => {
  const typeClass: Record<string, string> = {
    info: "bg-blue-100 text-blue-500 border-blue-500",
    success: "bg-green-100 text-green-500 border-green-500",
    warning: "bg-yellow-100 text-yellow-500 border-yellow-500",
    error: "bg-red-100 text-red-500 border-red-500",
  };
  return typeClass[type] || "";
});
</script>

<template>
  <div :class="getTypeClass" class="p-4 border-l-4 mb-6">
    <p class="font-bold" v-if="title">{{ title }}</p>
    <p v-if="message">{{ message }}</p>
  </div>
</template>
