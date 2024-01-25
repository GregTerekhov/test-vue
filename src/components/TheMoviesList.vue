<script setup lang="ts">
import type { MoviesData } from '@/stores/store'
import MovieItem from './MovieItem.vue'

defineProps<{ movies?: MoviesData[] }>()
</script>

<template>
  <ul class="space-y-4">
    <MovieItem v-for="movie in movies" :key="movie.id" :movie="movie" />
  </ul>
</template>
