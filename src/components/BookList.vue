<script lang="ts" setup>
import { useCounterBooks } from "../stores/books.ts";

const bookStore = useCounterBooks();

import Image from "./Image.vue";

</script>

<template>
  <section
    v-for="book in bookStore.books"
    :key="book.id"
    :class="`books__item book w-full md:w-1/2 lg:w-1/4 px-4 mb-10`"
  >
    <router-link :to="`/${book?.id}`" class="block text-black">
      <Image
        :src="`${book.id}`"
        :alt="`${book?.title}`"
        class="block mb-5 w-full h-96 object-fit"
      />
      <div class="book__description">
        <div class="flex items-center justify-between">
          <h2 class="book__title font-medium text-lg">{{ book?.title }}</h2>
          <span class="font-medium">{{ `$${book.price}` }}</span>
        </div>
        <p class="book__author text-sm">{{ book?.author }}</p>
      </div>
    </router-link>
  </section>
</template>
