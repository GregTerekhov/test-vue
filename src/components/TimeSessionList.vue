<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

defineProps<{
  sessionTime?: string[]
  id: number
}>()

const navigateToMovieItem = (movieId: number, time: string): void => {
  router.push({ name: 'booking', query: { id: String(movieId), time } })
}
</script>

<template>
  <ul class="flex gap-x-6" v-if="sessionTime">
    <li v-for="time in sessionTime" :key="time">
      <button
        class="w-16 rounded-lg bg-accent p-2 text-center text-backgroundBase transition-colors duration-500 hover:bg-accentMedium"
        @click="() => navigateToMovieItem(id, time)"
      >
        {{ time }}
      </button>
    </li>
  </ul>
</template>
