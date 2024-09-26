<script setup lang="ts">
import {ref} from 'vue'

const text = ref<string>('')
defineEmits<{
  create: [text: string]
}>()
</script>

<template>
  <div class="flex">
    <label for="task" class="sr-only">Task</label>
    <input id="task"
           type="text"
           name="task"
           v-model="text"
           placeholder="Enter a task name"
           class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    >
    <button @click="$emit('create', text)"
            type="button"
            class="ml-4 flex-shrink-0 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Create task
    </button>
  </div>
</template>