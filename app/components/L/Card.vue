<script setup lang="ts">
import type { VNode } from 'vue'

const slots = defineSlots<{
  actions?: (props: unknown) => VNode
  content: (props: unknown) => VNode
  title?: (props: unknown) => VNode
}>()
</script>

<template>
  <div class="border">
    <!-- Slot title -->
    <template v-if="slots.title">
      <div class="headline-1">
        <slot name="title" />
      </div>
      <LDivider />
    </template>

    <!-- Slot content -->
    <div class="content">
      <slot name="content" />
    </div>

    <!-- Slot actions -->

    <template v-if="slots.actions">
      <LDivider />
      <div class="actions">
        <slot name="actions" />
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss"></style>
