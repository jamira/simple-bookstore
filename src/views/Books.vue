<script setup lang="ts">
import { onUnmounted } from "vue";
import { useCounterBooks } from "../stores/books.ts";
import BookList from "../components/BookList.vue";
import Alert from "../components/Alert.vue";

const bookStore = useCounterBooks();
await bookStore.fetchBooks();

onUnmounted(() => {
  bookStore.clearError();
});
</script>

<template>
  <div class="books flex flex-wrap -mx-4 -mb-8">
    <Alert
      v-if="bookStore.$state.error"
      type="error"
      :message="`${bookStore.$state.error}`"
    />
    <BookList v-else />
  </div>
</template>
