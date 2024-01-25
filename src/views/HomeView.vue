<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useMoviesStore } from 'stores/store'
import TheMoviesList from 'components/TheMoviesList.vue'

const store = useMoviesStore()
const { movies, isLoading } = storeToRefs(store)
</script>

<template>
  <main>
    <div class="container mx-auto px-8 md:px-16">
      <h1 class="mb-10 text-3xl font-bold">Сеанси</h1>
      <TheMoviesList v-if="movies && movies.length > 0 && !isLoading" :movies="movies" />
      <div v-else class="flex h-full items-center justify-center">
        <v-icon name="fa-spinner" fill="#2da3d3" animation="spin" speed="2" />
      </div>
    </div>
  </main>
</template>
