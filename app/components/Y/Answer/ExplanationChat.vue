<script setup lang="ts">
import type { CoreMessage } from 'ai'
import { useChat } from '@ai-sdk/vue'

interface ExplanationChatBody {
  question: string
  userAnswer: string
  correctAnswer: string
  explanation: string
  moduleId: string
  messages: CoreMessage[]
}

const props = defineProps<{
  question: string
  userAnswer: string
  correctAnswer: string
  explanation: string
  moduleId: string
}>()

const isInputInFocus = ref(false)
const chatStarted = defineModel<boolean>('chatStarted', {
  type: Boolean,
  default: false,
})

const { messages, handleSubmit, input } = useChat({
  api: '/api/ai/explanation/chat',
  initialMessages: [{
    id: '1',
    role: 'system',
    content: `You are a helpful assistant that explains answers to questions.
     Explain following question: ${props.question}
     Correct answer: ${props.correctAnswer}
     User answer: ${props.userAnswer}
     Explanation: ${props.explanation}
     Use examples and explain why the user answer is correct or incorrect.
     You are answering to a student, so use simple language and explain in a way that is easy to understand.
     `,
  }],
  body: {
    question: props.question,
    userAnswer: props.userAnswer,
    correctAnswer: props.correctAnswer,
    explanation: props.explanation,
    moduleId: props.moduleId,
  } satisfies Omit<ExplanationChatBody, 'messages'>,
})

function submitQuestion() {
  chatStarted.value = true
  handleSubmit()
}

function startChat() {
  chatStarted.value = true
  input.value = 'Wytłumacz mi to'
  handleSubmit()
}

const isChatInputFull = computed(() => {
  return chatStarted.value || isInputInFocus.value
})

function handleBlur() {
  // Only blur if the input is empty
  if (!input.value.trim()) {
    isInputInFocus.value = false
  }
}
</script>

<template>
  <div class="flex flex-col transition-all duration-300" :class="{ 'h-full': chatStarted }">
    <div v-show="chatStarted" class="transition-all duration-300 flex-1 w-full pb-4 space-y-4">
      <div class="overflow-y-auto ">
        <div v-for="message in messages" :key="message.id">
          <div v-if="message.role === 'assistant'" class="text-sm text-gray-500">
            <YMDC
              class="prose prose-sm dark:prose-invert"
              :content="message.content"
            />
          </div>
          <div v-else-if="message.role === 'user'" class="text-sm text-gray-500 text-right">
            <YMDC
              class="prose prose-sm dark:prose-invert"
              :content="message.content"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="flex gap-2 items-start flex-shrink-0">
      <div
        class="transition-all duration-300 overflow-hidden flex items-center"
        :class="[
          isChatInputFull ? 'w-0 opacity-0' : 'w-[80px] opacity-100',
        ]"
      >
        <YBtn
          label="Explain"
          class="text-white whitespace-nowrap transition-opacity duration-300"
          size="small"
          secondary
          rounded
          @click="startChat()"
        />
      </div>
      <YTextarea
        v-model="input"
        :rows="1"
        rounded
        placeholder="Ask a question"
        size="small"
        class="flex-1 transition-all duration-300 min-w-0"
        :class="(isChatInputFull) ? 'max-w-full' : 'max-w-[200px]'"
        submit-on-enter
        @focus="isInputInFocus = true"
        @blur="handleBlur"
        @submit="submitQuestion"
      />
    </div>
  </div>
</template>

<style scoped>
</style>
