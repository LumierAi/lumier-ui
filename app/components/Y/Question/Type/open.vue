<script setup lang="ts">
import type { CourseQuestion } from '../../../../../types/Question'

const props = defineProps<{
  question: CourseQuestion<string>
}>()

const label = computed<string>(() => props.question.body.question)
</script>

<template>
  <!-- eslint-disable vue/no-mutating-props -->
  <label :for="question.id" class="leading-8 text-xl font-bold">{{ label }}</label>
  <YTextarea
    :id="question.id"
    v-model="question.userAnswer"
    :rows="4"
    placeholder="Wpisz swoją odpowiedź..."
  />
  <!-- eslint-enable vue/no-mutating-props -->
</template>
