<script setup lang="ts">
import {ref, useId} from 'vue'

interface Props {
  canAbort?: boolean
}

withDefaults(defineProps<Props>(), {
  canAbort: true
})

defineEmits<{
  create: [text: string]
  aborted: void
}>()

const text = ref<string>('')

const id = useId()
</script>

<template>
  <div class="flex my-6 space-x-2">
    <!-- Text input -->
    <label :for="`create-task-${id}`" class="sr-only">Task</label>
    <input :id="`create-task-${id}`"
           type="text"
           name="task"
           v-model="text"
           placeholder="Enter a task name"
           class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    >

    <span class="isolate inline-flex rounded-md shadow-sm">
      <!-- Validation button -->
      <button @click="$emit('create', text); text = ''"
              type="button"
              class="relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
              :class="{'rounded-r-md': !canAbort}"
      >
        Create
      </button>

      <!-- Abort button -->
      <button v-if="canAbort"
              @click="$emit('aborted')"
              type="button"
              class="relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
      >
        Abort
      </button>
    </span>
  </div>
</template>