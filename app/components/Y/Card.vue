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
  <div class="y-card p-6 relative bg-white dark:bg-gray-800 overflow-hidden" :class="[{ 'opacity-50': loading, '!border-none': props.borderless }, props.class]">
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
        class="y-card absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50 transition-all duration-200 ease-in-out"
        @click.stop
      >
        <slot name="menu" />
      </div>
    </div>
    <template v-if="slots.title || props.title">
      <div class="dark:border-gray-700 pb-6">
        <slot v-if="slots.title" name="title" />
        <h2 v-else-if="props.title" class="text-xl leading-8 font-bold">
          {{ props.title }}
        </h2>
      </div>
    </template>
    <div class="px-6" :class="props.contentClass">
      <slot name="content" />
      <slot />
    </div>
    <template v-if="slots.actions">
      <div class="dark:border-gray-700 pt-6 flex justify-end space-x-2">
        <slot name="actions" />
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
