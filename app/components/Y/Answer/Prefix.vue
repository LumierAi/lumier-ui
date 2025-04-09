<script setup lang="ts">
interface Props {
  prefix: string
  color?: 'success' | 'danger' | `#${string}` | null
}

defineProps<Props>()
</script>

<template>
  <div
    class="flex items-center justify-center size-8 rounded-[14px]"
    :class="color?.startsWith('#') ? `bg-[${color}]` : color ? `bg-${color}` : 'bg-gray-100'"
  >
    <span
      class="headline-6 flex items-center justify-center"
      :class="color ? `text-white` : 'text-gray-900'"
    >
      <Icon v-if="prefix.startsWith('tabler:')" :name="prefix" class="size-6" />
      <span v-else>
        {{ prefix }}
      </span>
    </span>
  </div>
</template>
