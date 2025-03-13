<script setup lang="ts">
const props = defineProps<{
  content: string
}>()
</script>

<template>
  <div class="prose prose-sm dark:prose-invert mdc">
    <MDC :value="content" />
  </div>
</template>

<style scoped lang="scss">
:deep(.mdc) {
  ol {
    list-style-type: decimal;
    padding-left: 16px;
    margin-bottom: 10px;
    margin-top: 10px;
    &:first-child {
      margin-top: 0px;
    }
  }
  ul {
    padding-left: 16px;
    list-style-type: disc;
    margin-bottom: 10px;
    margin-top: 10px;
    &:first-child {
      margin-top: 0px;
    }
  }
  pre {
    max-width: 100%;
    overflow-x: scroll;
    &:first-child {
      margin-top: 0px;
    }
  }
  li {
    margin-top: 4px;
    margin-bottom: 4px;
    &:first-child {
      margin-top: 0px;
    }
  }
  p {
    margin-top: 4px;
    margin-bottom: 2px;
    line-height: 1.2;
    &:first-child {
      margin-top: 0px;
    }
  }

  hr {
    margin-top: 16px;
    margin-bottom: 16px;
    &:first-child {
      margin-top: 0px;
    }
  }
  h1 {
    line-height: normal;
    font-size: 24px;
    margin-top: 16px;
    margin-bottom: 6px;
    &:first-child {
      margin-top: 0px;
    }
  }
  h2 {
    line-height: normal;
    margin-top: 12px;
    font-size: 20px;
    margin-bottom: 4px;
    &:first-child {
      margin-top: 0px;
    }
  }
  h3 {
    margin-top: 10px;
    font-size: 18px;
    margin-bottom: 4px;
    &:first-child {
      margin-top: 0px;
    }
  }

  blockquote {
    border-left: 4px solid #ddd;
    padding-left: 16px;
    margin: 12px 0;
    color: #555;
    &:first-child {
      margin-top: 0px;
    }
  }

  table {
    border-collapse: collapse;
    width: 100%;
    margin: 16px 0;
    display: block;
    overflow-x: auto;
    white-space: normal;
    word-break: break-word;
    &:first-child {
      margin-top: 0px;
    }

    th,
    td {
      border: 1px solid #ddd;
      padding: 8px 12px;
      text-align: left;
      min-width: 100px;
      max-width: 300px;
      overflow-wrap: break-word;
    }

    th {
      background-color: #f2f2f2;
    }

    tr:nth-child(even) {
      background-color: #f8f8f8;
    }
  }

  code {
    background: #f0f0f0;
    padding: 2px 4px;
    border-radius: 3px;
    font-family: monospace;
    font-size: 0.9em;
    white-space: break-spaces;
  }

  pre code {
    display: block;
    padding: 12px;
    overflow-x: auto;
    line-height: 1.45;
    background-color: #f6f8fa;
    border-radius: 6px;
    white-space: break-spaces;
  }

  a {
    color: #0366d6;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  h1 > a,
  h2 > a,
  h3 > a {
    color: inherit;
    text-decoration: inherit;
    cursor: default;
    &:hover {
      text-decoration: inherit;
    }
  }

  ul.contains-task-list {
    list-style-type: none;
    padding-left: 0;

    li.task-list-item {
      display: flex;
      align-items: baseline;
      margin: 4px 0;

      input[type='checkbox'] {
        margin-right: 8px;
      }
    }
  }

  img {
    max-width: 100%;
    height: auto;
    margin: 10px 0;
    border-radius: 4px;
    &:first-child {
      margin-top: 0px;
    }
  }

  .footnotes {
    border-top: 1px solid #eee;
    margin-top: 20px;
    padding-top: 10px;
    font-size: 0.9em;
    &:first-child {
      margin-top: 0px;
    }

    ol {
      margin-bottom: 0;
    }
  }

  @media (max-width: 768px) {
    pre {
      font-size: 0.9em;
      white-space: break-spaces;
    }

    table {
      display: block;
      overflow-x: auto;
      white-space: nowrap;
    }
  }
}
</style>
