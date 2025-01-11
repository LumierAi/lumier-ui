<script setup lang="ts">
import type { Lesson } from '~~/types/Lesson'

const props = defineProps<{
  lesson: Lesson
}>()

const lessonQuestionsCount = props.lesson._count.CourseQuestion
const shouldDrawBulb = (i: number) => props.lesson.bulbThresholds.map(t => t.questionsNeeded - 1).includes(i)

const bulbStates = ref(Array.from({ length: lessonQuestionsCount }).fill(false)
  .map((_, index) => index < props.lesson.correctAnswers))

const markers = computed(() => {
  const segmentWidth = 100 / lessonQuestionsCount
  return Array.from({ length: lessonQuestionsCount }).map((_, index) => ({
    position: segmentWidth,
    isDone: index < props.lesson.correctAnswers,
    width: `calc(${segmentWidth}% - ${shouldDrawBulb(index) ? 32 : 0}px)`,
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
      <Icon
        v-if="shouldDrawBulb(i)"
        name="tabler:bulb"
        class="w-8 h-8 transition-colors duration-500 ease-in-out"
        :class="{ 'text-primary': bulbStates[i], 'text-black': !bulbStates[i] }"
      />
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
