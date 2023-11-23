<script setup>
import { CheckIcon } from '@heroicons/vue/24/solid'

const props = defineProps({
  currentStep: {
    type: String,
    required: true,
    default: '01'
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


</script>
<template>
  <div class="lg:border-b lg:border-t  lg:border-gray-200 ">
    <nav class="mx-auto max-w-7xl" aria-label="Progress">
      <ol role="list" class="overflow-hidden rounded-md lg:flex lg:rounded-none lg:border-l lg:border-r lg:border-gray-200">
        <li v-for="(step, stepIdx) in steps" :key="step.id" class="relative overflow-hidden lg:flex-1">
          <div :class="[stepIdx === 0 ? 'rounded-t-md border-b-0' : '', stepIdx === steps.length - 1 ? 'rounded-b-md border-t-0' : '', 'overflow-hidden border border-gray-200 lg:border-0']">
            <a v-if="step.status === 'complete'" class="group">
              <span class="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-gray-200 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full" aria-hidden="true" />
              <span :class="[stepIdx !== 0 ? 'lg:pl-8' : '', 'flex items-start px-8 py-4 text-sm font-medium']">
                <span class="flex-shrink-0">
                  <span class="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                    <CheckIcon class="h-6 w-6 text-white" aria-hidden="true" />
                  </span>
                </span>
                <span class="ml-4 mt-0.5 flex min-w-0 flex-col">
                  <span class="text-sm font-medium">{{ step.name }}</span>
                  <span class="text-sm font-medium text-gray-500">{{ step.description }}</span>
                </span>
              </span>
            </a>
            <a v-else-if="step.status === 'current'" aria-current="step">
              <span class="absolute left-0 top-0 h-full w-1 bg-primary lg:bottom-0 lg:top-auto lg:h-1 lg:w-full" aria-hidden="true" />
              <span :class="[stepIdx !== 0 ? 'lg:pl-8' : '', 'flex items-start px-6 py-4 text-sm font-medium']">
                <span class="flex-shrink-0">
                  <span class="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary">
                    <span class="text-primary">{{ step.id }}</span>
                  </span>
                </span>
                <span class="ml-4 mt-0.5 flex min-w-0 flex-col">
                  <span class="text-sm font-medium text-primary">{{ step.name }}</span>
                  <span class="text-sm font-medium text-gray-500">{{ step.description }}</span>
                </span>
              </span>
            </a>
            <a v-else class="group">
              <span class="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-gray-200 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full" aria-hidden="true" />
              <span :class="[stepIdx !== 0 ? 'lg:pl-8' : '', 'flex items-start px-6 py-4 text-sm font-medium']">
                <span class="flex-shrink-0">
                  <span class="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300">
                    <span class="text-gray-500">{{ step.id }}</span>
                  </span>
                </span>
                <span class="ml-4 mt-0.5 flex min-w-0 flex-col">
                  <span class="text-sm font-medium text-gray-500">{{ step.name }}</span>
                  <span class="text-sm font-medium text-gray-500">{{ step.description }}</span>
                </span>
              </span>
            </a>
            <template v-if="stepIdx !== 0">
              <!-- Separator -->
              <div class="absolute inset-0 left-0 top-0 hidden w-3 lg:block" aria-hidden="true">
                <svg class="h-full w-full text-gray-300" viewBox="0 0 12 82" fill="none" preserveAspectRatio="none">
                  <path d="M0.5 0V31L10.5 41L0.5 51V82" stroke="currentcolor" vector-effect="non-scaling-stroke" />
                </svg>
              </div>
            </template>
          </div>
        </li>
      </ol>
    </nav>
  </div>
</template>


<style scoped>
a:hover{
  text-decoration: none;
}
</style>