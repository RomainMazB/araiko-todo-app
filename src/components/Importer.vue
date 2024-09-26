<script setup lang="ts">
const emit = defineEmits<{
  tasksImported: Task[]
}>()

const fileReader = new FileReader;

fileReader.onload = function () {
  const tasks = JSON.parse(fileReader.result);
  tasks.forEach(task => {
    task.createdAt = new Date(Date.parse(task.createdAt))
    if (task.doneAt) {
      task.doneAt = new Date(Date.parse(task.doneAt))
    }
  })

  emit('tasksImported', tasks)
}

function importTasks(files: FileList) {
  if (files.length === 0) {
    return
  }

  fileReader.readAsText(files[0]);
}
</script>

<template>
  <label for="importer-input" class="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 hover:cursor-pointer">
    <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9 3.75H6.912a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859M12 3v8.25m0 0-3-3m3 3 3-3" />
    </svg>
    <span class="mt-2 block text-sm font-semibold text-gray-900">Import a JSON File</span>
    <input @change="importTasks($event.target.files)"
           type="file"
           id="importer-input"
           accept=".json,application/json"
           class="absolute opacity-0 inset-0 w-full"
    >
  </label>
</template>