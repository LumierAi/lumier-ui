<template>
  <div class="chat-view flex flex-col space-y-4 p-4">
    <LChatMessage
      v-for="message in messages"
      :key="message.id"
      :message="message"
      class="w-full"
    />
  </div>
</template>

<script setup lang="ts">
import type { Message } from 'ai'

defineProps<{
  messages: Message[]
}>()
</script>

<style scoped>
</style>
