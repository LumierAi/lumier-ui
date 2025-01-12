<script setup lang="ts">
import type { BulbThreshold, Lesson } from '../../../../../types/Lesson'

const props = defineProps<{
  lesson: Lesson
}>()

const lessonQuestionsCount = props.lesson._count.CourseQuestion
const shouldDrawBulb = (i: number) => props.lesson.bulbThresholds.map((t: BulbThreshold) => t.questionsNeeded - 1).includes(i)

const bulbStates = ref(Array.from({ length: lessonQuestionsCount }).fill(false)
  .map((_, index) => index < props.lesson.correctAnswers))

const markers = computed(() => {
  const numberOfBulbs = props.lesson.bulbThresholds.length
  const width = `calc((100% - ${numberOfBulbs * 40}px)/${lessonQuestionsCount})`
  const segmentWidth = 100 / lessonQuestionsCount
  return Array.from({ length: lessonQuestionsCount }).map((_, index) => ({
    position: segmentWidth,
    isDone: index < props.lesson.correctAnswers,
    width,
  }))
})

function onLineTransitionEnd(index: number) {
  bulbStates.value[index] = index < props.lesson.correctAnswers
}
</script>

<template>
  <div class="progress-container relative w-full flex items-center">
    <template v-for="(marker, i) in markers" :key="i">
      <div class="progress-line w-full rounded-3xl relative overflow-hidden" :style="{ width: marker.width }">
        <div class="absolute inset-0 bg-black" />
        <div
          class="absolute inset-0 bg-primary transition-transform duration-500 origin-left"
          :class="[marker.isDone ? 'scale-x-100' : 'scale-x-0', shouldDrawBulb(i) ? 'ease-in' : 'ease-in-out']"
          @transitionend="onLineTransitionEnd(i)"
        />
      </div>
      <div v-if="shouldDrawBulb(i)" class="flex items-center" :class="[i === markers.length - 1 ? 'w-10 justify-end' : 'w-12 justify-center']">
        <Icon
          name="tabler:bulb"
          class="w-8 h-8 transition-colors duration-500 ease-in-out"
          :class="{ 'text-primary': bulbStates[i], 'text-black': !bulbStates[i] }"
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
