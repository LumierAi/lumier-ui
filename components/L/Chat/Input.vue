<template>
  <form class="relative" @submit.prevent="handleSubmit">
    <div class="relative">
      <Textarea
        v-model="inputModel"
        placeholder="Wpisz swoją wiadomość..."
        :auto-resize="true"
        rows="3"
        class="w-full mb-2 pb-3 input-glow"
        @keydown.enter.prevent="handleSubmit"
      />
      <div class="absolute bottom-0 w-full border-t border-gray-200">
        <div class="pt-1.5 pb-3.5 px-2 space-x-2">
          <ToggleSwitch v-model="webSearchEnabled" v-tooltip.top="'Websearch'" class="mr-2">
            <template #handle="{ checked }">
              <Icon
                :name="checked ? 'tabler:world' : 'tabler:world-off'"
                class="text-sm"
              />
            </template>
          </ToggleSwitch>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue?: string
  handleSubmit: () => void
}>()

const webSearchEnabled = defineModel<boolean>('webSearch')
const inputModel = defineModel<string>()
</script>

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
