<script setup>
const value = ref('')
</script>

<template>
  <div class=" flex flex-col gap-4 justify-center items-center">
    <div class="w-1/2">
      <YTextarea v-model="value" label="Kontekst" placeholder="O czym jest ten kurs..." contrast />
    </div>
  </div>
</template>
