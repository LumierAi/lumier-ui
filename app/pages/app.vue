<script setup lang="ts">
import { type Locale, LocaleDictionary } from '~~/i18n/locales'

const { locale, setLocale } = useI18n()
const currentLocale = computed({
  get: () => locale.value as Locale,
  set: (value: Locale) => setLocale(value),
})

const localeOptions = LocaleDictionary
</script>

<template>
  <div>
    <div class="absolute top-4 right-4">
      <Dropdown
        v-model="currentLocale"
        :options="localeOptions"
        option-label="label"
        option-value="code"
        class="w-[120px]"
      />
    </div>
    <NuxtPage />
  </div>
</template>

<style scoped>
</style>
