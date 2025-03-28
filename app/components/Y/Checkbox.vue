<script lang="ts" setup generic="TValue extends string, TTitle extends string">
import type { CheckboxPassThroughMethodOptions } from 'primevue/checkbox'
import type { SelectProps } from '../../../types/props/Select'
import type { SelectModel } from '../../composables/useSelect'
import { computed } from 'vue'

const props = withDefaults(defineProps<SelectProps<TValue, TTitle> & {
  inline?: boolean
  letterLabel?: boolean
  size?: 'small' | 'large'
}>(), {
  inline: false,
  size: undefined,
})
const model = defineModel<SelectModel>()

// Generowanie ID raz na cały komponent
const uniqueId = `checkbox-${Math.floor(Math.random() * 10000)}`
const itemIds = computed(() => {
  if (!props.items) return {}
  
  return props.items.reduce((acc, _, index) => {
    acc[index] = `${uniqueId}-${index}`
    return acc
  }, {} as Record<number, string>)
})

function isActive(value: TValue): boolean {
  if (Array.isArray(model.value)) {
    return model.value.includes(value)
  }
  return model.value === value
}
</script>

<template>
  <YField v-bind="props">
    <div
      v-if="items"
      :class="{ 'flex flex-wrap gap-4': inline }"
    >
      <div
        v-for="(item, index) in items"
        :key="index"
        :class="`relative p-4 mb-4 last:mb-0 rounded-3xl bg-white border-2 border-transparent ${isActive(item.value) ? ' !border-primary active--shadow' : ''}`"
      >
        <Checkbox
          v-model="model"
          :size
          :input-id="itemIds[index]"
          :value="item.value"
          :disabled="disabled"
          :pt="{
            box: ({ context }: CheckboxPassThroughMethodOptions) => ({
              class: context.checked ? 'bg-primary' : '',
            }),
          }"
        />
        <label :for="itemIds[index]" class="ml-2 mb-0 cursor-pointer text-sm absolute top-0 left-0 pl-12 pr-4 flex items-center h-full w-full">{{ item.label }}</label>
      </div>
    </div>
  </YField>
</template>

<style scoped lang="scss">
.active--shadow {
  box-shadow: 0 0 16px 0 #ffaa033d;
}
:deep(.p-checkbox-icon) {
  transform: scale(1);
  height: initial;
  width: initial;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 700;
}
</style> 