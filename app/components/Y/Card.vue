<script setup lang="ts">
import type { VNode } from 'vue'

const props = defineProps<{
  loading?: boolean
  title?: string
  class?: string | object
  borderless?: boolean
  contentClass?: string | object
}>()

const slots = defineSlots<{
  actions?: ((props: object) => VNode)
  content: ((props: object) => VNode)
  title?: ((props: object) => VNode)
  menu?: ((props: object) => VNode)
  default?: ((props: object) => VNode)
  menuActions?: ((props: object) => VNode)
}>()

const isMenuOpen = ref(false)
const menuRef = ref()

function closeMenu() {
  isMenuOpen.value = false
}

function changeMenuVisibility(event: Event) {
  event.stopPropagation()
  menuRef.value?.toggle(event)
}

onMounted(() => {
  window.addEventListener('click', closeMenu)
})

onUnmounted(() => {
  window.removeEventListener('click', closeMenu)
})
</script>

<template>
  <div class="y-card relative rounded-3xl p-6 bg-white overflow-hidden space-y-2" :class="[{ 'opacity-50': loading, '!border-none': props.borderless }, props.class]">
    <template v-if="slots.title || props.title || slots.menu">
      <div class="flex justify-between headline-6">
        <slot v-if="slots.title" name="title" />
        <h2 v-else-if="props.title" class="headline-6">
          {{ props.title }}
        </h2>
        <div v-if="slots.menu || slots.menuActions" class="flex items-start gap-2 flex-nowrap">
          <slot name="menuActions" />
          <YBtn
            class="relative"
            text
            contrast
            size="small"
            icon="tabler:dots"
            @click.stop="changeMenuVisibility"
          />
          <Popover
            ref="menuRef"
            class="bg-white mt-2"
            @click.stop
          >
            <slot name="menu" />
          </Popover>
        </div>
      </div>
    </template>
    <div class="text-sm leading-5 font-normal" :class="props.contentClass">
      <slot name="content" />
      <slot />
    </div>
    <template v-if="slots.actions">
      <div class="flex justify-end space-x-2">
        <slot name="actions" />
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.y-card {
  border: 1px solid var(--p-background4);
}
</style>
