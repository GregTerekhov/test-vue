<script setup lang="ts">
import { toRefs } from 'vue'

import type { BookedSeats } from 'stores/store'

const props = defineProps<{
  bookedSeats: BookedSeats[]
}>()

const { bookedSeats } = toRefs(props)

const toggleSeat = (row: number, place: number): void => {
  const existingSeatIndex: number = bookedSeats.value.findIndex(
    (seat) => seat.row === row && seat.place === place
  )

  if (existingSeatIndex !== -1) {
    bookedSeats.value.splice(existingSeatIndex, 1)
  } else {
    bookedSeats.value.push({ row, place, price: 50 })
  }

  localStorage.setItem('bookedSeats', JSON.stringify(bookedSeats.value))
}

const isSeatSelected = (row: number, place: number): boolean => {
  return bookedSeats.value.some((seat) => seat.row === row && seat.place === place)
}
</script>

<template>
  <div>
    <h2 class="mb-10 text-3xl font-bold">Схема кінозалу</h2>
    <p class="mb-6 rounded-b-full bg-accentLight py-2 text-center">Екран</p>
    <ul class="flex flex-wrap justify-center">
      <li v-for="row in 12" :key="row" class="flex">
        <button
          v-for="place in 10"
          :key="place"
          class="group m-2 flex h-8 w-8 items-center justify-center rounded-md bg-accentMedium transition-colors duration-500 hover:bg-accentLight"
          :class="{ 'bg-selectedSeats': isSeatSelected(row, place) }"
          @click="toggleSeat(row, place)"
        >
          <span
            class="text-backgroundBase transition-colors duration-500 group-hover:text-accent"
            >{{ place }}</span
          >
          <template v-if="isSeatSelected(row, place)">
            <v-icon name="co-user" class="text-backgroundBase" />
          </template>
        </button>
      </li>
    </ul>
  </div>
</template>
