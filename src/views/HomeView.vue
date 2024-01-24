<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import { useMoviesStore } from 'stores/store'
import TheMoviesList from 'components/TheMoviesList.vue'

const store = useMoviesStore()
const { movies, isLoading } = storeToRefs(store)

onMounted(async () => {
  await store.fetchMovies()
})
</script>

<template>
  <main>
    <div class="container mx-auto px-8 md:px-16">
      <h1 class="mb-10 text-3xl font-bold">Сеанси</h1>
      <TheMoviesList v-if="movies && movies.length > 0 && !isLoading" :movies="movies" />
      <p v-else>Loading...</p>
    </div>
  </main>
</template>
