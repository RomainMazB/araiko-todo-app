<script setup lang="ts">
import {ref} from 'vue'

const mobileMenuIsOpen = ref<boolean>(false)
</script>

<template>
  <nav class="bg-white shadow">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button -->
          <button @click="mobileMenuIsOpen = !mobileMenuIsOpen"
                  type="button"
                  class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
          >
            <span class="absolute -inset-0.5"></span>
            <span class="sr-only">Open main menu</span>

            <svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                 aria-hidden="true">
              <!-- Conditioned hamburger icon -->
              <path v-if="mobileMenuIsOpen" stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
              <path v-else stroke-linecap="round" stroke-linejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
            </svg>

          </button>
        </div>

        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex flex-shrink-0 items-center">
            <img class="h-8 w-auto"
                 src="https://static.wixstatic.com/media/1eaf48_f9806637e42a45b380c5baebea666748~mv2.png/v1/fill/w_327,h_90,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/logo-final-arai%E2%95%A0%C3%AAko_edited.png"
                 alt="Araiko's company logo">
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <a href="#"
               class="inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900"
            >
              Todos list
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <div id="mobile-menu"
         class="sm:hidden"
         :class="{
          hidden: !mobileMenuIsOpen
         }"
    >
      <div class="space-y-1 pb-4 pt-2">
        <!-- Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" -->
        <a href="#"
           class="block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700">Todos list</a>
      </div>
    </div>
  </nav>
</template>