<script setup lang="ts">
import type { CourseQuestion } from '../../../types/Question'

function isStringSimilar(str1: string, str2: string): boolean {
  // Normalize strings: remove diacritics and convert to lowercase
  const normalize = (str: string) =>
    str.normalize('NFD').replace(/[\u0300-\u036F]/g, '').toLowerCase()

  const s1 = normalize(str1)
  const s2 = normalize(str2)

  // If the length difference is greater than 1, they cannot be similar
  if (Math.abs(s1.length - s2.length) > 1)
    return false

  // If strings have the same length, count differing characters
  if (s1.length === s2.length) {
    let diffCount = 0
    for (let i = 0; i < s1.length; i++) {
      if (s1[i] !== s2[i]) {
        diffCount++
        if (diffCount > 1)
          return false
      }
    }
    return true
  }
  else {
    // Ensure s1 is the shorter string
    const [shorter, longer] = s1.length < s2.length ? [s1, s2] : [s2, s1]
    let i = 0; let j = 0
    let foundDifference = false

    while (i < shorter.length && j < longer.length) {
      if (shorter[i] === longer[j]) {
        i++
        j++
      }
      else {
        if (foundDifference)
          return false
        foundDifference = true
        j++ // Skip one character in the longer string
      }
    }
    return true
  }
}

const question: CourseQuestion<string> = {
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
