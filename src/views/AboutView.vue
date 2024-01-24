<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useMoviesStore, type BookedSeats } from '@/stores/store'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

import type { MoviesData } from 'stores/store'

const router = useRouter()

const movieId = ref('')
const time = ref('')
const showSuccessModal = ref(false)
const selectedMovie = ref<MoviesData | undefined>(undefined)

const store = useMoviesStore()
const { movies } = storeToRefs(store)

onMounted(() => {
  movieId.value = router.currentRoute.value.query.id as string
  time.value = router.currentRoute.value.query.time as string

  selectedMovie.value = movies.value.find((movie) => String(movie.id) === movieId.value)
})

watch([movieId, time], () => {
  localStorage.setItem('selectedMovieId', movieId.value)
  localStorage.setItem('selectedTime', time.value)
})

onMounted(() => {
  const storedMovieId = localStorage.getItem('selectedMovieId')
  const storedTime = localStorage.getItem('selectedTime')

  if (storedMovieId && storedTime) {
    movieId.value = storedMovieId
    time.value = storedTime

    selectedMovie.value = movies.value.find((movie) => String(movie.id) === storedMovieId)
  }
})

onBeforeUnmount(() => {
  localStorage.removeItem('selectedMovieId')
  localStorage.removeItem('selectedTime')
})

const bookedSeats = ref<BookedSeats[]>([])

const toggleSeat = (row: number, place: number) => {
  const existingSeatIndex = bookedSeats.value.findIndex(
    (seat) => seat.row === row && seat.place === place
  )

  if (existingSeatIndex !== -1) {
    bookedSeats.value.splice(existingSeatIndex, 1)
  } else {
    bookedSeats.value.push({ row, place, price: 50 })
  }
}

const removeSeat = (index: number) => {
  bookedSeats.value.splice(index, 1)
}

const purchaseTickets = () => {
  store.bookedSeats = [...store.bookedSeats, ...bookedSeats.value]
  showSuccessModal.value = true
}
const isSeatSelected = (row: number, place: number) => {
  return bookedSeats.value.some((seat) => seat.row === row && seat.place === place)
}
const removeAllSeats = () => {
  bookedSeats.value = []
}

const totalSeatsPrice = () => {
  return bookedSeats.value.reduce((total, seat) => total + seat.price, 0)
}
</script>

<template>
  <section class="py-10 lg:pb-36">
    <div class="container mx-auto px-8 md:px-16">
      <div class="mb-16 flex gap-x-8">
        <img
          :src="selectedMovie?.poster"
          :alt="selectedMovie?.title"
          width="500"
          height="300"
          class="rounded-lg bg-cover bg-center"
        />

        <div class="space-y-6">
          <h2 class="text-2xl font-bold text-accent">{{ selectedMovie?.title }}</h2>
          <p class="text-justify text-lg">{{ selectedMovie?.description }}</p>
          <p class="text-justify text-lg">{{ selectedMovie?.overview }}</p>
          <p class="text-2xl font-medium">
            Час сеансу: <span class="text-accent underline">{{ time }}</span>
          </p>
        </div>
      </div>
      <div class="flex grow justify-between gap-10">
        <div>
          <h2 class="mb-10 text-3xl font-bold">Схема кінозалу</h2>
          <p class="mb-6 rounded-b-full bg-accentLight py-2 text-center">Екран</p>
          <ul class="flex flex-wrap justify-center">
            <li v-for="row in 12" :key="row" class="flex">
              <button
                v-for="place in 10"
                :key="place"
                class="m-2 flex h-8 w-8 items-center justify-center rounded-md bg-accentMedium transition-colors duration-500 hover:bg-accentLight"
                :class="{ 'bg-selectedSeats': isSeatSelected(row, place) }"
                @click="toggleSeat(row, place)"
              >
                <template v-if="isSeatSelected(row, place)">
                  <v-icon name="co-user" class="text-white" />
                </template>
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="mb-6 text-2xl font-bold">Обрані місця</h3>
          <table class="mb-6 w-96 border-spacing-1 border border-backgroundBase">
            <thead>
              <tr>
                <th class="border bg-backgroundBase">Ряд</th>
                <th class="border bg-backgroundBase">Місце</th>
                <th class="border bg-backgroundBase">Ціна</th>
                <th class="border bg-backgroundBase">Дії</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(seat, index) in bookedSeats" :key="index">
                <td class="border border-backgroundBase text-center text-lg">{{ seat.row }}</td>
                <td class="border border-backgroundBase text-center text-lg">{{ seat.place }}</td>
                <td class="border border-backgroundBase text-center text-lg">{{ seat.price }}</td>
                <td class="border border-backgroundBase text-center">
                  <button @click="removeSeat(index)" class="h-8 w-8 rounded-full bg-backgroundBase">
                    <v-icon name="io-close-outline" />
                  </button>
                </td>
              </tr>
              <tr v-if="bookedSeats && bookedSeats.length > 0">
                <td colspan="4">
                  <div class="flex w-full items-center justify-between px-6">
                    <p class="text-2xl text-accent">Видалити все</p>
                    <button @click="removeAllSeats" class="h-8 w-8 rounded-full bg-backgroundBase">
                      <v-icon name="io-close-outline" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-if="bookedSeats && bookedSeats.length > 0">
            <p
              class="mb-4 mt-4 flex justify-between px-3 text-3xl font-bold tracking-wider text-textPrimary/[.8]"
            >
              Всього: <span>{{ totalSeatsPrice() }} грн</span>
            </p>
          </div>
          <button
            @click="purchaseTickets"
            :disabled="bookedSeats.length === 0"
            class="w-full rounded-3xl bg-accentMedium py-3 text-backgroundBase"
            :class="{ 'bg-textPrimary/[.4]': bookedSeats.length === 0 }"
          >
            Придбати
          </button>
        </div>
      </div>
    </div>
  </section>
  <div
    v-if="showSuccessModal"
    class="fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center overflow-auto bg-textPrimary/[.4]"
  >
    <div class="h-64 w-[500px] rounded-xl border border-solid border-accent bg-backgroundBase p-5">
      <span
        class="float-right cursor-pointer text-4xl font-semibold text-textPrimary hover:text-accent"
        @click="showSuccessModal = false"
        >&times;</span
      >
      <div class="flex h-full flex-col justify-between">
        <p class="text-3xl font-semibold text-textPrimary">Дякуємо!</p>
        <p class="text-xl text-textPrimary">
          Квитки успішно придбано на стрічку
          <span class="font-semibold text-accent">{{ selectedMovie?.title }}</span>
        </p>
        <p class="text-right text-2xl text-textPrimary">
          Час сеансу: <span class="font-medium text-accent">{{ time }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
