<script setup lang="ts">
interface CurrentQuestion {
  id: string
  createdAt: Date
  type: QuestionType
  userAnswer: string | null
  body: unknown
  moduleId: string
  schemaId: string
  userId: string
  position: number
  lessonId: string
  difficulty: CourseQuestionDifficulty | null
  message?: string
}

type CourseQuestionDifficulty = 'easy' | 'medium' | 'hard' | 'very_hard'
type QuestionType = 'closed_question' | 'open_question'

interface QuizResult {
  isCorrect: boolean
  isModuleFinished: boolean
  explanation: string
  answer: string
  newPoint: boolean
}

const props = defineProps<{
  result: QuizResult
  currentQuestion: CurrentQuestion
}>()

defineEmits<{
  (e: 'continue'): void
}>()

const chatMode = ref<boolean>(false)

function getPrefix(answer: string, isCorrect: boolean): string {
  const prefixes = ['A', 'B', 'C', 'D']
  if (props.currentQuestion.type === 'closed_question') {
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
      <div class="flex items-center gap-3 justify-between">
        <div class="flex items-center gap-2 h-[34px] relative overflow-hidden">
          <Transition name="slide-left">
            <div
              v-if="chatMode"
              class="absolute left-0 top-0 w-6 flex justify-center items-center h-[34px]"
            >
              <Icon
                name="tabler:chevron-left"
                class="size-6 cursor-pointer"
                :class="result.isCorrect ? 'text-success' : 'text-error'"
                @click="chatMode = false"
              />
            </div>
          </Transition>
          <div
            :class="{
              'ml-6 transition-all duration-300': chatMode,
            }"
            class="flex items-center gap-3"
          >
            <YAnswerPrefix
              :prefix="getPrefix(currentQuestion.userAnswer!, result.isCorrect)"
              :color="result.isCorrect ? 'success' : 'error'"
            />
            <span
              class="headline-5"
              :class="[result.isCorrect ? 'text-success' : 'text-error']"
            >
              {{ result.isCorrect ? 'Correct' : 'Incorrect' }}
            </span>
          </div>
        </div>
        <Transition name="slide-right">
          <div v-if="chatMode">
            <YBtn
              label="Continue"
              block
              class="w-full text-white"
              size="small"
              rounded
              :color="result.isCorrect ? 'success' : 'error'"
              @click="$emit('continue')"
            />
          </div>
        </Transition>
      </div>
      <div v-if="!result.isCorrect && !chatMode" class="space-y-2">
        <p class="line-through body-2">
          {{ currentQuestion.userAnswer }}
        </p>
        <Icon name="tabler:arrow-down" class="text-gray-500 size-7" />
        <div class="flex items-center gap-3">
          <YAnswerPrefix :prefix="getPrefix(result.answer, true)" />
          <span
            class="headline-5"
          >
            Correct
          </span>
        </div>
        <p class="body-2">
          {{ result.answer }}
        </p>
      </div>
    </div>

    <!-- Answer Display -->
    <div class="space-y-4 my-6">
      <p class="body-1">
        {{ result.explanation }}
      </p>
    </div>
    <div class="flex flex-col flex-1 justify-end space-y-4">
      <YAnswerExplanationChat
        v-model:chat-started="chatMode"
        :module-id="currentQuestion.moduleId"
        :correct-answer="result.answer"
        :question="(currentQuestion.body as any).question"
        :user-answer="currentQuestion.userAnswer!"
        :explanation="result.explanation"
      />
      <Transition name="slide-down">
        <YBtn
          v-if="!chatMode"
          label="Continue"
          block
          class="w-full text-white"
          :color="result.isCorrect ? 'success' : 'error'"
          @click="$emit('continue')"
        />
      </Transition>
    </div>

    <!-- New Point Indicator -->
    <div v-if="result.newPoint" class="mt-4 text-center text-sm text-success">
      <i class="pi pi-star-fill mr-2" />
      New point earned!
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
</style>
