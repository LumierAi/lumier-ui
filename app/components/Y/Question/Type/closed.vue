<script setup lang="ts">
import type { YDictionary } from '../../../../../types/Dictionary'
import type { CourseQuestion } from '../../../../../types/Question'

const props = defineProps<{
  question: CourseQuestion
}>()

const items = computed<YDictionary>(() => props.question.body.options.map((option: string) => ({
  label: option,
  value: option,
})))
const label = computed<string>(() => props.question.body.question)
const modelValue = ref(props.question)
</script>

<template>
  <div>
    <label :for="question.id" class="leading-8 text-xl font-bold mb-6">{{ label }}</label>
    <YRadio :id="question.id" v-model="modelValue.userAnswer" :items size="large" :letter-label="true" />
  </div>
</template>
