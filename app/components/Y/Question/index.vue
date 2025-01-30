<script setup lang="ts">
import type { ConcreteComponent } from 'vue'
import type { PickUnion } from '../../../../types'
import type { CourseQuestion, QuestionType } from '../../../../types/Question'

defineProps<{
  question: CourseQuestion
}>()

const components: Record<PickUnion<QuestionType, 'closed_question' | 'open_question'>, () => ConcreteComponent> = {
  closed_question: () => resolveComponent('YQuestionTypeClosed') as ConcreteComponent,
  open_question: () => resolveComponent('YQuestionTypeOpen') as ConcreteComponent,
}

function getQuestionComponent(type: QuestionType) {
  // TODO: W przyszłości to trzeba wyczyścić dodając reszte typów
  const componentCtor = components[type as unknown as keyof typeof components]!
  return componentCtor()
}
</script>

<template>
  <component :is="getQuestionComponent(question.type)" :question="question" />
</template>

<style scoped>

</style>
