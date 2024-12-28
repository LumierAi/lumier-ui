<script setup lang="ts">
const props = defineProps<{
  content: string
}>()

const parsedContent = ref<string>(useMarkdown(props.content))

watch(() => props.content, (newContent) => {
  console.log('props.content', props.content)
  parsedContent.value = useMarkdown(newContent)
})
</script>

<template>
  <div v-html="parsedContent" />
</template>
