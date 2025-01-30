<script setup lang="ts">
import type { YDictionary } from '../../../../../types/Dictionary'
import type { CourseQuestion } from '../../../../../types/Question'

const props = defineProps<{
  question: CourseQuestion
}>()

const label = computed<string>(() => props.question.body.question)
const items = ref<YDictionary<boolean>>([
  { label: 'Prawda', value: true },
  { label: 'Fałsz', value: false },
])
</script>

<template>
  <div>
    <label :for="question.id" class="leading-8 text-xl font-bold">{{ label }}</label>
    <YRadio
      :id="question.id"
      v-model="question.userAnswer"
      :letter-label="true"
      class="mt-6"
      :items="items"
      size="large"
    />
  </div>
</template>
