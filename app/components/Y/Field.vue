<script lang="ts" setup>
import type { BaseFieldProps } from '../../../types/props/BaseField'

const props = defineProps<BaseFieldProps>()
const id = props.id ?? `field-${Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000}`
</script>

<template>
  <div :class="props.class">
    <label v-if="label" class="body-1" :for="id">{{ label }}</label>
    <slot :id="id" />
  </div>
</template>

<style scoped lang="scss">
</style>
