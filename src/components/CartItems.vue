<script lang="ts" setup>
import { computed, defineComponent } from "vue";
import { useCounterBooks } from "../stores/books.ts";
import Counter from "./Counter.vue";
import Button from "./Button.vue";
import Image from "./Image.vue";
import { Cart } from "../types";

const { heading } = defineProps({
  heading: { type: Array, required: true },
  data: { type: Array<Cart>, required: true },
});

const bookStore = useCounterBooks();

defineComponent({ components: { Counter, Button, Image } });

const formatHeading = computed(() => {
  return heading.map((name, index) => {
    let className: string;

    if (index === 0) {
      className = "lg:w-2/3";
    } else if (index === 2) {
      className = "lg:w-3/6 text-center";
    } else if (index === heading.length - 1) {
      className = "lg:w-1/6 text-right";
    } else {
      className = "lg:w-1/6";
    }

    return {
      name,
      columnClass: className,
    };
  });
});
</script>

<template>
  <div class="hidden lg:flex w-full">
    <div
      v-for="(header, index) in formatHeading"
      :key="index"
      :class="`w-full ${header.columnClass}`"
    >
      <h4 class="mb-6 font-bold font-heading text-black">{{ header.name }}</h4>
    </div>
    <div class="w-full lg:w-1/6"></div>
  </div>
  <div class="mb-12 py-6 border-t border-b border-blueGray-800">
    <div
      v-for="(item, index) in data"
      :key="item.id"
      class="flex flex-wrap items-center -mx-4"
      :class="`${index === data.length - 1 ? `` : `mb-6 md:mb-3`}`"
    >
      <div class="w-full md:w-4/6 lg:w-2/5 px-4 mb-6 md:mb-0">
        <div class="flex -mx-4 flex-wrap items-center">
          <div class="w-full md:w-1/3 px-4 mb-3">
            <div
              class="flex items-center justify-center w-full md:w-24 h-32 bg-gray-100"
            >
              <Image :src="`${item.id}`" class="h-full object-contain" />
            </div>
          </div>
          <div class="w-2/3 px-4">
            <h3 class="mb-1 text-2xl font-bold font-heading">
              <router-link :to="`/${item.id.toString()}`" class="text-black">
                {{ item.title }}
              </router-link>
            </h3>
            <p class="text-black text-sm">{{ item.author }}</p>
          </div>
        </div>
      </div>
      <div class="hidden lg:block lg:w-2/12 px-4">
        <p class="text-lg text-black font-bold font-heading">
          {{ `$${item.price}` }}
        </p>
      </div>
      <div class="w-auto md:w-1/6 lg:w-3/12 px-4">
        <Counter
          :qty="item.qty"
          @handleIncrement="bookStore.updateCartItemQuantity(item.id, true)"
          @handleDecrement="bookStore.updateCartItemQuantity(item.id, false)"
        />
      </div>
      <div class="w-auto md:w-1/6 lg:w-1/12 px-4">
        <p class="text-lg text-black font-bold font-heading">
          {{ `$${item.qty * item.price}` }}
        </p>
      </div>
      <div class="w-auto md:w-1/6 lg:w-1/12 px-4 text-right">
        <Button
          type="button"
          @handleClick="bookStore.deleteCartItem(item.id)"
          class="ft lx yz ze alo aqr axp bkx"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            data-config-id="auto-svg-3-3"
          >
            <path
              d="M8.33333 15C8.55435 15 8.76631 14.9122 8.92259 14.7559C9.07887 14.5996 9.16667 14.3877 9.16667 14.1667V9.16666C9.16667 8.94564 9.07887 8.73368 8.92259 8.5774C8.76631 8.42112 8.55435 8.33332 8.33333 8.33332C8.11232 8.33332 7.90036 8.42112 7.74408 8.5774C7.5878 8.73368 7.5 8.94564 7.5 9.16666V14.1667C7.5 14.3877 7.5878 14.5996 7.74408 14.7559C7.90036 14.9122 8.11232 15 8.33333 15ZM16.6667 4.99999H13.3333V4.16666C13.3333 3.50362 13.0699 2.86773 12.6011 2.39889C12.1323 1.93005 11.4964 1.66666 10.8333 1.66666H9.16667C8.50363 1.66666 7.86774 1.93005 7.3989 2.39889C6.93006 2.86773 6.66667 3.50362 6.66667 4.16666V4.99999H3.33333C3.11232 4.99999 2.90036 5.08779 2.74408 5.24407C2.5878 5.40035 2.5 5.61231 2.5 5.83332C2.5 6.05434 2.5878 6.2663 2.74408 6.42258C2.90036 6.57886 3.11232 6.66666 3.33333 6.66666H4.16667V15.8333C4.16667 16.4964 4.43006 17.1322 4.8989 17.6011C5.36774 18.0699 6.00363 18.3333 6.66667 18.3333H13.3333C13.9964 18.3333 14.6323 18.0699 15.1011 17.6011C15.5699 17.1322 15.8333 16.4964 15.8333 15.8333V6.66666H16.6667C16.8877 6.66666 17.0996 6.57886 17.2559 6.42258C17.4122 6.2663 17.5 6.05434 17.5 5.83332C17.5 5.61231 17.4122 5.40035 17.2559 5.24407C17.0996 5.08779 16.8877 4.99999 16.6667 4.99999ZM8.33333 4.16666C8.33333 3.94564 8.42113 3.73368 8.57741 3.5774C8.73369 3.42112 8.94565 3.33332 9.16667 3.33332H10.8333C11.0543 3.33332 11.2663 3.42112 11.4226 3.5774C11.5789 3.73368 11.6667 3.94564 11.6667 4.16666V4.99999H8.33333V4.16666ZM14.1667 15.8333C14.1667 16.0543 14.0789 16.2663 13.9226 16.4226C13.7663 16.5789 13.5543 16.6667 13.3333 16.6667H6.66667C6.44565 16.6667 6.23369 16.5789 6.07741 16.4226C5.92113 16.2663 5.83333 16.0543 5.83333 15.8333V6.66666H14.1667V15.8333ZM11.6667 15C11.8877 15 12.0996 14.9122 12.2559 14.7559C12.4122 14.5996 12.5 14.3877 12.5 14.1667V9.16666C12.5 8.94564 12.4122 8.73368 12.2559 8.5774C12.0996 8.42112 11.8877 8.33332 11.6667 8.33332C11.4457 8.33332 11.2337 8.42112 11.0774 8.5774C10.9211 8.73368 10.8333 8.94564 10.8333 9.16666V14.1667C10.8333 14.3877 10.9211 14.5996 11.0774 14.7559C11.2337 14.9122 11.4457 15 11.6667 15Z"
              fill="#E85444"
            ></path>
          </svg>
        </Button>
      </div>
    </div>
  </div>
</template>
