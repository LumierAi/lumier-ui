<script setup lang="ts">
import type { ConcreteComponent } from 'vue'
import type { PickUnion } from '../../../../types'
import type { CourseQuestion, QuestionType } from '../../../../types/Question'

defineProps<{
  question: CourseQuestion
}>()

const components: Record<QuestionType, () => ConcreteComponent> = {
  closed_question: () => resolveComponent('YQuestionTypeClosed') as ConcreteComponent,
  open_question: () => resolveComponent('YQuestionTypeOpen') as ConcreteComponent,
  true_or_false: () => resolveComponent('YQuestionTypePreview') as ConcreteComponent,
  fill_in_blanks: () => resolveComponent('YQuestionTypePreview') as ConcreteComponent,
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
