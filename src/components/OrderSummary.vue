<script lang="ts" setup>
import { useCounterBooks } from '../stores/books.ts'
import { ref } from 'vue';
import type { Ref } from 'vue'

const bookStore = useCounterBooks();
const shipping: Ref<number> = ref(10) 
</script>
<template>
    <div class="p-6 bg-gray-100">
        <h2 class="mb-6 text-2xl font-bold font-heading text-black">Cart totals
        </h2>
        <div class="flex mb-8 items-center justify-between pb-5 border-b border-gray-200">
            <span class="text-gray-500">Subtotal</span>
            <span class="text-lg font-bold font-heading text-black">{{
                `$${bookStore.orderTotal.toFixed()}` }}</span>
        </div>
        <h4 class="mb-2 text-lg font-bold font-heading text-black">Shipping</h4>
        <div class="flex mb-2 justify-between items-center">
            <span class="text-gray-500">Next day</span>
            <span class="text-lg font-bold font-heading text-black">{{ `$${shipping.toFixed()}` }}</span>
        </div>
        <div class="flex mb-10 justify-between items-center">
            <span class="text-gray-500">Shipping to Singapore</span>
            <span class="text-lg font-bold font-heading text-black">-</span>
        </div>
        <div class="flex mb-10 justify-between items-center">
            <span class="text-xl font-bold font-heading text-black">Order total</span>
            <span class="text-lg font-bold font-heading text-black">{{ `$${(bookStore.orderTotal + shipping).toFixed()}`
            }}</span>
        </div>
        <slot name="call-to-action"></slot>
    </div>
</template>