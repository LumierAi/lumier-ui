<script setup lang="ts">
import type { Lesson } from '~~/types/Lesson'
import type { CourseQuestion } from '~~/types/Question'

const a = () => console.error('a')
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
const currentAnswer = ref<CourseQuestion<string>>({
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
  console.error('log')
}
const search = ref(false)
const prompt = ref('')
const chatConfig = ref({
  tavily_web_search: false,
  knowledge_blocks_search: false,
  jasne_initial_information: false,
  issues_search: false,
})
const knowledgeMode = ref('Plik')

// Dane dla YRadio i YCheckbox
const radioValue = ref('option2')
const radioOptions = ref([
  { value: 'option1', label: 'Opcja 1' },
  { value: 'option2', label: 'Opcja 2' },
  { value: 'option3', label: 'Opcja 3' },
])

const checkboxValue = ref(['option1'])
const checkboxOptions = ref([
  { value: 'option1', label: 'Wybór 1' },
  { value: 'option2', label: 'Wybór 2' },
  { value: 'option3', label: 'Wybór 3' },
])
</script>

<template>
  <div>
    <SelectButton v-model="knowledgeMode" size="large" :options="['Plik', 'Tekst']" />
    <YBtn secondary label="Test" />
    <YCard class="m-4" title="Playground">
      <template #menu>
        <YBtn
          label="Chat"
        />
      </template>
      <YBtn text :click="a" label="Zaloguj" block />
      <Icon name="tabler:home" />
      <div class="w-1/2">
        <YQuestionProgress :lesson />
      </div>
      <button @click="updateCorrectAnswers">
        asd
      </button>
      <YTextarea v-model="prompt" :rows="1"  placeholder="sad"/>
      <YChatInput v-model="prompt" v-model:config="chatConfig" :handle-submit="() => {}" :disabled-additional-options="false" />
      <YAnswerExplanation :result="answerResult" :current-question="currentAnswer" @continue="log" />
      
      <!-- Przykład użycia YRadio -->
      <div class="mt-8">
        <h3 class="text-xl mb-4">Przykład Radio</h3>
        <YRadio v-model="radioValue" :items="radioOptions" />
        <p class="mt-2">Wybrana wartość: {{ radioValue }}</p>
      </div>
      
      <!-- Przykład użycia YCheckbox -->
      <div class="mt-8">
        <h3 class="text-xl mb-4">Przykład Checkbox</h3>
        <YCheckbox inline v-model="checkboxValue" :items="checkboxOptions" />
        <p class="mt-2">Wybrane wartości: {{ checkboxValue }}</p>
      </div>
    </YCard>
  </div>
</template>

<style scoped lang="scss">

</style> 
