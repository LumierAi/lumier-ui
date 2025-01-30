<script setup lang="ts">
import type { CourseQuestion } from '../../../../../types/Question'

const props = defineProps<{
  question: CourseQuestion
}>()

const parts = computed(() => props.question.body.question.split('__BLANK__'))
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-row items-center">
      <template v-for="(part, index) in parts" :key="index">
        {{ part }}
        <YInput
          v-if="index !== parts.length - 1"
          :id="question.id"
          v-model="question.userAnswer"
          class="mx-2 w-48"
          placeholder="Wpisz brakujące słowo..."
        />
      </template>
    </div>
  </div>
</template>
