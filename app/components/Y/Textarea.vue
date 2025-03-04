<script lang="ts" setup>
import { useId } from 'vue'
import type { BaseFieldProps } from '../../../types/props/BaseField'

const props = defineProps<BaseFieldProps & {
  rows?: number
  size?: 'small' | 'large'
  rounded?: boolean
  contrast?: boolean
  placeholder?: string
  label?: string
  submitOnEnter?: boolean
  loading?: boolean
  glow?: boolean
  id?: string
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
const id = props.id || useId()

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
  <div v-bind="props" class="w-full relative">
    <FloatLabel v-if="label" variant="in">
      <Textarea
        :id
        v-model="model"
        class="w-full leading-5 text-sm"
        :class="({ 'input-glow': glow } as any)"
        :size
        :placeholder="placeholder"
        :auto-resize="true"
        :rules
        :pt="{
          root: {
            style: {
              'padding-bottom': slots.actions ? '48px' : undefined,
              'border-radius': rounded ? '9999px' : undefined,
              'background-color': contrast ? 'var(--p-background-2)' : undefined,
              'color': 'var(--p-secondary)',
              'border': contrast ? 'none' : undefined,
            },
          },
        }"
        :disabled="loading || disabled"
        :rows="rows ?? 4"
        @focus="emits('focus')"
        @blur="emits('blur')"
        @keydown.enter="handleEnter"
      />
      <label class="text-sm leading-6 !font-semibold" :for="id">{{ label }}</label>
    </FloatLabel>
    <Textarea
      v-else
      :id
      v-model="model"
      class="w-full leading-5 text-sm"
      :class="({ 'input-glow': glow } as any)"
      :size
      :placeholder="placeholder"
      :auto-resize="true"
      :rules
      :pt="{
        root: {
          style: {
            'padding-bottom': slots.actions ? '48px' : undefined,
            'border-radius': rounded ? '9999px' : undefined,
            'background-color': contrast ? 'var(--p-background-2)' : undefined,
            'color': 'var(--p-secondary)',
            'border': contrast ? 'none' : undefined,
          },
        },
      }"
      :disabled="loading || disabled"
      :rows="rows ?? 4"
      @focus="emits('focus')"
      @blur="emits('blur')"
      @keydown.enter="handleEnter"
    />
    <div v-if="slots.actions" class="absolute bottom-2 w-full">
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
  </div>
</template>

<style scoped lang="scss">
.input-glow {
  box-shadow: 0 0 12px 8px rgba(255, 153, 0, 0.27);
  :deep(.p-inputtextarea:focus) {
    border-color: var(--primary-color);
  }
}

:deep(.p-textarea) {
  --p-textarea-focus-ring-width: 0px;
  --p-textarea-focus-ring-offset: 0px;
  --p-textarea-focus-ring-shadow: none;
  --p-textarea-shadow: none;
}

:deep(.p-floatlabel) {
  --p-floatlabel-active-color: var(--p-secondary);
  --p-floatlabel-color: var(--p-secondary);
  --p-floatlabel-focus-color: var(--p-secondary);
}
</style>
