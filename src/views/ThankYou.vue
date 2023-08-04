<script lang="ts" setup>
import { useCounterBooks } from "../stores/books.ts";
import Alert from "../components/Alert.vue";
const bookStore = useCounterBooks();

</script>
<template>
    <div class="flex flex-col items-center h-96 justify-center">
        <template v-if="bookStore.$state.isResolved">
            <h3 class="text-black font-medium text-3xl mb-6">Purchase successful</h3>
            <img src="../assets/success.svg" alt="Thank You" class="max-w-xs">
        </template>
        <Alert v-if="bookStore.$state.error" type="error">
            Some purchases failed. Please check your <router-link to="/cart">cart!</router-link>
        </Alert>
    </div>
</template>