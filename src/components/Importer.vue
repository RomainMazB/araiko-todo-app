<script setup lang="ts">
import {ref} from 'vue'

const model = defineModel()
const error = ref('')

const fileReader = new FileReader;

const requiredTaskFields = ['text', 'isDone', 'createdAt', 'subtasks'];
fileReader.onload = function () {
  const tasks = JSON.parse(fileReader.result);

  let fileIsCorrupted = false
  if (!Array.isArray(tasks)) {
    fileIsCorrupted = true
  } else {
    // Each task will be verified to be correctly formatted,
    // And we'll convert the datetime string as a date object
    tasks.forEach(task => {
      // Early abort foreach iteration when the file is already considered as corrupted
      if (fileIsCorrupted) {
        return
      }

      // We verify if each task contains the required fields
      let taskIsValid = requiredTaskFields.every((field: string) => Object.keys(task).includes(field))

      taskIsValid = taskIsValid &&
          // We verify that the subtasks is an Array
          Array.isArray(task.subtasks) &&
          // We verify the fields' types
          typeof task.isDone === 'boolean'
        // We could do some more file structure checks here...

      // If a task is invalid, we mark the file as corrupted and early abort
      if (!taskIsValid) {
        fileIsCorrupted = true
        return
      }

      // Finally, if the task is valid, we convert createdAt and doneAt datetime string as a Date instance
      task.createdAt = new Date(Date.parse(task.createdAt))
      if (task.doneAt) {
        task.doneAt = new Date(Date.parse(task.doneAt))
      }
    })
  }

  if (fileIsCorrupted) {
    error.value = 'File content looks corrupted or incompatible. Please double-check the file you tried to import.'
    return
  }

  model.value.push(...tasks)
}

function importTasks(event: Event) {
  // Clear any eventual error message
  error.value = ''

  const files = event.target.files

  if (files.length === 0) {
    return
  }

  const file = files[0]

  if (file.type !== 'application/json') {
    error.value = 'Filetype is incorrect, only JSON files are accepted'

    return
  }

  fileReader.readAsText(file)
}
</script>

<template>
  <label for="importer-input"
         class="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 hover:cursor-pointer"
         :class="{
          'border-red-300': error,
          'border-gray-300': !error,
         }"
  >
    <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48"
         aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round"
            d="M9 3.75H6.912a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859M12 3v8.25m0 0-3-3m3 3 3-3"/>
    </svg>
    <span class="mt-2 block text-sm font-semibold text-gray-900">Import a JSON File</span>
    <span v-if="error" class="mt-2 block text-sm text-red-500">{{ error }}</span>
    <input @change="importTasks"
           type="file"
           id="importer-input"
           accept=".json,application/json"
           class="absolute opacity-0 inset-0 w-full"
    >
  </label>
</template>