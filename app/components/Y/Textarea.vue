<script lang="ts" setup>
import type { BaseFieldProps } from '~~/types/props/BaseField'

const props = defineProps<BaseFieldProps & {
  rows?: number
  size?: 'small' | 'large'
  rounded?: boolean
  placeholder?: string
  submitOnEnter?: boolean
  loading?: boolean
  glow?: boolean
}>()
const emits = defineEmits<{
  (e: 'focus'): void
  (e: 'blur'): void
  (e: 'submit'): void
}>()

const model = defineModel<string | null>()
const { rules } = defineRules(props)

function handleEnter(e: KeyboardEvent) {
  if (props.submitOnEnter) {
    if (e.shiftKey) {
      // Allow shift+enter for new line
      return
    }
    // Prevent default enter behavior and emit submit
    e.preventDefault()
    emits('submit')
  }
}
</script>

<template>
  <YField v-bind="props" class="w-full">
    <Textarea
      v-model="model"
      class="w-full"
      :class="({ 'input-glow': glow } as any)"
      :size="size"
      :loading="loading"
      :placeholder="placeholder"
      :auto-resize="true"
      :rules="rules"
      :pt="{
        root: {
          style: {
            'border-radius': rounded ? '9999px' : undefined,
          },
        },
      }"
      :disabled="disabled"
      :rows="rows ?? 4"
      @focus="emits('focus')"
      @blur="emits('blur')"
      @keydown.enter="handleEnter"
    />
  </YField>
</template>

<style scoped lang="scss">
.input-glow {
  box-shadow: 0 0 12px 8px rgba(255, 153, 0, 0.27);
  :deep(.p-inputtextarea:focus) {
    border-color: var(--primary-color);
  }
}
</style>
