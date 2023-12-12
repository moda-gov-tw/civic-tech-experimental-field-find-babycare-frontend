<script setup>
import { ref, getCurrentInstance } from 'vue'
import ToolTip from '@/components/form/ToolTip.vue'

 const instance = getCurrentInstance() 
 const uuid = ref(instance.uid)


const props = defineProps({
  label: {
    type: String,
    required: false
  },
  returnBoolean:{ // modelValue should be true or false
    type: Boolean,
    required: false   
  },
  options: {
    type: Array,
    required: false
  },
  modelValue: {
    type: String,
    required: true,
    default: null
  },
  toolTipText: {
    type: String,
    required: false
  }
})

defineEmits(
  ['update:modelValue'],
)

</script>

<template>
  <div class="grid gap-2 mb-3">
    <div class="flex">
      <!-- label -->
      
      <label
        :for="uuid+option"
        class="text-sm font-medium mr-2">{{ label }}</label>

      <ToolTip  
        v-if="toolTipText"
        :text="toolTipText"
      />
  
      <!-- radio -->
      <fieldset class="ml-2">
        <div class="space-y-4 sm:flex sm:items-center sm:space-x-6 sm:space-y-0">
          <div v-for="(option,i ) in options" :key="option" class="flex items-center ml-4">

                    
            <!-- radio button -->
            <input
              class="w-4 h-4 accent-primary"
              type="radio" 
              :checked="returnBoolean ? modelValue === (i === 0) : (modelValue === option)" 
              :id="uuid+option"
              :value="returnBoolean ? (i===0) : option" 
              :name="`group-${uuid}`"
              @change="returnBoolean ? $emit('update:modelValue', $event.target.checked ? (i === 0) : null) : $emit('update:modelValue', $event.target.value)"
            />

            <!-- radio context -->
            <label 
              class="ml-3 block text-sm font-medium " 
              :for="uuid+option"
              >
              {{ option }} 
            </label>
          </div>
        </div>
      </fieldset>
    </div>
  </div>
</template>