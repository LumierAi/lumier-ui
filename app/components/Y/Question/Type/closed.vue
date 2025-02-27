<script setup lang="ts">
import type { YDictionary } from '../../../../../types/Dictionary'
import type { CourseQuestion } from '../../../../../types/Question'

const props = defineProps<{
  question: CourseQuestion<string>
}>()

const items = computed<YDictionary>(() => props.question.body.options?.map((option: string) => ({
  label: option,
  value: option,
})) ?? [])
const label = computed<string>(() => props.question.body.question)
</script>

<template>
  <div>
    <label :for="question.id" class="leading-8 text-xl font-bold">{{ label }}</label>
    <!-- eslint-disable vue/no-mutating-props -->
    <YRadio
      :id="question.id"
      v-model="question.userAnswer"
      class="mt-6"
      :items="items"
      size="large"
      :letter-label="true"
    />
    <!-- eslint-enable vue/no-mutating-props -->
  </div>
</template>
