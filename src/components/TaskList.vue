<script setup lang="ts">
import Task from '@/components/Task.vue'
import {newTask} from '@/helpers'

const model = defineModel()

function addTaskAt (text: string, position: number): void {
  model.value.splice(position, 0, newTask(text))
}

function deleteTask (position: number): void {
  model.value.splice(position, 1)
}

defineEmits<{
  oneSubtaskMarkedAsUndone: void
}>()
</script>

<template>
  <ul role="list" class="space-y-3">
    <li v-for="(task, index) in modelValue" :key="task">
      <div class="task">
        <Task v-model:text="task.text"
              v-model:is-done="task.isDone"
              v-model:subtasks="task.subtasks"
              @addTaskBefore="addTaskAt($event, index)"
              @addTaskAfter="addTaskAt($event, index+1)"
              @delete="deleteTask(index)"
              @markedAsUndone="$emit('oneSubtaskMarkedAsUndone')"
        />
      </div>
    </li>
  </ul>
</template>
