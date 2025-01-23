<script setup lang="ts">
async function handlePromise() {
  await new Promise(resolve => setTimeout(resolve, 1000))
}
</script>

<template>
  <div>
    <div>
      <YBtn
        label="Click me"
        :loading="true"
        :click="() => handlePromise()"
      />
      <YBtn
        label="Prepend icon me"
        prepend-icon="tabler:a-b-off"
        :click="() => handlePromise()"
      />
      <YBtn
        icon="tabler:a-b-off"
        :click="() => handlePromise()"
      />
      <YBtn
        text
        label="Click me"
        :click="() => handlePromise()"
      />
      <YBtn
        label="Click me"
        :click="() => handlePromise()"
      />
      <YBtn
        label="Click me small"
        size="small"
        :click="() => handlePromise()"
      />
      <TestButton />
    </div>
    <div>
      <YBtn
        label="Click me"
        block
        :click="() => handlePromise()"
      />
    </div>
  </div>
</template>
