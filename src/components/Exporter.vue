<script setup lang="ts">
import {useTemplateRef} from 'vue'

interface Props {
  tasks: Tasks[]
}

const props = defineProps<Props>()

const downloadLink = useTemplateRef<HTMLAnchorElement>('downloadLink')

function exportTasks(files: FileList) {
  const tasksAsText = JSON.stringify(props.tasks, undefined, 2)

  downloadLink.value.href = 'data:application/json;charset=utf-8,' + encodeURIComponent(tasksAsText);
  downloadLink.value.click()
}
</script>

<template>
  <h2 class="text-base font-semibold leading-7 text-gray-900">Save your tasks list</h2>
  <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-600">Export your tasks list as a JSON file using the button below.</p>
  <button @click="exportTasks"
          class="mt-2 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
  >
    Export
  </button>
  <a class="hidden" ref="downloadLink" download="tasks.json"></a>
</template>
