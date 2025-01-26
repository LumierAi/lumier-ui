<script setup lang="ts">
import type { VNode } from 'vue'

const props = defineProps<{
  loading?: boolean
  title?: string
  class?: string | object
  borderless?: boolean
}>()

const slots = defineSlots<{
  actions?: ((props: object) => VNode)
  content: ((props: object) => VNode)
  title?: ((props: object) => VNode)
  menu?: ((props: object) => VNode)
  default?: ((props: object) => VNode)
}>()

const isMenuOpen = ref(false)
const menuRef = ref<HTMLElement | null>(null)

function closeMenu() {
  isMenuOpen.value = false
}

function changeMenuVisibility(event: Event) {
  event.stopPropagation()
  isMenuOpen.value = !isMenuOpen.value
}

onMounted(() => {
  window.addEventListener('click', closeMenu)
})

onUnmounted(() => {
  window.removeEventListener('click', closeMenu)
})
</script>

<template>
  <div class="y-card relative bg-white dark:bg-gray-800 overflow-hidden" :class="[{ 'opacity-50': loading, '!border-none': props.borderless }, props.class]">
    <div
      v-if="slots.menu"
      class="absolute top-2 right-2"
    >
      <YBtn
        class="rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors w-5 h-5"
        icon="tabler:dots-vertical"
        @click.stop="changeMenuVisibility"
      />
      <div
        v-show="isMenuOpen"
        ref="menuRef"
        class="absolute right-0 mt-2 shadow-sm w-48 bg-white dark:bg-gray-800 rounded-lg ring-1 ring-black ring-opacity-5 z-50 transition-all duration-200 ease-in-out"
        @click.stop
      >
        <slot name="menu" />
      </div>
    </div>
    <template v-if="slots.title || props.title">
      <div class="px-4 py-3 border-b dark:border-gray-700" :class="{ '!border-none': props.borderless }">
        <slot v-if="slots.title" name="title" />
        <h2 v-else-if="props.title" class="text-lg font-semibold">
          {{ props.title }}
        </h2>
      </div>
    </template>
    <div class="p-4">
      <slot name="content" />
      <slot />
    </div>
    <template v-if="slots.actions">
      <div class="border-t dark:border-gray-700">
        <div class="px-4 py-3 flex justify-end space-x-2">
          <slot name="actions" />
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.y-card {
  border-radius: 2.25rem;
  border: 1px solid var(--p-background4);
}
</style>
