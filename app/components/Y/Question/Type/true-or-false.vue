<script setup lang="ts">
import type { CourseQuestion } from '../../../../../types/Question'
import { computed, ref } from 'vue'

const props = defineProps<{
  question: CourseQuestion<boolean>
}>()

const emits = defineEmits(['questionAnswered'])

const label = computed<string>(() => props.question.body.question)
const userAnswer = ref<boolean | null>(props.question.userAnswer)

function setAnswer(value: boolean) {
  userAnswer.value = value
  props.question.userAnswer = value
  emits('questionAnswered')
}
</script>

<template>
  <div>
    <YCard>
      <label :for="question.id" class="leading-8 text-xl font-bold">{{ label }}</label>
    </YCard>
    <div class="flex gap-4 mt-6 mx-auto justify-center">
      <YBtn
        block
        label="Fałsz"
        color="danger"
        @click="setAnswer(false)"
      />
      <YBtn
        block
        label="Prawda"
        color="success"
        @click="setAnswer(true)"
      />
    </div>
  </div>
</template>
