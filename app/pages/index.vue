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
})
const currentAnswer = ref<CourseQuestion>({
  id: '646d65d6-d8a6-4fbe-80cb-ac5754b0c46c',
  createdAt: new Date('2025-01-19T15:37:00.570Z'),
  type: 'closed_question',
  userAnswer: 'Boron (B) do uran (U)',
  body: {
    question: 'Jaki jest zakres mierzalnych elementów dla EDS i WDS?',
    options: [
      'Boron (B) do uran (U)',
      'Beryllium (Be) do pluton (Pu)',
      'Fluorine (F) do thorium (Th)',
      'Nitrogen (N) do radon (Rn)',
    ],
    difficulty: 'medium',
    type: 'closed_question',
    schemaId: 'b2ce9e20-366c-4d98-bf83-c95eed6d204f',
  },
  moduleId: 'a9fb12f1-df23-4642-80ca-e7c69ef4150b',
  schemaId: 'b2ce9e20-366c-4d98-bf83-c95eed6d204f',
  userId: '5a86b106-a909-4ef9-8ba6-ba2580945d7f',
  position: 1,
  lessonId: '043d0b46-73f0-4ee3-acd6-55a0054ac3ed',
  difficulty: 'medium',
})
const answerResult = ref({
  isCorrect: true,
  isModuleFinished: false,
  explanation: 'Zarówno EDS, jak i WDS mogą mierzyć pierwiastki od boru (B) do uranu (U), co czyni je odpowiednimi do podobnych analiz materiałowych.',
  answer: 'Boron (B) do uran (U)',
  newBulb: false,
})
function updateCorrectAnswers() {
  lesson.value.correctAnswers = ++lesson.value.correctAnswers
}

function log() {
  console.log('log')
}
const search = ref(false)
const prompt = ref('')
const chatConfig = ref({
  tavily_web_search: false,
  knowledge_blocks_search: false,
  jasne_initial_information: false,
  issues_search: false,
})
</script>

<template>
  <YCard class="m-4">
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
    <YTextarea v-model="prompt">
      <template #actions>
        <YBtn text icon="tabler:world-search" rounded size="small" :label="search ? 'Search' : undefined" :color="search ? 'primary' : 'contrast'" icon-pos="left" @click="search = !search" />
      </template>
    </YTextarea>
    <YChatInput v-model="prompt" v-model:config="chatConfig" :handle-submit="() => {}" :disabled-additional-options="false" />
    <YAnswerExplanation :result="answerResult" :current-question="currentAnswer" @continue="log" />
  </YCard>
</template>

<style scoped lang="scss">

</style>
