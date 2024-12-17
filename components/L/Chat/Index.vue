<template>
    <div class="h-screen">
      <div class="max-w-[700px] mx-auto h-full px-4">
        <div class="messages-container h-full">
          <Transition name="fade" mode="out-in">
            <template v-if="chat.messages.value.length === 0">
              <div class="text-center py-12 messages-container">
                <div class="flex justify-center">
                  <LLogo class="mb-8" />
                </div>
                <h1 class="text-2xl font-semibold mb-6">
                  Czat Jasne
                </h1>
                <p class="text-gray-600 dark:text-gray-400 mb-12">
                  Możesz zadawać pytania dotyczące wszystkich zagadnień ze zdobytej wiedzy
                </p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div v-for="card in chatCards" :key="card.title">
                    <div
                      class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 h-full cursor-pointer hover:opacity-90 transition-opacity"
                      @click="handleCardClick(card)"
                    >
                      <div class="text-xl font-semibold text-gray-900 dark:text-white pb-2">
                        {{ card.title }}
                      </div>
                      <p class="text-gray-600 dark:text-gray-300">
                        {{ card.description }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </Transition>
          <div v-show="chat.messages.value.length > 0" class="absolute inset-0">
            <LChatView :messages="chat.messages.value" class="flex-grow overflow-auto h-full no-scrollbar" />
          </div>
        </div>

        <div class="py-4 sticky bottom-0">
          <LChatInput
            v-model:web-search="config.webSearch"
            v-model="chat.input.value"
            :handle-submit="chat.handleSubmit"
          />
        </div>
      </div>
    </div>
  </template>

  <script setup lang="ts">
  import { useChat } from '@ai-sdk/vue'
import { ref } from 'vue';
import { useCookie, useAsyncData } from 'nuxt/app';
  import {ChatConfig} from "../../../types/ChatConfig";
   const teamId = useCookie('teamId');
  const config = ref<ChatConfig>({
    webSearch: false,
  })
  const chat = useChat({
    body: {
      config: config.value,
    },
    api: 'http://localhost:3017/api/chat',
  })

  interface ChatCard {
    title: string
    description: string
    prompt: string
  }
  const { data: chatCards } = useAsyncData(`chat-cards-${teamId.value}`, () => $fetch<ChatCard[]>('http://localhost:3017/api/user/propositions'))

  function handleCardClick(card: ChatCard) {
    chat.input.value = card.prompt
    chat.handleSubmit()
  }
  </script>

  <style scoped lang="scss">

  </style>
