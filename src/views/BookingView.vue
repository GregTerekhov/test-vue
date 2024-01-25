<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

import { useMoviesStore, type BookedSeats, type MoviesData } from '@/stores/store'
import SessionInfo from 'components/SessionInfo.vue'
import HallSchema from 'components/HallSchema.vue'
import BookingTable from 'components/BookingTable.vue'
import BookingSuccessPopup from 'components/BookingSuccessPopup.vue'

const router = useRouter()

const movieId = ref('')
const time = ref('')
const showSuccessModal = ref<boolean>(false)
const selectedMovie = ref<MoviesData | undefined>(undefined)
const bookedSeats = ref<BookedSeats[]>([])

const store = useMoviesStore()
const { movies } = storeToRefs(store)

const loadMovies = async () => {
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
  localStorage.clear()
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
  <BookingSuccessPopup
    v-if="showSuccessModal"
    :time="time"
    :bookedSeats="bookedSeats"
    :isClose="closePopup"
    :movieTitle="selectedMovie?.title"
  />
</template>
