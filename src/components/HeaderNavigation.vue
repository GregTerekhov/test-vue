<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav>
    <RouterLink
      to="/"
      class="inline-flex items-center gap-x-3 rounded-lg border border-solid border-accent bg-accentMedium p-4 text-2xl text-backgroundBase transition-colors duration-500 hover:border-accentMedium hover:bg-transparent hover:text-accent"
      ><v-icon name="co-home" scale="1.8" />Home</RouterLink
    >
  </nav>
</template>
