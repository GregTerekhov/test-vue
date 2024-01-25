<script setup lang="ts">
import { format } from 'date-fns'
import ukLocale from 'date-fns/locale/uk'
import type { Locale } from 'date-fns'

import type { MoviesData } from '@/stores/store'
import TimeSessionList from './TimeSessionList.vue'

defineProps<{
  movie: MoviesData
}>()

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  const formattedDate = format(date, 'd MMMM, EEEE', { locale: ukLocale as unknown as Locale })

  return formattedDate
}
</script>

<template>
  <li class="flex gap-x-8 rounded-2xl bg-backgroundBase px-8 py-3">
    <div class="max-h-[150px] overflow-hidden rounded-md">
      <img :src="movie.poster" :alt="movie.title" width="150px" height="150px" loading="lazy" />
    </div>
    <div class="space-y-4">
      <div class="flex items-center gap-x-2">
        <h2 class="text-xl font-medium text-accent">{{ movie.title }}</h2>
        <p class="text-xl font-medium text-accent">({{ movie.rating }})</p>
      </div>
      <p>{{ formatDate(movie.session_date) }}</p>
      <div class="flex items-center gap-x-8">
        <p>{{ movie.session_place }}</p>
        <TimeSessionList :movie="movie" />
      </div>
    </div>
  </li>
</template>
