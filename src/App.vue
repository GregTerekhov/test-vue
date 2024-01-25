<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'

import { useMoviesStore } from 'stores/store'
import HeaderNavigation from 'components/HeaderNavigation.vue'

const store = useMoviesStore()

onMounted(async () => {
  await store.fetchMovies()
})
</script>

<template>
  <header class="min-h-24 py-4">
    <div class="container mx-auto flex items-center px-8 md:px-16">
      <HeaderNavigation />
    </div>
  </header>

  <RouterView />
</template>
