<script lang="ts" setup generic="TValue extends string, TTitle extends string">
import type { SelectProps } from '~~/types/props/Select'
import type { SelectModel } from '~/composables/useSelect'

const props = withDefaults(defineProps<SelectProps<TValue, TTitle> & {
  inline?: boolean
  letterLabel?: boolean
  size?: 'small' | 'large'
}>(), {
  inline: false,
  letterLabel: false,
  size: undefined,
})
const refRadio = useTemplateRef('radio-item')
const model = defineModel<SelectModel>()
const optionLabels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

function isActive(value: TValue): boolean {
  return model.value === value
}
function createLabels() {
  if (!props.letterLabel) {
    return
  }
  const domNodes = refRadio.value?.querySelectorAll('.p-radiobutton-icon')
  domNodes?.forEach((node, index) => {
    node.innerHTML = optionLabels[index]!
  })
}
onMounted(() => {
  createLabels()
})
</script>

<template>
  <YField v-bind="props">
    <div
      v-if="items"
      ref="radio-item"
      :class="{ 'flex flex-wrap gap-4': inline }"
    >
      <div
        v-for="(item, index) in items"
        :key="index"
        :class="`relative p-4 mb-4 last:mb-0 rounded-3xl bg-white border-2 border-transparent ${isActive(item.value) ? ' !border-primary active--shadow' : ''}`"
      >
        <RadioButton
          v-model="model"
          :size
          :input-id="item.value"
          :value="item.value"
          :disabled="disabled"
          :pt="{
            box: ({ context }) => ({
              class: context.checked ? 'bg-primary' : '',
            }),
          }"
        />
        <label :for="item.value" class="ml-2 mb-0 cursor-pointer text-sm absolute top-0 left-0 pl-12 flex items-center h-full w-full">{{ item.label }}</label>
      </div>
    </div>
  </YField>
</template>

<style scoped lang="scss">
.active--shadow {
  box-shadow: 0 0 16px 0 #ffaa033d;
}
:deep(.p-radiobutton-icon) {
  transform: scale(1);
  height: initial;
  width: initial;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 700;
}
</style>
