<script lang="ts" setup>
import Header from "./components/Header.vue";
</script>

<template>
  <Header />
  <main class="py-5 lg:py-10">
    <div class="container mx-auto px-4">
      <router-view v-slot="{ Component }">
        <template v-if="Component">
          <suspense>
            <component :is="Component"></component>
            <template #fallback>
              <div class="flex w-full h-full items-center content-center justify-center">
                <span class="loader"></span>
              </div>
            </template>
          </suspense>
        </template>
      </router-view>
    </div>
  </main>
</template>
