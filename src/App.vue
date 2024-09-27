<script setup lang="ts">
import {computed, reactive} from 'vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import CreateTask from '@/components/CreateTask.vue'
import TaskList from '@/components/TaskList.vue'
import Task from '@/components/Task.vue'
import Importer from '@/components/Importer.vue'
import {newTask} from '@/helpers'
import Exporter from '@/components/Exporter.vue'

const tasks = reactive<Task[]>([])

function addTask(text: string): void {
  tasks.push(newTask(text))
}

const noTasksYet = computed(() => tasks.length === 0)
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Header/>

    <main class="flex-1 mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 pt-12 w-full">
      <div class="text-center" v-if="noTasksYet">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
             stroke="currentColor" class="mx-auto h-12 w-12 text-gray-400">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z"/>
        </svg>
        <h2 class="mt-2 text-base font-semibold leading-6 text-gray-900">Start your journey</h2>
        <p class="mt-1 text-sm text-gray-500">
          You haven't created any task yet.<br>
          Create your first task to start or use our JSON import tool!
        </p>
      </div>

      <TaskList v-else v-model="tasks" id="root-list"/>

      <CreateTask @create="addTask" :can-abort="false"/>

      <Importer v-if="noTasksYet" v-model="tasks"/>

      <Exporter v-else :tasks="tasks"/>
    </main>

    <Footer/>
  </div>
</template>

<style>
ul#root-list > li > .task > div > .task-card {
  @apply w-full max-w-5xl px-4 py-4 shadow sm:rounded-md sm:px-6
}
</style>