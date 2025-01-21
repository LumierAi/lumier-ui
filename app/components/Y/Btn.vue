<script lang="ts" setup>
import type { RoutePathSchema, RoutesNamedLocations } from '~~/.nuxt/typed-router'

export type RouteLocationRaw = RoutePathSchema | RoutesNamedLocations
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
  iconPos?: 'left' | 'right' | 'top' | 'bottom'
  // eslint-disable-next-line ts/no-unsafe-function-type
  click?: Function
  class?: string
}>(), {
  iconPos: 'right',
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
</script>

<template>
  <Button
    :as="to ? 'router-link' : undefined"
    :to="to"
    :loading="computedLoading"
    :size="size || 'large'"
    :label="label"
    :icon-pos="iconPos"
    :variant="text ? 'text' : undefined"
    :rounded="rounded || fullIcon"
    :severity="computedColor"
    :disabled="computedLoading || computedDisable"
    :pt="{
      root: {
        class: [
          props.class,
          { '!px-[12.5px]': label },
        ],
        style: {
          'height': height || (size === 'small' ? '40px' : '48px'),
          'min-width': fullIcon ? size === 'small' ? '40px' : '48px' : undefined,
          'flex-direction': !block ? (iconPos === 'bottom' ? 'column-reverse' : iconPos === 'right' ? 'row-reverse' : undefined) : undefined,
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
