<script setup lang="ts">
import type { CourseQuestion } from '../../../types/Question'

const question: CourseQuestion = {
  id: 'f031ab89-a2a3-4e89-a3be-805c922b3810',
  createdAt: new Date('2025-01-30T15:26:04.639Z'),
  type: 'fill_in_blanks',
  userAnswer: null,
  body: {
    type: 'fill_in_blanks',
    question: 'Wersją BYD SEALION 7 z większą pojemnością baterii jest __BLANK__.',
    difficulty: 'hard',
    schemaId: '7b4ebdb3-bf1f-483b-8bf3-7e1068c10a9b',
    answer: 'Wersją BYD SEALION 7 z większą pojemnością baterii jest Excellence.',
  },
  moduleId: '5c2e49eb-af81-4904-80ea-504a1e6cd80c',
  schemaId: '7b4ebdb3-bf1f-483b-8bf3-7e1068c10a9b',
  userId: 'a02e3cfa-e3c2-4be4-ab95-1bc14907a3d4',
  position: 6,
  lessonId: 'db3a7a22-830e-4ad2-a0db-e068d04fe506',
  difficulty: 'hard',
}
</script>

<template>
  <YQuestion :question="question" />
</template>
