<script setup lang="ts">
import type { Lesson } from '~~/types/Lesson'
import type { CourseQuestion } from '~~/types/Question'

const a = () => console.log('a')
const question: CourseQuestion = {
  id: 'asd',
  createdAt: new Date(),
  type: 'closed_question',
  userAnswer: null,
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
function updateCorrectAnswers() {
  lesson.value.correctAnswers = ++lesson.value.correctAnswers
}

const search = ref(false)
</script>

<template>
  <div>
    <h2>PLAYGROUND</h2>
    <YBtn text :click="a" label="Zaloguj" block />
    <Icon name="tabler:home" />
    <YQuestion :question />
    <div class="w-1/2">
      <YQuestionProgress :lesson />
    </div>
    <button @click="updateCorrectAnswers">
      asd
    </button>
    <YTextarea>
      <template #actions>
        <YBtn text icon="tabler:world-search" rounded size="small" :label="search ? 'Search' : undefined" :color="search ? 'primary' : 'contrast'" icon-pos="left" @click="search = !search" />
      </template>
    </YTextarea>
  </div>
</template>

<style scoped lang="scss">

</style>
