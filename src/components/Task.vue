<script setup lang="ts">
import {computed, Ref, ref, useId, watch} from 'vue'
import CreateTask from '@/components/CreateTask.vue'
import TaskDropdown from '@/components/TaskDropdown.vue'
import TaskList from '@/components/TaskList.vue'
import {newTask} from '@/helpers'
import EditTaskForm from '@/components/EditTaskForm.vue'
import Task from '@/components/Task.vue'

interface Props {
  createdAt: Date
  doneAt: Date|undefined
}

defineProps<Props>()

const emit = defineEmits<{
  addTaskBefore: [task: string]
  addTaskAfter: [task: string]
  delete: void
  markedDone: void
  markedAsUndone: void
}>()

const text = defineModel<string>('text', {default: ''})
const isDone = defineModel<boolean>('isDone', {default: false})
const subtasks = defineModel<Task[]>('subtasks', {default: []})

const hasUndoneSubtasks = computed<boolean>(
    () => subtasks.value.findIndex(task => !task.isDone) !== -1
)

function addSubtask(text: string): void {
  subtasks.value.push(newTask(text))
}

// Recursively mark all subtasks as done
function markAllSubtasksAsDone(subtasks: Ref<Task[]>): void {
  const now = new Date

  subtasks.forEach((subtask: Ref<Task>) => {
    // Avoid overwriting existing doneAt dates
    if (subtask.doneAt === undefined) {
      subtask.doneAt = now
    }

    subtask.isDone = true

    markAllSubtasksAsDone(subtask.subtasks)
  })

  isDone.value = true
}

watch(() => isDone.value, function (newVal: boolean) {
  if (newVal) {
    emit('markedAsDone')
  } else {
    emit('markedAsUndone')
  }
})

watch(hasUndoneSubtasks, function (newVal: boolean) {
  if (newVal) {
    isDone.value = false
  }
})

// Add sub, add before and add after forms display management
const beforeFormIsDisplayed = ref<boolean>(false)
const afterFormIsDisplayed = ref<boolean>(false)
const subtaskFormIsDisplayed = ref<boolean>(false)

function displayBeforeForm() {
  beforeFormIsDisplayed.value = true
  afterFormIsDisplayed.value = false
  subtaskFormIsDisplayed.value = false
}

function displayAfterForm() {
  beforeFormIsDisplayed.value = false
  afterFormIsDisplayed.value = true
  subtaskFormIsDisplayed.value = false
}

function displaySubtaskForm() {
  beforeFormIsDisplayed.value = false
  afterFormIsDisplayed.value = false
  subtaskFormIsDisplayed.value = true
}

function hideForms() {
  beforeFormIsDisplayed.value = false
  afterFormIsDisplayed.value = false
  subtaskFormIsDisplayed.value = false
}

// Unique id, used for screen readers field identification
const id = useId()
</script>

<template>
  <!-- Add task before form -->
  <CreateTask v-if="beforeFormIsDisplayed"
              @aborted="beforeFormIsDisplayed = false"
              @create="$emit('addTaskBefore', $event); hideForms()"
  />

  <div class="task-card w-full">
    <!-- Task card with its dropdown and "is done" checkbox-->
    <div class="flex space-x-3 justify-between">
      <div class="flex flex-col w-full">
        <div class="relative flex items-center w-full space-x-2">
          <input :id="`task-${id}`"
                 type="checkbox"
                 class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                 v-model="isDone"
                 :disabled="hasUndoneSubtasks"
          >

          <EditTaskForm v-model="text"/>

          <!-- Task actions dropdown -->
          <TaskDropdown @addSubtaskClicked="displaySubtaskForm"
                        @addBeforeClicked="displayBeforeForm"
                        @addAfterClicked="displayAfterForm"
                        @deleteClicked="$emit('delete')"
                        @markAllSubtasksAsDoneClicked="markAllSubtasksAsDone(subtasks)"
          />
        </div>

        <div class="mt-1 ml-6 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
          <p>
            Created at: {{ createdAt.toLocaleDateString() }} {{ createdAt.toLocaleTimeString() }}
          </p>
          <p v-if="doneAt">
            Done at: {{ doneAt.toLocaleDateString() }} {{ doneAt.toLocaleTimeString() }}
          </p>
        </div>
      </div>
    </div>

    <!-- Subtasks list -->
    <TaskList v-model="subtasks" class="ml-4"/>

    <!-- Subtask creation form -->
    <CreateTask v-if="subtaskFormIsDisplayed"
                @aborted="subtaskFormIsDisplayed = false"
                @create="addSubtask($event); hideForms()"
    />
  </div>

  <!-- Add task after form -->
  <CreateTask v-if="afterFormIsDisplayed"
              @aborted="afterFormIsDisplayed = false"
              @create="$emit('addTaskAfter', $event); hideForms()"
  />
</template>
