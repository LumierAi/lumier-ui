<script lang="ts" setup>
import type { RoutePathSchema, RoutesNamedLocations } from '~~/.nuxt/typed-router'

export type RouteLocationRaw = RoutePathSchema | RoutesNamedLocations
const props = defineProps<{
  size?: 'large' | 'small'
  color?: string
  label?: string
  text?: boolean
  block?: boolean
  icon?: string
  to?: RouteLocationRaw
  primary?: boolean
  secondary?: boolean
  contrast?: boolean
  disabled?: boolean
  error?: boolean
  loading?: boolean
  glow?: boolean
  rounded?: boolean
  // eslint-disable-next-line ts/no-unsafe-function-type
  click?: Function
  class?: string
}>()

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
        : props.error
          ? 'error'
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
</script>

<template>
  <Button
    :as="to ? 'router-link' : undefined"
    :to="to"
    :loading="computedLoading"
    :size="size || 'large'"
    :label="label"
    :variant="text ? 'text' : undefined"
    :rounded="rounded || fullIcon"
    :severity="computedColor"
    :disabled="computedLoading || computedDisable"
    :pt="{
      root: {
        class: [
          { '!p-0': fullIcon },
          props.class,
        ],
      },
      icon: {
        class: 'min-w-4',
      },
    }"
    :class="[{
      'glow-effect': props.glow,
      'w-full': block,
    }]"
    @click="onClick"
  >
    <template #icon>
      <Icon v-if="icon" :name="icon" />
    </template>
  </Button>
</template>

<style scoped lang="scss">
.glow-effect {
  box-shadow: 0 0 12px 8px rgba(255, 153, 0, 0.27);
}
</style>
