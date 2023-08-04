<script lang="ts" setup>
import { computed, ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import type { Ref } from "vue";

import Image from "../components/Image.vue";
import Button from "../components/Button.vue";

import { useCounterBooks } from "../stores/books.ts";
import { Cart } from "../types";

const bookStore = useCounterBooks();
const router = useRouter()

const quantity: Ref<number> = ref(1);
const bookInformation = reactive({ author: "", isbn: "", availableStock: 0 });

const book = computed(() => {
  return bookStore.$state.book;
});

const handleCart = () => {
  bookStore.addToCart(bookStore.book as Cart, quantity.value);
  router.push('/cart')
};

onMounted(() => {
  bookInformation.author = book.value.author;
  bookInformation.availableStock = book.value.availableStock;
  bookInformation.isbn = book.value.isbn;
});

</script>

<template>
  <div class="w-full md:w-1/2 lg:w-3/5 xl:w-2/3 mb-12 md:mb-0 px-4">
    <div class="max-w-3xl">
      <div>
        <Image
          class="block h-full w-full max-w-4xl"
          :src="`${book.id}`"
          :alt="book.title"
        />
      </div>
    </div>
  </div>
  <div class="w-full md:w-1/2 lg:w-2/5 xl:w-1/3 px-4">
    <div class="p-6 h-full border border-blueGray-800">
      <div class="pb-8 border-b border-blueGray-800">
        <h2 class="font-heading font-bold text-2xl text-black mb-3">
          {{ book.title }}
        </h2>
        <p class="text-gray-500 mb-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod debitis
          ea natus quos et magnam modi architecto molestias dolore odio,
          voluptatibus ratione vitae rem inventore, ut cum eos quis non?
        </p>
        <div class="inline-flex items-end">
          <h4 class="text-xl font-bold text-black mr-4">
            {{ `$${book.price}` }}
          </h4>
        </div>
      </div>
      <div class="pt-5 pb-5 border-b border-blueGray-800">
        <h3 class="block text-black font-bold mb-4 text-xl">
          Book Information
        </h3>
        <div
          class="flex mb-2"
          v-for="(meta, key, index) in bookInformation"
          :key="index"
        >
          <span class="text-black font-bold text-sm uppercase">{{ key }}</span>
          <span class="ml-auto text-sm text-gray-500">{{ meta }}</span>
        </div>
      </div>
      <div class="pt-6">
        <Button
        type="button"
        class="block w-full py-2 bg-black hover:bg-gray-500 text-center text-white font-bold font-heading rounded-md"
        @handle-click="handleCart"
        :disabled="book.availableStock === 0"
      >
        <span>{{ book.availableStock > 0 ? "Add to Cart" : "Soldout" }}</span>
      </Button>
      </div>
    </div>
  </div>
</template>
