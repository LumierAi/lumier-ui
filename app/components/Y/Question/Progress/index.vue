<script setup lang="ts">
const props = defineProps<{
  steps: number
}>()

const markers = computed(() => {
  const markersDictionary: { position: number, width: string }[] = []
  Array.from({ length: props.steps }).forEach((_, index) => {
    markersDictionary.push({ position: (index + 1) * 100 / props.steps, width: '' })
  })

  return markersDictionary.reduce((result, current, index, array) => {
    const offset = 40
    const position = index === 0 ? current.position : current.position - array[index - 1]!.position
    result.push({ position, width: `calc(${position}% - ${offset}px)` })
    return result
  }, [] as { position: number, width: string }[])
})
</script>

<template>
  <div class="progress-container relative w-full flex items-center">
    <template v-for="(marker) in markers" :key="marker.position">
      <div class="progress-line w-full bg-black rounded-3xl relative" :style="{ width: marker.width }" />
      <Icon name="tabler:bulb" class="w-8 h-8" />
    </template>
  </div>
</template>

<style scoped>
.progress-container {
  padding: 15px 0;
}

.progress-line {
  height: 2px;
}
</style>
