<script lang="ts" setup>

const { qty } = defineProps({
    qty: Number
})

const emit = defineEmits<{
  (e: 'handleIncrement'): void
  (e: 'handleDecrement'): void
}>()

</script>

<template>
    <div
        class="inline-flex items-center px-4 font-semibold font-heading text-gray-500 border border-blueGray-800 focus:ring-blue-300 focus:border-blue-300 rounded-md">
        <button class="py-2 hover:text-gray-700 bg-gray-100" @click="emit('handleDecrement')" :disabled="qty === 1">
            <svg width="12" height="12" viewBox="0 0 12 2" fill="none" xmlns="http://www.w3.org/2000/svg"
                data-config-id="auto-svg-1-1">
                <g opacity="0.35">
                    <rect x="12" width="2" height="12" transform="rotate(90 12 0)" fill="currentColor"></rect>
                </g>
            </svg>
        </button>
        <input
            class="w-12 m-0 px-2 py-4 text-center border-0 focus:ring-transparent focus:outline-none rounded-md text-black"
            type="text" :value="qty">
        <button class="py-2 hover:text-gray-700 bg-gray-100"  @click="emit('handleIncrement')">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"
                data-config-id="auto-svg-2-1">
                <g opacity="0.35">
                    <rect x="5" width="2" height="12" fill="currentColor"></rect>
                    <rect x="12" y="5" width="2" height="12" transform="rotate(90 12 5)" fill="currentColor"></rect>
                </g>
            </svg>
        </button>
    </div>
</template>