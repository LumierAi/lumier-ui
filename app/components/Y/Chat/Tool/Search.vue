<script setup lang="ts">
import { computed, ref } from 'vue'

interface SearchResult {
  title: string
  url: string
  content: string
  score: number
}

interface SearchResults {
  query: string
  images: any[]
  results: SearchResult[]
  response_time: number
}

const props = defineProps<{
  result?: SearchResults
  isLoading: boolean
  failed?: boolean
  error?: string
}>()

const visibleCount = ref(3)

const visibleResults = computed(() =>
  props.result?.results?.slice(0, visibleCount.value) || [],
)

const hasMoreResults = computed(() =>
  visibleCount.value < (props.result?.results?.length || 0),
)

const remainingResults = computed(() =>
  (props.result?.results?.length || 0) - visibleCount.value,
)

function showMoreResults() {
  visibleCount.value += 4
}

const queries = computed(() => {
  if (!props.result?.query)
    return []
  return props.result.query.split(',').map(q => q.trim())
})

function domainNameFromUrl(url: string) {
  const { host } = new URL(url)
  return host
}
</script>

<template>
  <div v-if="result?.results?.length || isLoading">
    <div class="flex flex-wrap gap-2 mb-2">
      <p class="items-center flex text-xs">
        <i class="pi pi-search mr-1" />
        Query:
      </p>
      <template v-if="!isLoading">
        <Chip
          v-for="query in queries"
          :key="query"
          :label="query"
          class="capitalize h-6"
        />
      </template>
      <template v-else>
        <Skeleton v-for="i in 3" :key="i" height="1.25rem" width="5rem" />
      </template>
    </div>

    <div class="flex items-center mt-4 justify-start font-semibold gap-2">
      <div class="flex items-center gap-2">
        <span class="text-xs">Web Search Results</span>
      </div>
      <Chip class="ms-2 h-6">
        <template #icon>
          <i class="pi pi-globe" />
        </template>
        <template v-if="!isLoading">
          {{ result?.results?.length }} sources
        </template>
        <Skeleton v-else height="0.75rem" width="1rem" />
      </Chip>
    </div>

    <div class="mt-3 mb-2">
      <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 w-full">
        <template v-if="!isLoading">
          <template v-for="(searchResult, index) in visibleResults" :key="index">
            <div class="h-24">
              <a
                :href="searchResult.url"
                target="_blank"
                :style="{ transitionDelay: `${0.2 * index}s` }"
                class="group block h-full"
              >
                <div class="bg-gray-200/70 hover:bg-gray-300 flex flex-col justify-between h-full p-3 text-xs rounded-lg">
                  <div class="text-gray-800">
                    <span class="font-medium line-clamp-2">{{ searchResult.title }}</span>
                  </div>
                  <div class="flex items-center space-x-1 text-fg-soft/90">
                    <Image
                      :src="`https://www.google.com/s2/favicons?domain=${searchResult.url}&sz=48`"
                      class="flex-shrink-0 w-4 h-4"
                    />
                    <span class="line-clamp-1">{{ domainNameFromUrl(searchResult.url) }}</span>
                  </div>
                </div>
              </a>
            </div>
          </template>
          <div
            v-if="hasMoreResults"
            class="h-24 flex items-center justify-center cursor-pointer bg-gray-200/70 hover:bg-gray-300 rounded-lg px-4 text-center"
            @click="showMoreResults"
          >
            <span>View {{ remainingResults }} more</span>
          </div>
        </template>

        <!-- Loading skeletons -->
        <template v-else>
          <div v-for="i in 4" :key="i" class="h-24">
            <div class="bg-gray-200/70 flex flex-col justify-between h-full p-3 rounded-lg">
              <div class="space-y-2">
                <Skeleton height="0.75rem" width="100%" />
                <Skeleton height="0.75rem" width="75%" />
              </div>
              <div class="flex items-center space-x-2">
                <Skeleton shape="circle" size="1rem" />
                <Skeleton height="0.75rem" width="6rem" />
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>

    <div v-if="result?.response_time && !isLoading" class="mt-4 text-xs text-gray-600">
      <strong>Response Time:</strong> {{ result.response_time.toFixed(2) }} seconds
    </div>
  </div>
</template>
