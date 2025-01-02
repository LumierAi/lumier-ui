<script setup lang="ts">
import type { CourseQuestion } from '~~/types/Question'

const props = defineProps<{
  question: CourseQuestion
}>()

const label = computed<string>(() => props.question.body.question)
</script>

<template>
  <YTextarea
    v-model="question.userAnswer"
    :label
    :rows="4"
    placeholder="Wpisz swoją odpowiedź..."
  />
</template>
