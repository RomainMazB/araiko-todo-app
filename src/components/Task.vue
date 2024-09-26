<script setup lang="ts">
interface Props {
  task: Task
}
defineProps<Props>()
</script>

<template>
  {{ task.text }}
</template>