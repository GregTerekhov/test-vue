<script setup lang="ts">
import type { MoviesData } from '@/stores/store'

defineProps<{
  selectedMovie?: MoviesData
  time: string
}>()
</script>

<template>
  <div class="mb-16 flex gap-x-8">
    <img
      :src="selectedMovie?.poster"
      :alt="selectedMovie?.title"
      width="500"
      height="300"
      class="rounded-lg bg-cover bg-center"
    />

    <div class="space-y-6">
      <h2 class="text-2xl font-bold text-accent">{{ selectedMovie?.title }}</h2>
      <p class="text-justify text-lg">{{ selectedMovie?.description }}</p>
      <p class="text-justify text-lg">{{ selectedMovie?.overview }}</p>
      <p class="text-2xl font-medium">
        Час сеансу: <span class="text-accent underline">{{ time }}</span>
      </p>
    </div>
  </div>
</template>
