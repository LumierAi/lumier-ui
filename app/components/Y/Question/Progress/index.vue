<script setup lang="ts">
import type { BulbThreshold, Lesson } from '../../../../../types/Lesson'

const props = defineProps<{
  lesson: Lesson
}>()

const { bulbThresholds, correctAnswers, _count: { CourseQuestion: questionsCount } } = props.lesson

const bulbPositions = bulbThresholds.map((t: BulbThreshold) => t.questionsNeeded - 1)
const shouldDrawBulb = (i: number) => bulbPositions.includes(i)

const bulbStates = ref(Array.from({ length: questionsCount }).fill(false)
  .map((_, i) => i < correctAnswers))

const markers = computed(() => {
  const bulbsCount = bulbThresholds.length
  const lineWidth = `calc((100% - ${bulbsCount * 40}px)/${questionsCount})`

  return Array.from({ length: questionsCount }).fill(null).map((_, i) => ({
    width: lineWidth,
    isDone: i < correctAnswers,
    isFirstSegment: i === 0,
    isLastSegment: i === questionsCount - 1,
    hasLeftBulb: shouldDrawBulb(i - 1),
    hasRightBulb: shouldDrawBulb(i),
  }))
})

function onLineTransitionEnd(index: number) {
  bulbStates.value[index] = index < correctAnswers
}
</script>

<template>
  <div class="progress-container relative w-full flex items-center">
    <template v-for="(marker, i) in markers" :key="i">
      <!-- Progress Line -->
      <div
        class="progress-line w-full relative overflow-hidden"
        :class="[
          { 'rounded-l-3xl': marker.isFirstSegment || marker.hasLeftBulb },
          { 'rounded-r-3xl': marker.isLastSegment || marker.hasRightBulb },
        ]"
        :style="{ width: marker.width }"
      >
        <div class="absolute inset-0 bg-surface300" />
        <div
          class="absolute inset-0 bg-primary transition-transform duration-500 origin-left"
          :class="[
            marker.isDone ? 'scale-x-100' : 'scale-x-0',
            marker.hasRightBulb ? 'ease-in' : 'ease-in-out',
          ]"
          @transitionend="onLineTransitionEnd(i)"
        />
      </div>

      <!-- Bulb Icon -->
      <div
        v-if="marker.hasRightBulb"
        class="flex items-center"
        :class="marker.isLastSegment ? 'w-10 justify-end' : 'w-12 justify-center'"
      >
        <Icon
          name="tabler:bulb"
          class="w-8 h-8 transition-colors duration-500 ease-in-out"
          :class="bulbStates[i] ? 'text-primary' : 'text-surface300'"
        />
      </div>
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
