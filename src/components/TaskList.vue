<script setup lang="ts">
import Task from '@/components/Task.vue'
import CreateTask from '@/components/CreateTask.vue'

interface Props {
  tasks: Task[]
}

defineProps<Props>()
defineEmits<{
  taskAdded: [text: string]
  taskAddedAt: [text: string, position: number]
  deleteTask: [position: number]
}>()
</script>

<template>
  <ul role="list" class="space-y-3">
    <li v-for="(task, index) in tasks" :key="task">
      <Task :task="task"
            :should-display-after-button="index+1 < tasks.length"
            @addTaskBefore="$emit('taskAddedAt', $event, index)"
            @addTaskAfter="$emit('taskAddedAt', $event, index+1)"
            @deleteTask="$emit('deleteTask', index)"
      />
    </li>

    <li>
      <CreateTask @create="$emit('taskAdded', $event)" :can-abort="false"/>
    </li>
  </ul>
</template>