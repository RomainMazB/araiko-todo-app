<script setup lang="ts">
import {ref, useId, useTemplateRef} from 'vue'
import {onClickOutside} from '@vueuse/core'

defineEmits<{
  addSubtaskClicked: void
  addBeforeClicked: void
  addAfterClicked: void
  deleteClicked: void
  markAllSubtasksAsDoneClicked: void
}>()

const displayed = ref<boolean>(false)
const dropdown = useTemplateRef('dropdown')

onClickOutside(dropdown, () => displayed.value = false)
const id = useId()
</script>

<template>
  <div class="flex flex-shrink-0 self-center" ref="dropdown">
    <div class="relative inline-block text-left">
      <!-- Button: three dots -->
      <button @click="displayed = !displayed"
              type="button"
              class="-m-2 flex items-center rounded-full p-2 text-gray-400 hover:text-gray-600"
              :id="`menu-${id}-button`"
              aria-expanded="false"
              aria-haspopup="true"
      >
        <span class="sr-only">Open options</span>
        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
        </svg>
      </button>

      <!-- Dropdown with transition -->
      <Transition>
        <div v-if="displayed"
             class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
             role="menu"
             aria-orientation="vertical"
             :aria-labelledby="`menu-${id}-button`"
             tabindex="-1"
        >
          <div class="py-1" role="none">
            <!-- Button: Add subtask -->
            <button @click="$emit('addSubtaskClicked'); displayed = !displayed"
                    type="button"
                    class="w-full flex px-4 py-2 text-sm text-gray-700 active:bg-gray-100 active:text-gray-900"
                    role="menuitem"
                    tabindex="-1"
                    :id="`menu-${id}-item-0`"
            >

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-3 h-5 w-5" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="m16.49 12 3.75 3.75m0 0-3.75 3.75m3.75-3.75H3.74V4.499" />
              </svg>
              <span>Add sub task</span>
            </button>

            <!-- Button: Add task before -->
            <button @click="$emit('addBeforeClicked'); displayed = !displayed"
                    type="button"
                    class="w-full flex px-4 py-2 text-sm text-gray-700 active:bg-gray-100 active:text-gray-900"
                    role="menuitem"
                    tabindex="-1"
                    :id="`menu-${id}-item-1`"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-3 h-5 w-5" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12" />
              </svg>
              <span>Add task before</span>
            </button>

            <!-- Button: Add task after -->
            <button @click="$emit('addAfterClicked'); displayed = !displayed"
                    type="button"
                    class="w-full flex px-4 py-2 text-sm text-gray-700 active:bg-gray-100 active:text-gray-900"
                    role="menuitem"
                    tabindex="-1"
                    :id="`menu-${id}-item-2`"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-3 h-5 w-5" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0-3.75-3.75M17.25 21 21 17.25" />
              </svg>
              <span>Add task after</span>
            </button>

            <!-- Button: Mark all subtasks as done -->
            <button @click="$emit('markAllSubtasksAsDoneClicked'); displayed = !displayed"
                    type="button"
                    class="w-full flex px-4 py-2 text-sm text-gray-700 active:bg-gray-100 active:text-gray-900"
                    role="menuitem"
                    tabindex="-1"
                    :id="`menu-${id}-item-3`"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-3 h-5 w-5" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
              </svg>
              <span>Mark as done</span>
            </button>

            <!-- Button: Delete task -->
            <button @click="$emit('deleteClicked'); displayed = !displayed"
                    type="button"
                    class="w-full flex px-4 py-2 text-sm text-red-700 active:bg-red-100 active:text-red-900"
                    role="menuitem"
                    tabindex="-1"
                    :id="`menu-${id}-item-4`"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-3 h-5 w-5" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
              <span>Delete</span>
            </button>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style>
.v-enter-active {
  @apply transition ease-out duration-100;
}

.v-enter-from {
  @apply transform opacity-0 scale-95;
}

.v-enter-to {
  @apply transform opacity-100 scale-100;
}

.v-leave-active {
  @apply transition ease-in duration-75;
}

.v-leave-from {
  @apply transform opacity-100 scale-100;
}

.v-leave-to {
  @apply transform opacity-0 scale-95;
}
</style>
