<script setup lang="ts">
const a = () => console.log('a')
</script>

<template>
  <div>
    <h2>PLAYGROUND</h2>
    <YBtn primary :click="a" label="Zaloguj" block />
  </div>
</template>

<style scoped lang="scss">

</style>
