<script setup lang="ts">
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

const scrambledLetters = ref<string[]>([])

// Śledzenie wybranych liter przez użytkownika
const selectedLetters = ref<string[]>([])

// Dodawanie litery do odpowiedzi
function addLetter(letter: string) {
  selectedLetters.value.push(letter)
}

// Usuwanie litery z odpowiedzi
function removeLetter(index: number) {
  selectedLetters.value.splice(index, 1)
}

const parts = computed(() => props.question.body.question.split('__BLANK__'))

const filledAnswer = computed(() => {
  const answerString = props.question.body.answer! as string
  const questionString = props.question.body.question
  const [prefix, suffix] = questionString.split('__BLANK__') as [string, string]
  return answerString.slice(prefix.length, answerString.length - (suffix?.length || 0)).trim()
})

console.log('filledAnswer', filledAnswer.value)
const filledAnswerLetters = filledAnswer.value.split('')

const hasDigits = filledAnswerLetters.some(c => /\d/.test(c))
const randomChars = generateRandomChars(filledAnswerLetters.length, hasDigits)
const combined = [...filledAnswerLetters, ...randomChars]
scrambledLetters.value = shuffle(combined)
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
                {{ selectedLetters[i - 1] }}
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>

    <!-- Panel z dostępnymi literami -->
    <div class="flex flex-wrap gap-2">
      <button
        v-for="(letter, index) in scrambledLetters"
        :key="index"
        class="px-4 py-2 border rounded hover:bg-gray-100 transition-colors"
        :class="{ 'opacity-50 cursor-not-allowed': selectedLetters.includes(letter) }"
        :disabled="selectedLetters.includes(letter)"
        @click="addLetter(letter)"
      >
        {{ letter }}
      </button>
    </div>
  </div>
</template>
