<script setup lang="ts">
import type { ConcreteComponent } from 'vue'
import type { CourseQuestion, QuestionType } from '../../../../types/Question'

defineProps<{
  question: CourseQuestion<string | boolean>
}>()

const components: Record<QuestionType, () => ConcreteComponent> = {
  closed_question: () => resolveComponent('YQuestionTypeClosed') as ConcreteComponent,
  open_question: () => resolveComponent('YQuestionTypeOpen') as ConcreteComponent,
  true_or_false: () => resolveComponent('YQuestionTypeTrueOrFalse') as ConcreteComponent,
  fill_in_blanks: () => resolveComponent('YQuestionTypeFillInBlanks') as ConcreteComponent,
}

function getQuestionComponent(type: QuestionType) {
  return components[type]()
}
</script>

<template>
  <component :is="getQuestionComponent(question.type)" :question="question" />
</template>

<style scoped>

</style>
