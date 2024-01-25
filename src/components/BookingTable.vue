<script setup lang="ts">
import { type BookedSeats } from '@/stores/store'
import { toRefs } from 'vue'

const props = defineProps<{
  bookedSeats: BookedSeats[]
  purchaseTickets: () => void
}>()

const { bookedSeats, purchaseTickets } = toRefs(props)

const removeSeat = (index: number): void => {
  bookedSeats.value.splice(index, 1)
  localStorage.setItem('bookedSeats', JSON.stringify(bookedSeats.value))
}

const removeAllSeats = (): void => {
  bookedSeats.value = []
  localStorage.setItem('bookedSeats', JSON.stringify(bookedSeats.value))
}

const totalSeatsPrice = (): number => {
  return bookedSeats.value.reduce((total, seat) => total + seat.price, 0)
}
</script>

<template>
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
            <button
              @click="removeSeat(index)"
              class="h-8 w-8 rounded-full bg-backgroundBase text-textPrimary transition-colors duration-500 hover:bg-accent hover:text-accent"
            >
              <v-icon name="io-close-outline" animation="spin" hover speed="slow" />
            </button>
          </td>
        </tr>
        <tr v-if="bookedSeats && bookedSeats.length > 0">
          <td colspan="4">
            <div class="flex w-full items-center justify-between px-6">
              <p class="text-2xl text-accent">Видалити все</p>
              <button
                @click="removeAllSeats"
                class="h-8 w-8 rounded-full bg-backgroundBase text-textPrimary transition-colors duration-500 hover:bg-accent hover:text-accent"
              >
                <v-icon name="io-close-outline" animation="spin" hover />
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
</template>
