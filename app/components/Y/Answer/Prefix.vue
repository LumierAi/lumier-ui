<script setup lang="ts">
interface Props {
  prefix: string
  color?: 'success' | 'danger' | `#${string}` | null
  size?: 'small' | 'medium' | 'large'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'medium'
})

</script>

<template>
  <div
    class="flex items-center justify-center"
    :style="color?.startsWith('#') ? { backgroundColor: color } : {}"
    :class="[
      size === 'small' ? 'size-6 min-w-6 rounded-[8px]' : size === 'medium' ? 'size-8 min-w-8 rounded-[14px]' : 'size-10 min-w-10 rounded-[22px]',
      color?.startsWith('#') ? '' : color ? `bg-${color}` : 'bg-gray-100'
      ]"
  >
    <span
      class="flex items-center justify-center"
      :class="[
        color ? `text-white` : 'text-gray-900',
        size === 'medium' ? 'headline-6' : size === 'small' ? 'body-1' : 'headline-5'
        ]"
    >
      <Icon v-if="prefix.startsWith('tabler:')" :name="prefix" class="size-6" />
      <span v-else>
        {{ prefix }}
      </span>
    </span>
  </div>
</template>
