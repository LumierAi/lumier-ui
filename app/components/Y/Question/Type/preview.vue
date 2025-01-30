<script setup lang="ts">
import type { CourseQuestion } from '../../../../../types/Question'

const props = defineProps<{
  question: CourseQuestion
}>()
</script>

<template>
  <pre class="whitespace-pre-wrap">{{ question }}</pre>
</template>
