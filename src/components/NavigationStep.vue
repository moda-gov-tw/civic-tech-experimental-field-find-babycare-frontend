<script setup>
import { CheckIcon } from '@heroicons/vue/24/solid'

const props = defineProps({
  currentStep: {
    type: String,
    required: true,
    default: '02'
  },
})



const steps = [
  { id: '01', name: '基本資料', status: 'complete' },
  { id: '02', name: '公托選擇', status: 'current' },
  { id: '03', name: '文件上傳', status: 'upcoming' },
  { id: '04', name: '資料確定', status: 'upcoming' },
]

// 如果 step 跟 id 一樣，那就是 current，之前就是 complete，之後就是 upcoming
steps.forEach((step, stepIdx) => {
  if (step.id === props.currentStep) {
    step.status = 'current'
  } else if (step.id < props.currentStep) {
    step.status = 'complete'
  } else {
    step.status = 'upcoming'
  }
})

import { ref, onMounted, onUnmounted } from 'vue';

let isLargeScreen = ref(false)

const updateScreenSize = () => {
  isLargeScreen.value = window.innerWidth > 1024
}

onMounted(() => {
  window.addEventListener('resize', updateScreenSize)
  updateScreenSize()
})

onUnmounted(() => {
  window.removeEventListener('resize', updateScreenSize)
})

</script>
<template>
  <div class="navigation-container">

    <a
      v-for="(step, stepIdx) in steps" :key="step.id"
      class="navigation-border border-arrow-right" 
      
      :class="[
        step.status === 'current' && 'navigation-with-bottom-red-border',
        stepIdx === 0 && 'navigation-with-left-border',
        stepIdx === steps.length -1  && 'navigation-with-right-border',
      ]"
      style="display: flex; justify-content: center; align-items: center;"
      href="">



     <!-- complete 已完成 icon -->
      <span v-if="step.status === 'complete'" class="flex-shrink-0">
        <span class="flex h-7 w-7 items-center justify-center rounded-full bg-primary">
          <CheckIcon class="h-6 w-6 text-white" aria-hidden="true" />
        </span>
      </span>

      <!-- Current 數字 icon  -->
      <span v-if="step.status === 'current'" class="flex-shrink-0">
        <span class="flex h-7 w-7 items-center justify-center rounded-full border-2 border-primary">
          <span class="text-primary ">{{ step.id }}</span>
        </span>
      </span>

      <!-- upcoming 數字 icon  -->
      <span v-if="step.status === 'upcoming'" class="flex-shrink-0">
        <span class="flex h-7 w-7 items-center justify-center rounded-full border-2 border-gray-300">
          <span class="text-gray-500">{{ step.id }}</span>
        </span>
      </span>

      <span
        v-if="isLargeScreen || (step.status == 'current')"
        :class="[
          'pl-2',
          step.status === 'upcoming' && 'text-gray-500',
        ]"
      >
        {{ step.name }}
      </span>

      <!-- Separator 箭頭 --> 
      <template v-if="stepIdx !== 0">
        <div class="absolute inset-0 left-0 top-0  w-3 block" aria-hidden="true">
          <svg class="h-full w-full text-gray-300" viewBox="0 0 12 82" fill="none" preserveAspectRatio="none">
            <path d="M0.5 0V31L10.5 41L0.5 51V82" stroke="currentcolor" vector-effect="non-scaling-stroke" />
          </svg>
        </div>
      </template>

    </a>

                 
  </div>
</template>


<style scoped>
a:hover{
  text-decoration: none;
}

.navigation-container {
  display: grid;
  grid-template-columns: auto auto auto auto;
	grid-template-rows: 100%;
	grid-auto-flow: inherit;
	overflow-x: auto;
	overflow-y: hidden;
}

.navigation-border {
  position: relative;
  border: 1px solid;
  border-color: #D1D5DB; 
  padding: 15px;
  border-left: none;
  border-right: none;
}

.navigation-with-right-border {
  border-right: 1px solid;
  border-color: #D1D5DB; 
}

.navigation-with-left-border {
  border-left: 1px solid;
  border-color: #D1D5DB; 
}

.navigation-with-bottom-red-border {
  border-bottom: 2px solid;
  border-bottom-color: var(--primary-color);
}



</style>