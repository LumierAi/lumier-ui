<script lang="ts" setup>
import type { BaseFieldProps } from '../../../types/props/BaseField'

const props = defineProps<BaseFieldProps & {
  rows?: number
  size?: 'small' | 'large'
  rounded?: boolean
  placeholder?: string
  submitOnEnter?: boolean
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
      :size="size"
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
</style>
