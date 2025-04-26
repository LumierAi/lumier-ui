<script lang="ts" setup>
import type { RouteLocationRaw } from 'vue-router'

const props = withDefaults(defineProps<{
  size?: 'large' | 'small'
  height?: `${string}px`
  color?: 'primary' | 'secondary' | 'contrast' | 'danger' | 'success' | 'warning'
  label?: string
  text?: boolean
  block?: boolean
  icon?: string
  to?: RouteLocationRaw
  primary?: boolean
  secondary?: boolean
  contrast?: boolean
  disabled?: boolean
  danger?: boolean
  loading?: boolean
  glow?: boolean
  rounded?: boolean
  // eslint-disable-next-line ts/no-unsafe-function-type
  click?: Function
  class?: string
  prependIcon?: string
}>(), {

})

const emits = defineEmits<{
  click: [e: Event]
}>()
const localLoading = ref<boolean>(false)

const fullIcon = computed(() => {
  return !!props.icon && !props.label
})

const computedLoading = computed(() => {
  return localLoading.value || props.loading
})

const computedDisable = computed<boolean>(() => {
  return localLoading.value || props.disabled
})

const computedColor = computed(() => {
  return props.primary || props.glow
    ? 'primary'
    : props.secondary
      ? 'secondary'
      : props.contrast
        ? 'contrast'
        : props.danger
          ? 'danger'
          : props.color
})

async function onClick(e: Event) {
  if (props.click) {
    localLoading.value = true
    try {
      await props.click(e)
    }
    finally {
      localLoading.value = false
    }
  }
  else {
    emits('click', e)
  }
}
const computedSize = computed(() => {
  return props.size === 'small' ? '40px' : '48px'
})
</script>

<template>
  <Button
    :as="to ? 'router-link' : undefined"
    :to="to"
    :size="size || 'large'"
    :label="label"
    :variant="text ? 'text' : undefined"
    :rounded="rounded"
    :severity="computedColor"
    :disabled="computedLoading || computedDisable"
    :pt="{
      root: {
        class: [
          props.class,
          '!gap-0 transition-all duration-300 ease-in-out',
          {
            '!px-[12.5px]': label && !text,
            '!p-0': fullIcon,
            'text-[#312319]': secondary,
          },
        ],
        style: {
          'height': height || fullIcon ? text ? '24px' : computedSize : 0 || computedSize,
          'min-width': fullIcon ? text ? '24px' : computedSize : 0 || computedSize,
        },
      },
      icon: {
        class: 'min-w-5',
      },
    }"
    :class="[{
      'glow-effect': props.glow,
      'w-full': block,
    }]"
    @click="onClick"
  >
    <!-- Ikona na początku przycisku -->
    <Icon
      v-if="props.prependIcon"
      :name="props.prependIcon"
      class="size-5 min-w-5"
      :class="{ 'mr-2': props.label }"
    />

    <!-- Tekst przycisku -->
    <span v-if="label">{{ label }}</span>

    <!-- Ikona na końcu przycisku -->
    <div class="flex items-center">
      <!-- Ikona ładowania dla przycisku z samą ikoną -->
      <Icon
        v-if="icon && computedLoading && fullIcon"
        name="tabler:loader-2"
        class="animate-spin size-5 min-w-5"
      />
      <!-- Standardowa ikona -->
      <Icon
        v-else-if="icon"
        :name="icon"
        class="size-5 min-w-5"
        :class="{ 'ml-2': label }"
      />
      <!-- Ikona ładowania dla przycisku z tekstem -->
      <div
        v-if="!fullIcon"
        class="transition-all duration-300 ease-in-out flex justify-center"
        :class="[computedLoading ? 'w-5 opacity-100' : 'w-0 opacity-0']"
      >
        <Icon
          v-if="computedLoading"
          name="tabler:loader-2"
          class="animate-spin size-5 min-w-5 ml-2"
        />
      </div>
    </div>
  </Button>
</template>

<style scoped lang="scss">
.glow-effect {
  box-shadow: 0 0 12px 8px rgba(255, 153, 0, 0.27);
}
</style>
