<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";

const { type, placeholder, className, label } = defineProps<{
  type?: string;
  placeholder?: string;
  className?: string;
  label?: string;
}>();

const emit = defineEmits<{
  (e: "setInputValue", value: string): void;
}>();

const errorMessage: Ref<string> = ref("");

const handleInput = (event: Event) => {
  const inputElement = event.target as HTMLInputElement;
  const inputValue = inputElement.value;
  const inputType = inputElement.type;
  const inputs = { value: inputValue, type: inputType };
  emit("setInputValue", inputValue);
  validateInput(inputs);
};

const validateInput = (inputs: { value: string; type: string }) => {
  const { value, type } = inputs;
  const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  if (type === "email" && !emailPattern.test(value)) {
    errorMessage.value = "Invalid email.";
  } else if (value.length < 3) {
    errorMessage.value = "Input must be at least 3 characters long.";
  } else {
    errorMessage.value = "";
  }
};
</script>

<template>
  <div :class="className">
    <label
      :for="label.toLowerCase()"
      v-if="label"
      class="block text-sm font-bold mb-2"
      >{{ label }}</label
    >
    <input
      v-bind="$attrs"
      :type="type"
      :placeholder="placeholder"
      class="w-full h-12 py-3 px-4 text-sm placeholder-black font-bold border-2 outline-none rounded-md"
      :class="
        errorMessage
          ? 'border-red-500 focus:ring-red-500 focus:border-red-500 focus:ring-1'
          : 'border-blueGray-800'
      "
      @input="handleInput"
    />
    <div v-if="errorMessage" class="tinline-flex text-sm text-red-700">
      {{ errorMessage }}
    </div>
  </div>
</template>
