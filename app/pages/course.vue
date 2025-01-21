<script setup lang="ts">
import type { Lesson } from '~~/types/Lesson'
import type { CourseQuestion } from '~~/types/Question'

const question: CourseQuestion = {
  id: 'asd',
  createdAt: new Date(),
  type: 'closed_question',
  userAnswer: 'LED, automatyczne, dynamiczne powitalne.',
  moduleId: '',
  schemaId: 'fbc3d12a-9b27-416e-8e95-8a60fac170b4',
  userId: 'asd',
  position: 1,
  lessonId: 'asd',
  difficulty: 'hard',
  message: 'asd',
  body: {
    question: 'Jakie specyficzne cechy oświetlenia wyróżniają BYD Seal U DM-i na tle innych modeli?',
    options: [
      'LED, automatyczne, dynamiczne powitalne.',
      'LED, manualne, dynamiczne powitalne.',
      'LED, automatyczne, statyczne powitalne.',
      'LED, automatyczne, bez powitalnych funkcji.',
    ],
    difficulty: 'hard',
    type: 'closed_question',
    schemaId: 'fbc3d12a-9b27-416e-8e95-8a60fac170b4',
  },
}
const lesson: Ref<Lesson> = ref({
  id: '416fdc3a-313a-40e3-a95e-118d12ead25b',
  bulbs: 0,
  status: 'not_started',
  position: 1,
  maxBulbs: 2,
  correctAnswers: 7,
  _count: {
    CourseQuestion: 8,
  },
  bulbThresholds: [
    {
      bulbNumber: 1,
      questionsNeeded: 6,
    },
    {
      bulbNumber: 2,
      questionsNeeded: 8,
    },
  ],
},
)

const userAnswer = ref('LED, automatyczne, dynamiczne powitalne.')
const explanation = ref('BYD Seal U DM-i wyróżnia się oświetleniem LED z automatyczną kontrolą oraz dynamiczną funkcją powitalną, co stanowi jeden z jego charakterystycznych elementów designu.')
</script>

<template>
  <div>
    <h2>PLAYGROUND course</h2>
    <Icon name="tabler:home" />
    <YBtn label="asd" danger />
    <YBtn label="asd" color="success" />
    <YBtn label="asd" color="danger" />
    <YQuestion :question />
    <div class="w-1/2">
      <YQuestionProgress :lesson />
    </div>
    <YAnswerExplanation
      :result="{
        isCorrect: false,
        isModuleFinished: false,
        explanation,
        answer: userAnswer,
        newBulb: false,
      }"
      :current-question="question"
    />
  </div>
</template>

<style scoped lang="scss">

</style>
