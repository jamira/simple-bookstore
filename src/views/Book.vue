<script lang="ts" setup>
import { computed, onUnmounted } from "vue";
import { useCounterBooks } from "../stores/books.ts";
import { useRoute } from "vue-router";
import BookDescription from '../components/BookDescription.vue'
import Alert from "../components/Alert.vue";

const bookStore = useCounterBooks();
const route = useRoute()

const BookId = computed<number>(() => {
  return parseInt(route.params.id as string);
});

await bookStore.fetchBook(BookId.value);

onUnmounted(() => {
  bookStore.clearError()
})
</script>

<template>
  <div class="md:max-w-none mx-auto">
    <div class="flex flex-wrap mt-10 -mx-4">
      <Alert v-if="bookStore.$state.error" type="error" :message="`${bookStore.$state.error}`" />
      <BookDescription v-else/>
    </div>
  </div>
</template>
