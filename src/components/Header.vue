<script lang="ts" setup>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useCounterBooks } from "../stores/books.ts";
import Button from "./Button.vue";

const bookStore = useCounterBooks();
const router = useRouter();

defineComponent({ components: { Button } });
</script>

<template>
  <header class="border-b py-3">
    <div class="container mx-auto px-4">
      <div class="flex justify-between">
        <div class="flex items-center">
          <router-link to="/">
            <span class="text-2xl font-bold text-black uppercase"
              >Bookstore</span
            ></router-link
          >
        </div>

        <div class="ml-2 flex">
          <Button
            type="button"
            class="rounded-md py-2 px-4 hover:bg-gray-100 hover:outline-none"
            @handle-click="router.push('/cart')"
          >
            <div class="flex cursor-pointer items-center gap-x-1">
              <div class="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="black"
                >
                  <path
                    d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                  />
                </svg>
                <span
                  class="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 p-2 text-xs text-white"
                  >{{ bookStore.cartCount }}</span
                >
              </div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  </header>
</template>
