<template>
    <button
      @click="toggleLoading"
      class="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg transition-all duration-300 ease-in-out overflow-hidden"
    >
      <span class="whitespace-nowrap">Kliknij mnie</span>
      
      <!-- Kontener dla ikony ładowania -->
      <div
        :class="[
          'ml-2 transition-all duration-300 ease-in-out',
          isLoading ? 'w-5 opacity-100' : 'w-0 opacity-0',
        ]"
      >
        <!-- Ikona ładowania -->
        <svg
          v-if="isLoading"
          class="w-5 h-5 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    </button>
  </template>
  
  <script setup>
  const isLoading = ref(false)

  function toggleLoading() {
    isLoading.value = !isLoading.value
    // Symulacja zakończenia ładowania po 2 sekundach
    if (isLoading.value) {
      setTimeout(() => {
        isLoading.value = false
      }, 2000)
    }
  }
  </script>