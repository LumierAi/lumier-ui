<script setup lang="ts">
import type { CourseQuestion } from '~~/types/Question'

const a = () => console.log('a')
const question: CourseQuestion = {
  id: 'asd',
  type: 'closed_question',
  userAnswer: null,
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
</script>

<template>
  <div>
    <h2>PLAYGROUND</h2>
    <YBtn primary :click="a" label="Zaloguj" block />
    <Icon name="tabler:home" />
    <YQuestion :question />
    <div class="w-1/2">
      <YQuestionProgress :progress="50" />
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
