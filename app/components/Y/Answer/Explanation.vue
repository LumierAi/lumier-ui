<script setup lang="ts">
import type { CoreMessage } from 'ai'
import type { CourseQuestion } from '../../../../types/Question'
import { useChat } from '@ai-sdk/vue'

interface QuizResult {
  isCorrect: boolean
  isModuleFinished: boolean
  explanation: string
  answer: string
  newBulb: boolean
}

interface ExplanationChatBody {
  question: string
  userAnswer: string | boolean
  correctAnswer: string
  options?: string[]
  explanation: string
  moduleId: string
  messages: CoreMessage[]
}

const props = defineProps<{
  result: QuizResult
  currentQuestion: CourseQuestion<string | boolean>
  chatUrl?: string
}>()

defineEmits<{
  (e: 'continue'): void
}>()

const chatMode = ref<boolean>(false)
const isInputInFocus = ref(false)
const defaultQuestion = useUiT('answer.explanation.defaultQuestion')
// Add chat functionality

const { messages, handleSubmit, input, isLoading } = useChat({
  api: props.chatUrl || '/api/ai/explanation/chat',
  credentials: props.chatUrl ? 'include' : 'same-origin',
  initialMessages: [{
    id: '1',
    role: 'system',
    content: `
     You are a helpful assistant that explains answers to questions.
     Explain following question: ${props.currentQuestion.body.question}
     Correct answer: ${props.result.answer}
     User answer: ${props.currentQuestion.userAnswer}
     Explanation: ${props.result.explanation}
     Use examples and explain why the user answer is correct or incorrect.
     You are answering to a student, so use simple language and explain in a way that is easy to understand.
     `,
  }],
  body: {
    question: props.currentQuestion.body.question,
    userAnswer: props.currentQuestion.userAnswer!,
    correctAnswer: props.result.answer,
    explanation: props.result.explanation,
    moduleId: props.currentQuestion.moduleId,
    options: props.currentQuestion.type === 'closed_question'
      ? (props.currentQuestion.body as { options: string[] }).options
      : undefined,
  } satisfies Omit<ExplanationChatBody, 'messages'>,
})

function submitQuestion() {
  chatMode.value = true
  handleSubmit()
}

function startChat() {
  chatMode.value = true
  input.value = defaultQuestion
  handleSubmit()
}

const isChatInputFull = computed(() => {
  return chatMode.value || isInputInFocus.value
})

function handleBlur() {
  if (!input.value.trim()) {
    isInputInFocus.value = false
  }
}

function getPrefix(answer: string | boolean, isCorrect: boolean): string {
  const prefixes = ['A', 'B', 'C', 'D']
  if (typeof answer === 'string' && props.currentQuestion.type === 'closed_question') {
    const questionBody = props.currentQuestion.body as { options: string[] }
    const index = questionBody.options.indexOf(answer)
    if (prefixes[index]) {
      return prefixes[index]
    }
  }
  return isCorrect ? 'tabler:check' : 'tabler:x'
}
</script>

<template>
  <div class="rounded-lg transition-all duration-300 relative flex flex-col" :class="{ 'h-[80vh]': chatMode }">
    <!-- Result Badge -->
    <div class="space-y-2">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2 h-[34px] relative w-full">
          <Transition name="slide-left">
            <div
              v-if="chatMode"
              class="absolute left-0 top-0 w-6 flex justify-center items-center h-[34px]"
            >
              <Icon
                name="tabler:chevron-left"
                class="size-6 cursor-pointer"
                :class="result.isCorrect ? 'text-success' : 'text-danger'"
                @click="chatMode = false"
              />
            </div>
          </Transition>
          <div
            :class="{
              'ml-6 transition-all duration-300': chatMode,
            }"
            class="flex items-center gap-3 w-full"
          >
            <YAnswerPrefix
              :prefix="getPrefix(currentQuestion.userAnswer!, result.isCorrect)"
              :color="result.isCorrect ? 'success' : 'danger'"
            />
            <span
              class="headline-5"
              :class="[result.isCorrect ? 'text-success' : 'text-danger']"
            >
              {{ result.isCorrect ? $ut('answer.explanation.correct') : $ut('answer.explanation.incorrect') }}
            </span>
            <div class="grow" />
            <div v-if="result.newBulb">
              <img
                src="../../../assets/jasne-icons/plus1.png"
                class="object-contain"
                width="77"
                height="48"
                alt="+1 point"
              >
            </div>
          </div>
        </div>

        <Transition name="slide-right">
          <div v-if="chatMode">
            <YBtn
              :label="$ut('answer.explanation.continue')"
              block
              class="w-full text-white"
              size="small"
              height="32px"
              :color="result.isCorrect ? 'success' : 'danger'"
              @click="$emit('continue')"
            />
          </div>
        </Transition>
      </div>
      <div v-if="!result.isCorrect && !chatMode" class="space-y-2">
        <p class="line-through body-2">
          <span v-if="currentQuestion.type === 'true_or_false'">
            {{ currentQuestion.userAnswer === true ? 'Prawda' : 'Fałsz' }}
          </span>
          <span v-else>
            {{ currentQuestion.userAnswer }}
          </span>
        </p>
        <Icon name="tabler:arrow-down" class="text-gray-500 size-7" />
        <div class="flex items-center gap-3">
          <YAnswerPrefix :prefix="getPrefix(result.answer, true)" />
          <span
            class="headline-5"
          >
            {{ $ut('answer.explanation.correct') }}
          </span>
        </div>
        <p class="body-2">
          <span v-if="currentQuestion.type === 'true_or_false'">
            {{ result.answer === 'true' || (result.answer as unknown as boolean) === true ? 'Prawda' : 'Fałsz' }}
          </span>
          <span v-else>
            {{ result.answer }}
          </span>
        </p>
      </div>
    </div>

    <!-- Answer Display -->
    <div class="space-y-4 my-6">
      <p class="body-1">
        {{ result.explanation }}
      </p>
    </div>
    <div class="flex flex-col flex-1 justify-end space-y-4 overflow-y-scroll no-scrollbar">
      <div class="flex flex-col transition-all duration-300" :class="{ 'h-full': chatMode }">
        <div v-show="chatMode" class="transition-all duration-300 flex-1 w-full pb-4">
          <div class="overflow-y-auto space-y-4">
            <div v-for="(message, index) in messages" :key="message.id + index">
              <div v-if="message.role === 'assistant'" class="text-sm">
                <YMarkdown :content="message.content" />
              </div>
              <div v-else-if="message.role === 'user'" class="text-sm font-semibold text-right">
                <div class="bg-primary/30 rounded-xl py-2 px-4 inline-block ml-auto">
                  <span>{{ message.content }}</span>
                </div>
              </div>
            </div>
            <div v-if="isLoading" class="flex items-center gap-2 text-sm">
              <div class="flex gap-1">
                <div class="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style="animation-delay: 0s" />
                <div class="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style="animation-delay: 0.2s" />
                <div class="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style="animation-delay: 0.4s" />
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
              :label="$ut('answer.explanation.explain')"
              class="whitespace-nowrap transition-opacity duration-300"
              size="small"
              height="32px"
              secondary
              rounded
              @click="startChat()"
            />
          </div>
          <YTextarea
            v-model="input"
            :rows="1"
            rounded
            :placeholder="$ut('answer.explanation.askMore')"
            size="small"
            class="flex-1 transition-all duration-300 w-full"
            submit-on-enter
            @focus="isInputInFocus = true"
            @blur="handleBlur"
            @submit="submitQuestion"
          />
        </div>
      </div>
      <Transition name="slide-down">
        <YBtn
          v-if="!chatMode"
          :label="input ? $ut('answer.explanation.sendMessage') : $ut('answer.explanation.continue')"
          block
          class="w-full text-white"
          :color="input ? undefined : result.isCorrect ? 'success' : 'danger'"
          @click="input ? submitQuestion() : $emit('continue')"
        />
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.expand-x-enter-active,
.expand-x-leave-active {
  transition: width 0.3s ease-out;
  overflow: hidden;
}

.expand-x-enter-from,
.expand-x-leave-to {
  width: 0;
}

.expand-y-enter-active,
.expand-y-leave-active {
  transition: height 0.3s ease-in-out;
  overflow: hidden;
}

.expand-y-enter-from,
.expand-y-leave-to {
  height: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}

.slide-left-enter-from,
.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}

.icon-slide-left-enter-active,
.icon-slide-left-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.icon-slide-left-enter-from,
.icon-slide-left-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}

.animate-bounce {
  animation: bounce 1s infinite;
}

.no-scrollbar {
  scrollbar-width: none;
}
</style>
