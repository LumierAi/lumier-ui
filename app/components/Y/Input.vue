<script lang="ts" setup>
import type { BaseInputProps } from '~~/types/props/BaseField'

const props = defineProps<BaseInputProps & {
  glow?: boolean
  hoverGlow?: boolean
  loading?: boolean
}>()
const emit = defineEmits<{
  enter: []
}>()
const model = defineModel<string | number | null>()
const isValid = ref(true)
const showPassword = ref(false)

function togglePassword() {
  showPassword.value = !showPassword.value
}
</script>

<template>
  <YField v-bind="props">
    <div class="relative w-full">
      <InputText
        v-model="(model as any)"
        :class="[props.class, {
          'input-glow': glow,
          'hover-glow': hoverGlow,
        }]"
        :disabled="loading || disabled"
        :name="name"
        class="w-full"
        :placeholder="placeholder"
        :type="showPassword ? 'text' : type"
        :aria-label="label || placeholder"
        :aria-invalid="!isValid"
        :invalid="!isValid"
        @keyup.enter="emit('enter')"
      />
      <button
        v-if="type === 'password'"
        type="button"
        class="absolute right-3 top-6 -translate-y-1/2"
        @click="togglePassword"
      >
        <Icon
          :name="showPassword ? 'tabler:eye-off' : 'tabler:eye'"
          class="text-gray-500"
          size="20"
        />
      </button>
      <!-- Loading indicator -->
      <Transition
        enter-active-class="transition ease-out duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="loading" class="absolute bottom-0 left-0 right-0 px-2">
          <ProgressBar
            mode="indeterminate"
            color="primary"
            class="!h-[2px]"
          />
        </div>
      </Transition>
    </div>
  </YField>
</template>

<style scoped lang="scss">
.input-glow {
  box-shadow: 0 0 10px rgba(var(--primary-rgb), 0.3);
  transition: box-shadow 0.3s ease;
}

.hover-glow {
  &:hover {
    box-shadow: 0 0 10px rgba(var(--primary-rgb), 0.3);
    transition: box-shadow 0.3s ease;
  }
}

:deep(.p-inputtext:enabled:hover.hover-glow) {
  box-shadow: 0 0 10px rgba(var(--primary-rgb), 0.3);
  transition: box-shadow 0.3s ease;
}
</style>
