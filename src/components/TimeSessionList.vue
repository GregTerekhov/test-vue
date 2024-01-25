<script setup lang="ts">
import type { MoviesData } from '@/stores/store'
import { useRouter } from 'vue-router'

const router = useRouter()
defineProps<{
  movie: MoviesData
}>()

const navigateToMovieItem = (movieId: number, time: string): void => {
  router.push({ name: 'booking', query: { id: String(movieId), time } })
}
</script>

<template>
  <ul class="flex gap-x-6" v-if="movie && movie.session_time">
    <li v-for="time in movie.session_time" :key="time">
      <button
        class="w-16 rounded-lg bg-accent p-2 text-center text-backgroundBase transition-colors duration-500 hover:bg-accentMedium"
        @click="() => navigateToMovieItem(movie.id, time)"
      >
        {{ time }}
      </button>
    </li>
  </ul>
</template>
