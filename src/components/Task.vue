<script setup lang="ts">
import {ref} from 'vue'
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
</script>

<template>
  <CreateTask v-if="beforeFormIsDisplayed"
              @abort="beforeFormIsDisplayed = false"
              @create="$emit('addTaskBefore', $event); hideForms()"
  />

  <div class="px-4 py-4 shadow sm:rounded-md sm:px-6">
    <div class="flex space-x-3 justify-between">
      {{ task.text }}

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