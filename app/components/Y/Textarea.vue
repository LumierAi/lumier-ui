<script lang="ts" setup>
import type { BaseFieldProps } from '../../../types/props/BaseField'

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

const slots = defineSlots<{
  actions?: () => VNode
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
    e.stopPropagation()
    emits('submit')
  }
}
</script>

<template>
  <YField v-bind="props" class="w-full relative">
    <Textarea
      v-model="model"
      class="w-full"
      :class="({ 'input-glow': glow } as any)"
      :size="size"
      :placeholder="placeholder"
      :auto-resize="true"
      :rules="rules"
      :pt="{
        root: {
          style: {
            'padding-bottom': slots.actions ? '48px' : undefined,
            'border-radius': rounded ? '9999px' : undefined,
          },
        },
      }"
      :disabled="loading || disabled"
      :rows="rows ?? 4"
      @focus="emits('focus')"
      @blur="emits('blur')"
      @keydown.enter="handleEnter"
    />
    <div v-if="slots.actions" class="absolute bottom-2 border-t border-gray-100 dark:border-gray-800 w-full pt-[1px] ps-[1px]">
      <slot name="actions" />
    </div>
    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="loading" class="absolute bottom-1.5 left-0 right-0 px-2">
        <ProgressBar
          mode="indeterminate"
          color="primary"
          class="!h-[2px]"
        />
      </div>
    </Transition>
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
