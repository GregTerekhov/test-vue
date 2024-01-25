<script setup lang="ts">
import { onBeforeUnmount, onMounted, toRefs } from 'vue'

import type { BookedSeats } from 'stores/store'

const props = defineProps<{
  time: String
  bookedSeats: BookedSeats[]
  movieTitle?: string
  isClose: () => void
}>()

const { bookedSeats } = toRefs(props)

onMounted(() => {
  blockScroll()
  document.addEventListener('keydown', closeOnEscapeKey)
})

onBeforeUnmount(() => {
  unblockScroll()
  document.removeEventListener('keydown', closeOnEscapeKey)
})

const blockScroll = (): void => {
  document.body.style.overflow = 'hidden'
}

const unblockScroll = (): void => {
  document.body.style.overflow = ''
}

const closeOnBackdropClick = (event: MouseEvent): void => {
  if (event.target === event.currentTarget) {
    props.isClose()
  }
}

const closeOnEscapeKey = (event: KeyboardEvent): void => {
  if (event.key === 'Escape') {
    props.isClose()
  }
}
</script>

<template>
  <div
    class="fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center overflow-auto bg-textPrimary/[.4]"
    @click="closeOnBackdropClick"
  >
    <div
      class="h-64 w-[500px] rounded-xl border border-solid border-accent bg-backgroundBase px-5 py-8"
    >
      <span
        class="float-right cursor-pointer text-4xl font-semibold text-textPrimary hover:text-accent"
        @click="isClose"
        >&times;</span
      >
      <div class="flex h-full flex-col justify-between">
        <p class="text-3xl font-semibold text-textPrimary">Дякуємо!</p>
        <hr />
        <p class="text-xl text-textPrimary">
          Квитки успішно придбано на стрічку
          <span class="inline-block font-semibold text-accent">{{ movieTitle }}</span>
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
