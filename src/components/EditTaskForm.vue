<script setup lang="ts">
import {ref, useId} from 'vue'

const text = defineModel()

const formIsDisplayed = ref<boolean>(false)

const id = useId()
</script>

<template>
  <div class="w-full flex justify-between">
    <!-- Edition form -->
    <div v-if="formIsDisplayed" class="inline-flex space-x-2">
      <!-- Text input -->
      <label :for="`edit-task-${id}`" class="sr-only">Task</label>
      <input :id="`edit-task-${id}`"
             type="text"
             name="task"
             v-model="text"
             placeholder="Enter a task name"
             class="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      >

      <!-- Validation button -->
      <span class="isolate inline-flex rounded-md shadow-sm">
        <button @click="formIsDisplayed = false"
                type="button"
                class="relative -ml-px inline-flex items-center rounded-md bg-white px-3 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
        >
          OK
        </button>
      </span>
    </div>

    <!-- Task text with an edit button -->
    <template v-else>
      <span class="ml-3 text-sm leading-6 py-2 font-medium text-gray-900">{{ text }}</span>

      <button @click="formIsDisplayed = true">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
             stroke="currentColor"
             class="h-4">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"/>
        </svg>
      </button>
    </template>
  </div>
</template>