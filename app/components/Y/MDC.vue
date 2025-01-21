<script setup lang="ts">
const props = defineProps<{
  content: string
}>()

const parsedContent = ref<string>(useMarkdown(props.content))

watch(() => props.content, (newContent) => {
  // TODO: remove this console.log
  console.log('props.content', props.content)
  parsedContent.value = useMarkdown(newContent)
})
</script>

<template>
  <div class="prose prose-sm dark:prose-invert" v-html="parsedContent" />
</template>

<style>
code {
  white-space: break-spaces;
}
</style>
