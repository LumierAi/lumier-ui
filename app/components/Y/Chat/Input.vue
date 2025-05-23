<script setup lang="ts">
const props = withDefaults(defineProps<{
  handleSubmit: () => void
  loading?: boolean
  disabledAdditionalOptions?: boolean
}>(), {
  disabledAdditionalOptions: false,
})

interface Config {
  tavily_web_search: boolean
  knowledge_blocks_search: boolean
  jasne_initial_information: boolean
  issues_search: boolean
}
const config = defineModel<Config>('config', { required: true })

const inputModel = defineModel<string>()

function handleKeyDown(e: KeyboardEvent): void {
  if (e.shiftKey) {
    return
  }
  e.preventDefault()
  e.stopPropagation()
  props.handleSubmit()
}

</script>

<template>
  <form class="relative" @submit.prevent="handleSubmit">
    <div class="relative">
      <Textarea
        v-model="inputModel"
        :placeholder="$ut('chat.input.placeholder')"
        :auto-resize="true"
        :disabled="loading"
        rows="2"
        text
        class="w-full mb-2 pb-12 input-glow"
        @keydown.enter="handleKeyDown"
      />
      <div class="absolute bottom-0 w-full border-t border-gray-200">
        <div class="pt-1 pb-4 px-2 space-x-2">
          <YBtn
            v-tooltip.bottom="$ut('chat.input.webSearchTooltip')"
            prepend-icon="tabler:world-search"
            size="small"
            :disabled="loading"
            text
            :color="config.tavily_web_search ? 'primary' : 'contrast'"
            :label="config.tavily_web_search ? $ut('chat.input.searchLabel') : undefined"
            icon-pos="left"
            @click="config.tavily_web_search = !config.tavily_web_search"
          />
          <template v-if="!disabledAdditionalOptions">
            <ToggleSwitch
              :disabled="loading"
              v-model="config.knowledge_blocks_search"
              v-tooltip.bottom="$ut('chat.input.knowledgeBaseSearchTooltip')"
            />
            <ToggleSwitch
              :disabled="loading"
              v-model="config.jasne_initial_information"
              v-tooltip.bottom="$ut('chat.input.jasneIntroTooltip')"
            />
            <ToggleSwitch
              :disabled="loading"
              v-model="config.issues_search"
              v-tooltip.bottom="$ut('chat.input.issuesSearchTooltip')"
            />
          </template>
          <slot name="actions" />
        </div>
      </div>
      <div class="absolute bottom-3.5 w-full px-2" v-if="loading">
        <ProgressBar mode="indeterminate" style="height: 2.5px"></ProgressBar>
      </div>

    </div>
  </form>
</template>

<style scoped lang="scss">
.input-glow {
  box-shadow: 0 0 12px 8px rgba(255, 153, 0, 0.27);
  :deep(.p-inputtextarea:focus) {
    border-color: var(--primary-color);
  }
}

// Dodatkowe style dla dark mode
:deep(.p-inputtextarea) {
  color: var(--text-color);
  &:hover {
    border-color: var(--primary-color);
  }
  &::placeholder {
    color: var(--text-color-secondary);
  }
}
</style>
