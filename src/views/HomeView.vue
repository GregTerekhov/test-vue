<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { format } from 'date-fns'
import ukLocale from 'date-fns/locale/uk'
import type { Locale } from 'date-fns'

import { useMoviesStore } from 'stores/store'

const router = useRouter()
const store = useMoviesStore()
const { movies, isLoading } = storeToRefs(store)

onMounted(async () => {
  await store.fetchMovies()
})

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  const formattedDate = format(date, 'd MMMM, EEEE', { locale: ukLocale as unknown as Locale })
  return formattedDate
}

const navigateToMovieItem = (movieId: number, time: string) => {
  router.push({ name: 'booking', query: { id: String(movieId), time } })
}
</script>

<template>
  <main>
    <div class="container mx-auto px-8 md:px-16">
      <h1 class="mb-10 text-3xl font-bold">Сеанси</h1>
      <ul v-if="movies && movies.length > 0 && !isLoading" class="space-y-4">
        <li
          class="flex gap-x-8 rounded-2xl bg-backgroundBase px-8 py-3"
          v-for="movie in movies"
          :key="movie.id"
        >
          <div class="max-h-[150px] overflow-hidden rounded-md">
            <img
              :src="movie.poster"
              :alt="movie.title"
              width="150px"
              height="150px"
              loading="lazy"
            />
          </div>
          <div class="space-y-4">
            <div class="flex items-center gap-x-2">
              <h3 class="text-xl font-medium text-accent">{{ movie.title }}</h3>
              <p class="text-xl font-medium text-accent">({{ movie.rating }})</p>
            </div>
            <p>{{ formatDate(movie.session_date) }}</p>
            <div class="flex items-center gap-x-8">
              <p>{{ movie.session_place }}</p>
              <ul class="flex gap-x-6">
                <li v-for="time in movie.session_time" :key="time">
                  <button
                    class="w-16 rounded-lg bg-accent p-2 text-center text-backgroundBase transition-colors duration-500 hover:bg-accentMedium"
                    @click="() => navigateToMovieItem(movie.id, time)"
                  >
                    {{ time }}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
      <p v-else>Loading...</p>
    </div>
  </main>
</template>
