<script setup lang="ts">
const emit = defineEmits<{
  (e: "handleClick"): void;
}>();

const props = defineProps<{
  btnType?: "button" | "submit" | "reset";
  className?: string;
}>();
</script>

<template>
  <button
    :type="props.btnType"
    :class="props.className"
    @click="emit('handleClick')"
    v-bind="$attrs"
  >
    <slot></slot>
  </button>
</template>
