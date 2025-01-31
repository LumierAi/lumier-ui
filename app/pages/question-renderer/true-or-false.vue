<script setup lang="ts">
import type { CourseQuestion } from '../../../types/Question'

const question: CourseQuestion<boolean> = {
  id: '7a13141f-2c88-4111-acb0-ca3f63b33091',
  createdAt: new Date('2025-01-30T13:01:55.592Z'),
  type: 'true_or_false',
  userAnswer: null,
  body: {
    type: 'true_or_false',
    question: 'Stylizowany grill w projekcie „OCEAN X" podkreśla sportowy charakter pojazdu.',
    answer: true,
    difficulty: 'medium',
    schemaId: '82bab10c-740a-4869-a195-054873581114',
  },
  moduleId: '73317ea2-dbb0-434e-84b4-610831c05dfd',
  schemaId: '82bab10c-740a-4869-a195-054873581114',
  userId: 'a02e3cfa-e3c2-4be4-ab95-1bc14907a3d4',
  position: 2,
  lessonId: 'ea45cee1-1a4c-4517-9d5a-ddf67c8d7a33',
  difficulty: 'medium',
}
</script>

<template>
  <div class="bg-success h-10 w-10 rounded-full" />
  <YQuestion :question="question" />
</template>
