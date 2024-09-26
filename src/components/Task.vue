<script setup lang="ts">
import {ref, useId} from 'vue'
import CreateTask from '@/components/CreateTask.vue'
import TaskDropdown from '@/components/TaskDropdown.vue'

interface Props {
  task: Task
  shouldDisplayAfterButton: boolean
}

const props = defineProps<Props>()

defineEmits<{
  addTaskBefore: [task: string]
  addTaskAfter: [task: string]
  deleteTask: void
}>()

const beforeFormIsDisplayed = ref<boolean>(false)
const afterFormIsDisplayed = ref<boolean>(false)

function displayBeforeForm() {
  beforeFormIsDisplayed.value = true
  afterFormIsDisplayed.value = false
}

function displayAfterForm() {
  if (props.shouldDisplayAfterButton) {
    beforeFormIsDisplayed.value = false
    afterFormIsDisplayed.value = true
  }
}

function hideForms() {
  beforeFormIsDisplayed.value = false
  afterFormIsDisplayed.value = false
}

const id = useId()
</script>

<template>
  <CreateTask v-if="beforeFormIsDisplayed"
              @abort="beforeFormIsDisplayed = false"
              @create="$emit('addTaskBefore', $event); hideForms()"
  />

  <!-- Task card with its dropdown and "is done" checkbox-->
  <div class="px-4 py-4 shadow sm:rounded-md sm:px-6">
    <div class="flex space-x-3 justify-between">
      <div class="relative flex items-start">
        <div class="flex h-6 items-center">
          <input :id="`task-${id}`" name="comments" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600">
        </div>

        <label :for="`task-${id}`" class="ml-3 text-sm leading-6 font-medium text-gray-900">{{ task.text }}</label>
      </div>

      <TaskDropdown @addBeforeClicked="displayBeforeForm"
                    @addAfterClicked="displayAfterForm"
                    @deleteClicked="$emit('deleteTask')"
                    :shouldDisplayAfterButton="shouldDisplayAfterButton"
      />
    </div>
  </div>

  <CreateTask v-if="afterFormIsDisplayed"
              @abort="afterFormIsDisplayed = false"
              @create="$emit('addTaskAfter', $event); hideForms()"
  />
</template>