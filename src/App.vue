<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="container mx-auto px-8 md:px-16">
    <header class="py-4">
      <div class="min-h-24">
        <nav class="flex items-center">
          <RouterLink
            to="/"
            class="inline-flex items-center gap-x-3 rounded-lg border border-solid border-accent bg-accentMedium p-4 text-2xl text-backgroundBase transition-colors duration-500 hover:border-accentMedium hover:bg-transparent hover:text-accent"
            ><v-icon name="co-home" scale="1.8" />Home</RouterLink
          >
        </nav>
      </div>
    </header>
  </div>

  <RouterView />
</template>
