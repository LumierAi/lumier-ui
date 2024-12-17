<template>
  <div class="border">
    <!-- Slot title -->
    <template v-if="slots.title">
      <div class="headline-1">
        <slot name="title"/>
      </div>
      <LDivider/>
    </template>

    <!-- Slot content -->
    <div class="content">
      <slot name="content"/>
    </div>

    <!-- Slot actions -->
    <template v-if="slots.actions"> 
      <LDivider/>
      <div class="actions">
        <slot name="actions"/>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type {VNode} from "vue";

const slots = defineSlots<{
  actions?: ((props: { }) => VNode)
  content: ((props: { }) => VNode)
  title?: ((props: { }) => VNode)
}>();
</script>

<style scoped lang="scss">

</style>
