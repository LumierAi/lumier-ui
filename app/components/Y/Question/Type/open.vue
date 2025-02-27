<script setup lang="ts">
import type { CourseQuestion } from '../../../../../types/Question'

const props = defineProps<{
  question: CourseQuestion<string>
}>()

const label = computed<string>(() => props.question.body.question)
</script>

<template>
  <!-- eslint-disable vue/no-mutating-props -->
  <YTextarea
    v-model="question.userAnswer"
    :label
    :rows="4"
    placeholder="Wpisz swoją odpowiedź..."
  />
  <!-- eslint-enable vue/no-mutating-props -->
</template>
