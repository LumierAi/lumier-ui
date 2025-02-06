<script setup lang="ts">
import type { YDictionary } from '../../../../../types/Dictionary'
import type { CourseQuestion } from '../../../../../types/Question'
import { shuffle } from 'lodash-es'
import { computed, ref, watch } from 'vue'

const props = defineProps<{
  question: CourseQuestion<string>
}>()

function generateRandomChars(count: number, includeDigits: boolean): string[] {
  let pool = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  if (includeDigits)
    pool += '0123456789'

  return Array.from({ length: count }, () => {
    const randomIndex = Math.floor(Math.random() * pool.length)
    return pool[randomIndex]
  }).filter(Boolean) as string[]
}

const scrambledLetters = ref<YDictionary>([])

// Śledzenie wybranych liter przez użytkownika
const selectedLetters = ref<(string | null)[]>([])

// Usuwanie litery z odpowiedzi
function removeLetter(index: number) {
  selectedLetters.value[index] = null
}

const parts = computed(() => props.question.body.question.split('__BLANK__'))

const filledAnswer = computed(() => {
  const answerString = props.question.body.answer! as string
  const questionString = props.question.body.question
  const [prefix, suffix] = questionString.split('__BLANK__') as [string, string]
  return answerString.slice(prefix.length, answerString.length - (suffix?.length || 0)).replace(/\.$/, '')
})

const filledAnswerLetters = filledAnswer.value.split('')

const hasDigits = filledAnswerLetters.some(c => /\d/.test(c))
// const randomChars = generateRandomChars(filledAnswerLetters.length, hasDigits)
const proposalsCount = Math.ceil(filledAnswerLetters.length * 0.6)
const randomChars = generateRandomChars(proposalsCount, hasDigits)

// Tworzymy tablicę z literą z odpowiedzi oraz losowo wygenerowanymi literami
const combined = [...filledAnswerLetters, ...randomChars]

// Zmiana: wszystkie litery na duże i sortowanie alfabetyczne
const combinedUpperCase = combined.map(letter => letter.toUpperCase()).sort((a, b) => a.localeCompare(b))
scrambledLetters.value = combinedUpperCase.map(letter => ({
  label: letter,
  value: useId(),
}))

// Dodawanie litery do odpowiedzi
function addLetter(letterId: string) {
  const nullIndex = selectedLetters.value.findIndex(val => val === null)
  if (nullIndex !== -1) {
    selectedLetters.value[nullIndex] = letterId
  }
  else if (selectedLetters.value.length < filledAnswer.value.length) {
    selectedLetters.value.push(letterId)
  }
}

watch(selectedLetters, () => {
  const answer = selectedLetters.value
    .map(letterId => letterId ? (scrambledLetters.value.find(letter => letter.value === letterId)?.label || '') : '')
    .join('')
  props.question.userAnswer = answer
}, { deep: true })
</script>

<template>
  <div class="flex flex-col gap-4">
    <!-- Wyświetlenie pytania z luką -->
    <div class="flex flex-row items-center flex-wrap">
      <template v-for="(part, index) in parts" :key="index">
        {{ part }}
        <div
          v-if="index !== parts.length - 1"
          class="mx-2 flex gap-1 min-h-[32px] items-center"
        >
          <!-- Pola na litery -->
          <div class="flex gap-1 flex-wrap">
            <div
              v-for="i in filledAnswer.length"
              :key="i"
              class="w-6 h-6 border-b-2 border-gray-300 flex items-center justify-center pb-1"
            >
              <div
                v-if="selectedLetters[i - 1]"
                class="cursor-pointer flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200 transition-colors w-full"
                @click="removeLetter(i - 1)"
              >
                {{ scrambledLetters.find(letter => letter.value === selectedLetters[i - 1])?.label }}
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>

    <!-- Panel z dostępnymi literami -->
    <div class="flex flex-wrap gap-2">
      <YBtn
        v-for="(object, index) in scrambledLetters"
        :key="index"
        :label="object.label"
        size="small"
        :secondary="selectedLetters.includes(object.value)"
        class="transition-colors"
        :disabled="selectedLetters.includes(object.value)"
        @click="addLetter(object.value)"
      />
    </div>
  </div>
</template>
