<script setup lang="ts">
import type { Message } from 'ai'

defineProps<{
  messages: Message[]
  loading?: boolean
}>()
</script>

<template>
  <div class="chat-view flex flex-col space-y-4 p-4">
    <YChatMessage
      v-for="message in messages"
      :key="message.id"
      :message="message"
      class="w-full"
    />
    <div v-if="loading" class="loading-indicator flex items-center justify-center space-x-1 p-2">
      <span class="dot animate-bounce"></span>
      <span class="dot animate-bounce delay-150"></span>
      <span class="dot animate-bounce delay-300"></span>
    </div>
  </div>
</template>

<style scoped>
.loading-indicator .dot {
  width: 8px;
  height: 8px;
  background-color: #312319; /* Use text color for dots */
  border-radius: 50%;
  display: inline-block;
}

/* Add delay utility classes if not globally available */
.delay-150 {
  animation-delay: 0.15s;
}

.delay-300 {
  animation-delay: 0.3s;
}

/* Ensure bounce animation is defined or use Tailwind's animate-bounce */
/* If not using Tailwind, define the bounce animation: */
/*
@keyframes bounce {
  0%, 100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}
.animate-bounce {
  animation: bounce 1s infinite;
}
*/
</style>
