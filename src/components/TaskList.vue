<script setup lang="ts">
import Task from '@/components/Task.vue'
import {newTask} from '@/helpers'

defineEmits<{
  oneSubtaskMarkedAsUndone: void
}>()

const model = defineModel()

function addTaskAt (text: string, position: number): void {
  model.value.splice(position, 0, newTask(text))
}

function deleteTask (position: number): void {
  model.value.splice(position, 1)
}

function moveItem(fromIndex, toIndex) {
  const element = model.value[fromIndex];
  model.value.splice(fromIndex, 1);
  model.value.splice(toIndex, 0, element);
}
const moveDown = (idx: number): void => moveItem(idx, idx+1)
const moveUp = (idx: number): void => moveItem(idx, idx-1)

</script>

<template>
  <TransitionGroup name="list" tag="ul" role="list" class="space-y-3">
    <li v-for="(task, index) in modelValue" :key="task">
      <div class="task">
        <div class="flex space-x-2">
          <div>
            <!-- Move up button -->
            <button type="button" @click="moveUp(index)" class="block transition-opacity" :disabled="index === 0"
                    :class="{'opacity-0': index === 0}"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
              </svg>
            </button>

            <!-- Move down button -->
            <button type="button" @click="moveDown(index)" class="block transition-opacity" :disabled="index === modelValue.length - 1"
                    :class="{'opacity-0': index === modelValue.length - 1}"
            >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
            </button>
          </div>

          <Task v-model:text="task.text"
                v-model:is-done="task.isDone"
                v-model:subtasks="task.subtasks"

                @addTaskBefore="addTaskAt($event, index)"
                @addTaskAfter="addTaskAt($event, index+1)"
                @delete="deleteTask(index)"
                @markedAsUndone="task.doneAt = undefined; $emit('oneSubtaskMarkedAsUndone')"
                @markedAsDone="task.doneAt = new Date"

                :created-at="task.createdAt"
                :done-at="task.doneAt"
          />
        </div>
      </div>
    </li>
  </TransitionGroup>
</template>

<style>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>