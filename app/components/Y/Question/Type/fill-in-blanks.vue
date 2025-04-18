<script setup lang="ts">
import type { YDictionary } from '../../../../../types/Dictionary'
import type { CourseQuestion } from '../../../../../types/Question'
import { computed, ref, watch, watchEffect } from 'vue'
useHead({
  meta: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
    },
  ],
})
const props = defineProps<{
  question: CourseQuestion<string>
}>()

// Function to shuffle an array (Fisher-Yates)
function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // Use temporary variable for safer type inference
    const temp = array[i]!;
    array[i] = array[j]!;
    array[j] = temp;
  }
  return array;
}

const scrambledLetters = ref<YDictionary>([])
const selectedLetters = ref<(string | null)[]>([])
const prefilledIndices = ref<Set<number>>(new Set())

// Usuwanie litery z odpowiedzi
function removeLetter(index: number) {
  if (!prefilledIndices.value.has(index)) {
    selectedLetters.value[index] = null
  }
}

const parts = computed(() => props.question.body.question.split('__BLANK__'))

const filledAnswer = computed(() => {
  const answerString = props.question.body.answer! as string
  const questionString = props.question.body.question
  const [prefix, suffix] = questionString.split('__BLANK__') as [string, string]
  return answerString.slice(prefix.length, answerString.length - (suffix?.length || 0)).replace(/\.$/, '')
})

// --- Initialization Logic (runs once) ---

const answerLetters = filledAnswer.value.split('')
const answerLength = answerLetters.length

if (answerLength > 0) { // Only run if there is an answer to fill
  // 1. Generate scrambled letters with unique IDs
  const combinedUpperCase = [...answerLetters].map(letter => letter.toUpperCase()).sort((a, b) => a.localeCompare(b))
  const currentScrambled = combinedUpperCase.map(letter => ({
    label: letter,
    value: crypto.randomUUID(),
  }))
  scrambledLetters.value = currentScrambled

  // Keep track of available letters for pre-filling (label -> list of available IDs)
  const availableScrambled = new Map<string, string[]>()
  currentScrambled.forEach(item => {
    if (!availableScrambled.has(item.label)) {
      availableScrambled.set(item.label, [])
    }
    availableScrambled.get(item.label)!.push(item.value)
  })

  // 2. Determine number of pre-filled letters based on difficulty
  let numPrefilled = 0
  if (props.question.difficulty === 'easy') {
    console.log('easy')
    numPrefilled = Math.floor(answerLength * 0.5)
  } else if (props.question.difficulty === 'medium') {
    console.log('medium')
    numPrefilled = Math.floor(answerLength * 0.3)
  } else if (props.question.difficulty === 'hard') {
    console.log('hard')
    numPrefilled = Math.floor(answerLength * 0.15)
  } // Very_hard or other gets 0

  // 3. Select indices to pre-fill
  const indices = Array.from({ length: answerLength }, (_, i) => i)
  const shuffledIndices = shuffleArray(indices)
  const currentPrefilledIndices = new Set<number>()
  const currentSelectedLetters = Array(answerLength).fill(null)

  // 4. Pre-fill selected letters
  for (let i = 0; i < numPrefilled; i++) {
    const indexToFill: number = shuffledIndices[i]!; // Add non-null assertion
    const correctLetter = answerLetters[indexToFill]!.toUpperCase() // Add non-null assertion here too
    const availableIds = availableScrambled.get(correctLetter)

    if (availableIds && availableIds.length > 0) {
        const letterId = availableIds.shift()! // Consume one ID for this letter
        currentSelectedLetters[indexToFill] = letterId
        currentPrefilledIndices.add(indexToFill)
    }
  }

  selectedLetters.value = currentSelectedLetters
  prefilledIndices.value = currentPrefilledIndices
}

// --- End Initialization Logic ---

// Toggle letter selection: Add if not selected, remove if selected (and not prefilled)
function toggleLetter(letterId: string) {
  const selectedIndex = selectedLetters.value.findIndex(id => id === letterId);

  if (selectedIndex !== -1) {
    // Letter is selected, try to remove it
    if (!prefilledIndices.value.has(selectedIndex)) {
      selectedLetters.value[selectedIndex] = null;
    }
  } else {
    // Letter is not selected, try to add it to the first available non-prefilled slot
    const availableSlotIndex = selectedLetters.value.findIndex(
      (val, idx) => val === null && !prefilledIndices.value.has(idx)
    );
    if (availableSlotIndex !== -1) {
      selectedLetters.value[availableSlotIndex] = letterId;
    }
  }
}

// Watch for user changes to update the answer
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
              v-for="(letter, i) in filledAnswer.split('')"
              :key="i"
              class="w-6 h-6 border-b-2 border-gray-300 flex items-center justify-center pb-1"
            >
              <template v-if="prefilledIndices.has(i)">
                 <div class="flex items-center justify-center bg-primary text-secondary rounded w-full h-[20px] cursor-default">
                   {{ letter.toUpperCase() }}
                 </div>
              </template>
              <template v-else-if="selectedLetters[i]">
                <div
                  class="cursor-pointer flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200 transition-colors w-full h-[20px]"
                  @click="removeLetter(i)"
                >
                  {{ scrambledLetters.find(l => l.value === selectedLetters[i])?.label }}
                </div>
              </template>
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
        :disabled="selectedLetters.includes(object.value) && prefilledIndices.has(selectedLetters.findIndex((id: string | null) => id === object.value))"
        @click="toggleLetter(object.value)"
      />
    </div>
  </div>
</template>
