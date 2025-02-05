<script setup lang="ts">
import type { Message } from 'ai'

const props = defineProps<{
  message: Message
}>()

const availableToolInvocations = computed(() => {
  return props.message.toolInvocations?.filter(x => x.toolName === 'tavily_web_search')
})
</script>

<template>
  <Card
    class="chat-message my-2"
    :class="[
      message.role === 'user' ? 'user-message' : 'assistant-message',
      message.role === 'user' ? 'bg-primary' : 'bg-surface',
    ]"
  >
    <template #content>
      <div class="flex items-start gap-3">
        <div class="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
          <Icon
            v-if="message.role === 'user'"
            name="tabler:user"
            class="w-5 h-5"
          />
          <Icon
            v-else
            name="tabler:robot"
            class="w-5 h-5"
          />
        </div>
        <div class="flex-1">
          <div v-if="(availableToolInvocations?.length ?? 0) > 0">
            <div v-for="toolInvocation in availableToolInvocations" :key="toolInvocation.toolCallId">
              <div v-if="toolInvocation.toolName === 'tavily_web_search'">
                <YChatToolSearch

                  :result="((toolInvocation as any).result as any)"
                  :is-loading="toolInvocation.state !== 'result'"
                />
              </div>
            </div>
          </div>
          <YMDC v-else :content="message.content" />
          {{ message.content }}
        </div>
      </div>
    </template>
  </Card>
</template>

<style scoped lang="scss">
.chat-message {
  max-width: 80%;
  animation: fadeIn 0.5s ease-out;
}

.user-message {
  align-self: flex-end;
  margin-left: auto;
}

.assistant-message {
  align-self: flex-start;
  margin-right: auto;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
