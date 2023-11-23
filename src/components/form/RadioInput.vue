<script setup>

import ToolTip from '@/components/form/ToolTip.vue'

const props = defineProps({
  label: {
    type: String,
    required: false
  },
  options: {
    type: Array,
    required: false
  },
  modelValue: {
    type: String,
    required: true
  },
  toolTipText: {
    type: String,
    required: false
  }
})

defineEmits(
  ['update:modelValue'],
)

console.log('ToolTipText', props.toolTipText)

</script>

<template>
  <div class="grid gap-2">
    <div class="flex">
      <!-- label -->
      
      <label class="text-sm font-medium mr-2">{{ label }}</label>

      <ToolTip  
        v-if="toolTipText"
        :text="toolTipText"
      />
  
      <!-- radio -->
      <fieldset class="ml-2">
        <div class="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
          <div v-for="option in options" :key="option" class="flex items-center ml-4">

            <!-- radio button -->
            <input
              class="w-4 h-4 accent-primary"
              type="radio" 
              :checked="modelValue === option"  
              :id="option" 
              :value="option"
              @change="$emit('update:modelValue', $event.target.value)"
            />

            <!-- radio context -->
            <label 
              class="ml-3 block text-sm font-medium " 
              :for="option" >
              {{ option }} 
            </label>
          </div>
        </div>
      </fieldset>
    </div>
  </div>
</template>