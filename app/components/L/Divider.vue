<script setup lang="ts">
import { defineProps } from 'vue'

interface DividerProps {
  label?: string
}

const props = defineProps<DividerProps>()
</script>

<template>
  <div class="flex items-center justify-center w-full relative my-4">
    <template v-if="props.label">
      <span class="bg-white px-4 z-10">{{ props.label }}</span>
    </template>
    <span class="absolute left-0 top-1/2 w-full border-t border-gray-300" />
  </div>
</template>
