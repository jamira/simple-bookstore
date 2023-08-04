<script lang="ts" setup>
import { useRouter } from "vue-router";
import { useCounterBooks } from "../stores/books.ts";
import { onUnmounted } from "vue";

import CartItems from "../components/CartItems.vue";
import Button from "../components/Button.vue";
import OrderSummary from "../components/OrderSummary.vue";

const router = useRouter();
const bookStore = useCounterBooks();

onUnmounted(() => {
  bookStore.clearError()
})
</script>

<template>
  <div v-if="bookStore.cartCount > 0">
    <div class="flex flex-wrap items-center -mx-4">
      <div class="w-full xl:w-8/12 mb-8 xl:mb-0 px-4">
        <CartItems :data="bookStore.cart" />
      </div>
      <div class="w-full xl:w-4/12 px-4">
        <OrderSummary>
          <template #call-to-action>
            <div class="flex gap-2.5">
              <Button
              type="button"
              @handleClick="router.push('/')"
              class="block w-full py-2 bg-zinc-200 hover:bg-zinc-400 text-center font-bold font-heading rounded-md hover:border-none focus:border-none"
            >
              <span class="text">Continue Shopping</span>
            </Button>
            <Button
              type="button"
              @handleClick="router.push('/checkout')"
              class="block w-full py-2 bg-black hover:bg-gray-500 text-center text-white font-bold font-heading rounded-md hover:border-none focus:border-none"
            >
              <span class="text">Proceed to Checkout</span>
            </Button>
            </div>

          </template>
        </OrderSummary>
      </div>
    </div>
  </div>
  <div v-else class="flex flex-col items-center h-96 justify-center">
    <h3 class="text-black font-medium text-3xl mb-6">No Cart Items</h3>
    <img src="../assets/empty.svg" alt="No Cart Items" class="max-w-xs" />
  </div>
</template>
