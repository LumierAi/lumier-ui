<script setup lang="ts">
import type { CourseQuestion } from '~~/types/Question'

const closedQuestion = reactive<CourseQuestion<string>>({
  userAnswer: null,
  id: '5a2ce499-03a1-4acf-98a7-1d331e1c5dd0',
  createdAt: new Date('2025-02-25T16:50:55.359Z'),
  type: 'closed_question',
  body: {
    question: 'Z jakiego języka wywodzi się słowo "chemia"?',
    options: [
      'Z arabskiego.',
      'Z języka niemieckiego.',
      'Z łaciny.',
      'Ze starogreckiego "chymeia".',
    ],
    answer: 'Ze starogreckiego "chymeia".',
    difficulty: 'easy',
    type: 'closed_question',
    schemaId: '33dc8970-f049-4c9e-ae00-a2236d011512',
  },
  moduleId: 'd439249c-0a37-483a-9368-748e2a892672',
  schemaId: '33dc8970-f049-4c9e-ae00-a2236d011512',
  userId: '5a86b106-a909-4ef9-8ba6-ba2580945d7f',
  position: 1,
  lessonId: '78923411-db33-4b36-8281-d8f7f3e391e0',
  difficulty: 'easy',
})

const fillInBlanksQuestion = reactive<CourseQuestion<string>>({
  userAnswer: null,
  id: '0be1df24-0f0c-4802-8520-23863dc17949',
  createdAt: new Date('2025-04-18T19:39:23.396Z'),
  type: 'fill_in_blanks',
  body: {
    type: 'fill_in_blanks',
    question: 'Wzrost monopodialny oznacza, że storczyk rozwija jedną główną __BLANK__.',
    answer: 'Wzrost monopodialny oznacza, że storczyk rozwija jedną główną łodygę.',
    difficulty: 'medium',
    schemaId: '01964a67-80b2-7cc4-8ac3-df5ac71e0dd7',
  },
  moduleId: '5f6a8f78-423b-44db-b9a1-18ccf8273fcc',
  schemaId: '01964a67-80b2-7cc4-8ac3-df5ac71e0dd7',
  userId: '5a86b106-a909-4ef9-8ba6-ba2580945d7f',
  position: 3,
  lessonId: 'afb1cac2-1884-4f82-ac99-cfdfc712faeb',
  difficulty: 'medium',
})

const openQuestion = reactive<CourseQuestion<string>>({
  userAnswer: null,
  id: '15fca6c4-2e3c-4e06-9153-a2ec89b7a09c',
  createdAt: new Date('2025-02-25T16:50:55.359Z'),
  type: 'open_question',
  body: {
    question: 'Jak zmieniały się zastosowania wiedzy chemicznej na przestrzeni wieków?',
    difficulty: 'very_hard',
    answer: 'Od metalurgii do medycyny.',
    type: 'open_question',
    options: [],
    schemaId: '28ccbfcf-e4f7-4204-8862-233d231dfa4b',
  },
  moduleId: 'd439249c-0a37-483a-9368-748e2a892672',
  schemaId: '28ccbfcf-e4f7-4204-8862-233d231dfa4b',
  userId: '5a86b106-a909-4ef9-8ba6-ba2580945d7f',
  position: 1,
  lessonId: '3d3e359e-5dd2-40d0-8b67-a0eec398b131',
  difficulty: 'very_hard',
})

const trueOrFalseQuestion = reactive<CourseQuestion<boolean>>({
  userAnswer: null,
  id: '60f8eb98-b098-408e-b28f-fe5c1b396409',
  createdAt: new Date('2025-02-25T16:50:55.359Z'),
  type: 'true_or_false',
  body: {
    type: 'true_or_false',
    question: 'Liczba atomowa pierwiastka określana jest przez ilość neutronów w jądrze.',
    answer: false,
    difficulty: 'medium',
    schemaId: '94256692-bd8f-44e6-8b0c-707bf180d7d6',
  },
  moduleId: 'd439249c-0a37-483a-9368-748e2a892672',
  schemaId: '94256692-bd8f-44e6-8b0c-707bf180d7d6',
  userId: '5a86b106-a909-4ef9-8ba6-ba2580945d7f',
  position: 2,
  lessonId: 'aab0b9d7-368c-434d-8819-f56e6bb48fa1',
  difficulty: 'medium',
})
</script>

<template>
  <div>
    <pre>{{ closedQuestion.userAnswer }}</pre>
    <YQuestion :question="closedQuestion" />
    <pre>{{ fillInBlanksQuestion.userAnswer }}</pre>
    <YQuestion :question="fillInBlanksQuestion" />
    <pre>{{ openQuestion.userAnswer }}</pre>
    <YQuestion :question="openQuestion" />
    <pre>{{ trueOrFalseQuestion.userAnswer }}</pre>
    <YQuestion :question="trueOrFalseQuestion" />
  </div>
</template>
