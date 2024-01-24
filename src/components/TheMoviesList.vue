<template>
  <div></div>
</template>

<script>
export default {
  setup() {
    const state = reactive({
      count: 0
    })

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style scoped></style>
