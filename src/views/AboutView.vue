<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useMoviesStore, type BookedSeats } from '@/stores/store'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

import type { MoviesData } from 'stores/store'
import SessionInfo from 'components/SessionInfo.vue'
import HallSchema from 'components/HallSchema.vue'
import BookingTable from 'components/BookingTable.vue'

const router = useRouter()

const movieId = ref('')
const time = ref('')
const showSuccessModal = ref<boolean>(false)
const selectedMovie = ref<MoviesData | undefined>(undefined)
const bookedSeats = ref<BookedSeats[]>([])

const store = useMoviesStore()
const { movies } = storeToRefs(store)

const loadMovies = async () => {
  await store.fetchMovies()

  selectedMovie.value = movies.value.find((movie) => String(movie.id) === movieId.value)
}

onMounted(() => {
  movieId.value = router.currentRoute.value.query.id as string
  time.value = router.currentRoute.value.query.time as string

  loadMovies()
})

watch([movieId, time], () => {
  localStorage.setItem('selectedMovieId', movieId.value)
  localStorage.setItem('selectedTime', time.value)
})

onMounted(() => {
  getStoredSeats()
  getStoredParams()
})

onBeforeUnmount(() => {
  localStorage.removeItem('selectedMovieId')
  localStorage.removeItem('selectedTime')
  localStorage.removeItem('bookedSeats')
})

const getStoredParams = (): void => {
  const storedMovieId = localStorage.getItem('selectedMovieId')
  const storedTime = localStorage.getItem('selectedTime')

  if (storedMovieId && storedTime) {
    movieId.value = storedMovieId
    time.value = storedTime

    loadMovies()
  }
}

const getStoredSeats = (): void => {
  const storedSeats = localStorage.getItem('bookedSeats')

  if (storedSeats) {
    const savedSeats = JSON.parse(storedSeats)
    bookedSeats.value = [...savedSeats]
  }
}

const purchaseTickets = (): void => {
  store.bookedSeats.length = 0
  store.bookedSeats = [...bookedSeats.value]
  showSuccessModal.value = true
}

const closePopup = (): void => {
  bookedSeats.value = []
  showSuccessModal.value = false
}
</script>

<template>
  <section class="py-10 lg:pb-36">
    <div class="container mx-auto px-8 md:px-16">
      <SessionInfo :selectedMovie="selectedMovie" :time="time" />
      <div class="flex justify-between gap-10">
        <HallSchema :bookedSeats="bookedSeats" />
        <BookingTable :bookedSeats="bookedSeats" :purchaseTickets="purchaseTickets" />
      </div>
    </div>
  </section>
  <div
    v-if="showSuccessModal"
    class="fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center overflow-auto bg-textPrimary/[.4]"
  >
    <div
      class="h-64 w-[500px] rounded-xl border border-solid border-accent bg-backgroundBase px-5 py-8"
    >
      <span
        class="float-right cursor-pointer text-4xl font-semibold text-textPrimary hover:text-accent"
        @click="closePopup"
        >&times;</span
      >
      <div class="flex h-full flex-col justify-between">
        <p class="text-3xl font-semibold text-textPrimary">Дякуємо!</p>
        <hr />
        <p class="text-xl text-textPrimary">
          Квитки успішно придбано на стрічку
          <span class="inline-block font-semibold text-accent">{{ selectedMovie?.title }}</span>
        </p>
        <div v-for="(seat, index) in bookedSeats" :key="index">
          <p>Ваш квиток: {{ seat.row }} ряд, {{ seat.place }} місце</p>
        </div>
        <p class="text-right text-2xl text-textPrimary">
          Час сеансу: <span class="font-medium text-accent">{{ time }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
